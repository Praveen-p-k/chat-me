import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { config } from 'src/config';

interface AWSException {
  name: string;
  $metadata: {
    httpStatusCode: number;
    attempts: number;
    cfId: string;
    extendedRequestId: string;
    requestId: string;
    totalRetryDealy: number;
  };
  $fault: 'client' | 'server';
  message: string;
  stack: string;
}

// Implemented Global API Exception filter
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message;

    if (exception instanceof HttpException) {
      // NestJS exception
      const response = exception.getResponse();
      status = exception.getStatus();
      message =
        typeof response === 'string' ? response : JSON.stringify(response);

      this.logger.error(`Status: ${status} Error: ${JSON.stringify(message)}`);
    } else if (this.isAWSException(exception)) {
      // AWS exception
      status = exception.$metadata.httpStatusCode;

      this.logger.error(`AWS Error: ${exception.name}`, exception.stack);
      const awsMessage = `An error occurred (${exception.name}).`; // Generic message for the client
      message =
        config.NODE_ENV === 'development' ? exception.message : awsMessage; // Expose detailed message only in development
      // Log the full error details
      this.logger.error({
        message: exception.message,
        requestId: exception.$metadata.requestId,
        statusCode: exception.$metadata.httpStatusCode,
      });
    } else {
      message = exception.message;
      this.logger.error({
        name: exception.name,
        message: exception.message ?? 'Unknown Error Occurred',
      });
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }

  private isAWSException(error: any): error is AWSException {
    return (
      error &&
      typeof error === 'object' &&
      'name' in error &&
      '$metadata' in error &&
      'httpStatusCode' in error.$metadata
    );
  }
}
