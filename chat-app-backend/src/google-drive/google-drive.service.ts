import { Injectable } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import { Readable } from 'stream';
import { createHash } from 'crypto';
import * as dotenv from 'dotenv';
import { config } from 'src/config';
import { serviceAccountKeys } from './service-account-key.provider';
dotenv.config();

@Injectable()
export class GoogleDriveService {
  private readonly drive: drive_v3.Drive;
  private readonly topFolderId = config.GOOGLE_DRIVE_ROOT_FOLDER_ID;

  constructor() {
    this.drive = google.drive({
      version: 'v3',
      auth: new google.auth.GoogleAuth({
        credentials: serviceAccountKeys,
        scopes: [config.GOOGLE_DRIVE_SCOPE],
      }),
    });
  }

  private hashFile(buffer: Buffer): string {
    return createHash('sha256').update(buffer).digest('hex');
  }

  private async getOrCreateFolder(
    folderName: string,
    parentId: string,
  ): Promise<string> {
    const res = await this.drive.files.list({
      q: `name='${folderName}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    });

    if (res.data.files.length > 0) {
      return res.data.files[0].id;
    }

    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    };

    const folderResponse = await this.drive.files.create({
      requestBody: folderMetadata,
      fields: 'id',
    });

    return folderResponse.data.id;
  }

  private async fileExistsInFolder(
    folderId: string,
    fileName: string,
  ): Promise<boolean> {
    const res = await this.drive.files.list({
      q: `name='${fileName}' and '${folderId}' in parents and mimeType!='application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    });

    return res.data.files.length > 0;
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileHash = this.hashFile(file.buffer);
    const hashFolderId = await this.getOrCreateFolder(
      fileHash,
      this.topFolderId,
    );

    if (await this.fileExistsInFolder(hashFolderId, file.originalname)) {
      throw new Error(
        `A file with the name ${file.originalname} already exists in the folder ${fileHash}.`,
      );
    }

    const fileMetadata = {
      name: file.originalname,
      parents: [hashFolderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    try {
      const uploadResponse = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, mimeType, webViewLink',
      });

      const fileId = uploadResponse.data.id;
      await this.makeFilePublic(fileId);

      return uploadResponse.data;
    } catch (error) {
      console.error('Error uploading file:', JSON.stringify(error));
      throw new Error('Error uploading file to Google Drive');
    }
  }

  public async makeFilePublic(fileId: string): Promise<void> {
    try {
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      console.log(`File ${fileId} is now public.`);
    } catch (error) {
      console.error(`Failed to make file public: ${error}`);
      throw new Error('Error making file public');
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
      console.log(`File with ID ${fileId} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete file: ${error}`);
      throw new Error('Error deleting file from Google Drive');
    }
  }

  async revokePublicAccess(fileId: string): Promise<void> {
    try {
      const permissions = await this.drive.permissions.list({ fileId: fileId });
      const publicPermission = permissions.data.permissions?.find(
        (perm) => perm.type === 'anyone',
      );

      if (publicPermission) {
        await this.drive.permissions.delete({
          fileId: fileId,
          permissionId: publicPermission.id!,
        });
        console.log(`Public access revoked for file ${fileId}`);
      } else {
        console.log(`No public access found for file ${fileId}`);
      }
    } catch (error) {
      console.error(`Failed to revoke public access: ${error}`);
      throw new Error('Error revoking public access to file');
    }
  }
}
