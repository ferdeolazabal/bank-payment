import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";

export default class UserORMEntity {
  _id: string;

  firstName: string;
  lastName: string;
  email: string;
  phoneMobile: string;
  password: string;
  enable: boolean;
  isSuperAdmin: boolean;

  createdAt: Date;
  updatedAt: Date;

  static fromDomain(values: IUserDomain) {
    const user = new UserORMEntity();

    user._id = values.getId();

    user.firstName = values.getFirstName();
    user.lastName = values.getLastName();
    user.email = values.getEmail();
    user.phoneMobile = values.getPhoneMobile();
    user.password = values.getPassword();
    user.enable = values.getEnable();
    user.isSuperAdmin = values.getIsSuperAdmin();

    user.createdAt = values.getCreatedAt();
    user.updatedAt = values.getUpdatedAt();

    return user;
  }
}
