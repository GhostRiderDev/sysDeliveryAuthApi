import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserAlreadyExist } from 'src/user/domain/error/UserAlreadyExist';
import { UserInvalid } from 'src/user/domain/error/UserInvalid';
import { UserNotFound } from 'src/user/domain/error/UserNotFound';

@Catch(UserNotFound, UserAlreadyExist, UserInvalid, Error)
export class UserErrorHandlerFilter implements ExceptionFilter {
  catch(
    exception: UserNotFound | UserAlreadyExist | UserInvalid | Error,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = 'statusCode' in exception ? exception.statusCode : 500;
    const message = statusCode === 500 ? 'Server error' : exception.message;

    response.status(statusCode).json({
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
