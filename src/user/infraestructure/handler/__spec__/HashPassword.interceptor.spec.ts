import { ExecutionContext, CallHandler } from '@nestjs/common';
import { HashPasswordInterceptor } from '../HashPassword.interceptor';
import { of } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UserInvalid } from 'src/user/domain/error/UserInvalid';
import { Constant } from 'src/user/domain/enum/Constant';

jest.mock('bcrypt');

describe('HashPasswordInterceptor', () => {
  let hashPasswordInterceptor: HashPasswordInterceptor;
  let mockCallHandler: CallHandler;
  let mockExecutionContext: ExecutionContext;

  beforeEach(() => {
    mockCallHandler = {
      handle: jest.fn().mockReturnValue(of(null)),
    };

    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest
          .fn()
          .mockReturnValue({ body: { password: 'password' } }),
      }),
    } as unknown as ExecutionContext;

    hashPasswordInterceptor = new HashPasswordInterceptor();
  });

  it('should hash the password if it is present in the request body', (done) => {
    const hashedPassword = 'hashedPassword';
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    hashPasswordInterceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe(() => {
        const request = mockExecutionContext.switchToHttp().getRequest();
        expect(request.body.password).toBe(hashedPassword);
        done();
      });
  });

  it('should throw an error if the password is not present in the request body', async () => {
    mockExecutionContext.switchToHttp().getRequest().body.password = undefined;

    try {
      hashPasswordInterceptor.intercept(mockExecutionContext, mockCallHandler);
    } catch (error) {
      expect(error).toBeInstanceOf(UserInvalid);
      expect(error.message).toBe(Constant.INVALID_USER);
    }
  });
});
