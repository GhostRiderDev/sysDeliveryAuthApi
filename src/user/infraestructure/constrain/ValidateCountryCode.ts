import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Constant } from 'src/user/domain/enum/Constant';
import { UserInvalid } from 'src/user/domain/error/UserInvalid';

@ValidatorConstraint({ name: 'phoneNumber', async: false })
export class CountryCodeValidator implements ValidatorConstraintInterface {
  validate(phone: string, args: ValidationArguments) {
    if (!phone) throw new UserInvalid(Constant.PHONE_NOT_FOUND);

    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber ? phoneNumber.isValid() : false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Phone number must be a valid number with a valid country code';
  }
}
