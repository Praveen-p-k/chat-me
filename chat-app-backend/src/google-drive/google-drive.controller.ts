import {
  Controller,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from './google-drive.service';

@Controller('g-drive')
export class GoogleDriveController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  @Post('/file/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.googleDriveService.uploadFile(file);
  }

  @Delete('/file/:fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    return this.googleDriveService.deleteFile(fileId);
  }

  @Patch('/file/revoke-public-access/:fileId')
  async revokePublicAccess(@Param('fileId') fileId: string) {
    console.log(fileId);
    return this.googleDriveService.revokePublicAccess(fileId);
  }

  @Patch('/file/grant-public-access/:fileId')
  async grantPublicAccess(@Param('fileId') fileId: string) {
    console.log(fileId);
    return this.googleDriveService.makeFilePublic(fileId);
  }
}
