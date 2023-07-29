import {
  BadRequestException,
  ForbiddenException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';

type ErrorOption = {
  errorMessage: string;
};

/**
 * @status 400
 */
export const badRequest = (message?: string, option?: ErrorOption) => {
  return new BadRequestException({ message, errorMessage: option?.errorMessage });
};

/**
 * @status 403
 */
export const forbidden = (message?: string, option?: ErrorOption) => {
  return new ForbiddenException({ message, errorMessage: option?.errorMessage });
};

/**
 * @status 401
 */
export const unauthorized = (message?: string, option?: ErrorOption) => {
  return new UnauthorizedException({ message, errorMessage: option?.errorMessage });
};

/**
 * @status 501
 */
export const notImplemented = (message?: string, option?: ErrorOption) => {
  return new NotImplementedException({ message, errorMessage: option?.errorMessage });
};
