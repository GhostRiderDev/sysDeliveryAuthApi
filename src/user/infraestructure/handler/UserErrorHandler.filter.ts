import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserNotFound } from 'src/user/domain/error/UserNotFound';
import { UserAlreadyExist } from 'src/user/domain/error/UserAlreadyExist';
import { UserInvalid } from 'src/user/domain/error/UserInvalid';

@Catch()
export class UserErrorHandlerFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof UserNotFound || exception instanceof UserAlreadyExist || exception instanceof UserInvalid) {
      statusCode = (exception as any).statusCode || HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Server error';
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}