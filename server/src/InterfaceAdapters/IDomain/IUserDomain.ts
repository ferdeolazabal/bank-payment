interface IUserDomain {
  getId(): string;

  getFirstName(): string;
  getLastName(): string;
  getEmail(): string;
  getPhoneMobile(): string;
  getPassword(): string;
  getEnable(): boolean;
  getIsSuperAdmin(): boolean;
  getCreatedAt(): Date;
  getUpdatedAt(): Date;
}

export default IUserDomain;
