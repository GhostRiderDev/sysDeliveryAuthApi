import { ArgumentsHost } from '@nestjs/common';
import { UserErrorHandlerFilter } from '../UserErrorHandler.filter';
import { UserInvalid } from 'src/user/domain/error/UserInvalid';
import { Constant } from 'src/user/domain/enum/Constant';
import { UserNotFound } from 'src/user/domain/error/UserNotFound';
import { UserAlreadyExist } from 'src/user/domain/error/UserAlreadyExist';

describe('UserErrorHandlerFilter', () => {
  let userErrorHandlerFilter: UserErrorHandlerFilter;
  let mockArgsHost: ArgumentsHost;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  const HTTP_URL = 'https://test.com';

  beforeAll(() => {
    mockStatus = jest.fn();
    mockJson = jest.fn();

    mockStatus.mockImplementation(() => ({
      json: mockJson,
    }));

    mockArgsHost = {
      switchToHttp: () => ({
        getResponse: () => ({
          status: mockStatus,
        }),
        getRequest: () => ({
          url: HTTP_URL,
        }),
      }),
    } as ArgumentsHost;

    userErrorHandlerFilter = new UserErrorHandlerFilter();
  });

  describe('catch', () => {
    it('Should call response status method with bad request status code', () => {
      const invalidUserData: UserInvalid = new UserInvalid(
        Constant.INVALID_USER,
      );
      const expected = 400;

      // when
      userErrorHandlerFilter.catch(invalidUserData, mockArgsHost);

      // then
      expect(mockStatus).toHaveBeenCalledWith(expected);
      expect(mockJson).toHaveBeenCalledWith({
        statusCode: expected,
        timestamp: expect.any(String), // or use a specific date string if needed
        path: HTTP_URL,
        message: invalidUserData.message,
      });
    });
  });

  it('Should call response status method with not found status code', () => {
    const userNotFound: UserNotFound = new UserNotFound(
      Constant.USER_NOT_FOUND,
    );
    const expected = 404;

    // when
    userErrorHandlerFilter.catch(userNotFound, mockArgsHost);

    // then
    expect(mockStatus).toHaveBeenCalledWith(expected);
    expect(mockJson).toHaveBeenCalledWith({
      statusCode: expected,
      timestamp: expect.any(String), // or use a specific date string if needed
      path: HTTP_URL,
      message: userNotFound.message,
    });
  });

  it('Should call response status method with conflict status code', () => {
    const userAlreadyExist: UserAlreadyExist = new UserAlreadyExist(
      Constant.USER_ALREADY_EXISTS,
    );
    const expected = 409;

    // when
    userErrorHandlerFilter.catch(userAlreadyExist, mockArgsHost);

    // then
    expect(mockStatus).toHaveBeenCalledWith(expected);
    expect(mockJson).toHaveBeenCalledWith({
      statusCode: expected,
      timestamp: expect.any(String), // or use a specific date string if needed
      path: HTTP_URL,
      message: userAlreadyExist.message,
    });
  });

  it("Should call response status method with internal server error status code if it's not a known error", () => {
    const unknownError = {
      message: 'Unknown error',
    } as Error;
    const expected = 500;

    const expectedMessage = 'Server error';

    // when
    userErrorHandlerFilter.catch(unknownError, mockArgsHost);

    // then
    expect(mockStatus).toHaveBeenCalledWith(expected);
    expect(mockJson).toHaveBeenCalledWith({
      statusCode: expected,
      timestamp: expect.any(String), // or use a specific date string if needed
      path: HTTP_URL,
      message: expectedMessage,
    });
  });
});
