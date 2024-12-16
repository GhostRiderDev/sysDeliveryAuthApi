import { Constant } from '../enum/Constant';
import { UserRole } from '../enum/UserRole';
import { UserInvalid } from '../error/UserInvalid';
import { User } from '../model/User';

describe('User domain model', () => {
  describe('Constructor', () => {
    it('should be create basic user', () => {
      const id = "abcd-1234"
      const username = 'Olvadis';
      const email = 'olvadis2004@gmail.com';
      const password = '12345';
      const role = UserRole.CLIENT;
      const updatedAt = new Date()
      const createdAt = new Date()

      const user = new User(id, username, email, password, createdAt, role, updatedAt);

      expect(user.id).toEqual(id)
      expect(user.username).toEqual(username);
      expect(user.email).toEqual(email);
      expect(user.password).toEqual(password);
      expect(user.role).toEqual(role);
      expect(user.createdAt).toEqual(createdAt)
      expect(user.updatedAt).toEqual(updatedAt)
    });

    it('should be create full user', () => {
      const username = 'Olvadis';
      const email = 'olvadis2004@gmail.com';
      const password = '12345';
      const role = UserRole.CLIENT;

      const user = new User(null, username, email, password, null, role, null);

      expect(user.username).toEqual(username);
      expect(user.email).toEqual(email);
      expect(user.password).toEqual(password);
      expect(user.role).toEqual(role);
    });

    it("Not should be create user with empty 'username'", () => {
      const username = '';
      const email = 'olvadis@gmail.com';
      const password = '12345';
      const role = UserRole.CLIENT;

      const exec = () =>
        new User(null, username, email, password, null, role, null);

      expect(exec).toThrow(UserInvalid);
      expect(exec).toThrow(Constant.INVALID_USER);
    });

    it('Not should be create User if role is invalid', () => {
      const username = 'olvadisito';
      const email = 'olvadis@gmail.com';
      const password = '12345';
      const role = 'Student' as UserRole;

      const exec = () =>
        new User(null, username, email, password, null, role, null);

      expect(exec).toThrow(UserInvalid);
      expect(exec).toThrow(Constant.INVALID_USER);
    });
  });
});
