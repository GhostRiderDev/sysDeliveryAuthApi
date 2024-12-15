import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserAlreadyExist } from 'src/user/domain/error/UserAlreadyExist';
import { UserNotFound } from 'src/user/domain/error/UserNotFound';

@Catch(UserNotFound, UserAlreadyExist)
export class UserErrorHandlerFilter implements ExceptionFilter {
  catch(exception: UserNotFound | UserAlreadyExist, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
