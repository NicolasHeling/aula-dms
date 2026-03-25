export class User {
  private readonly _id?: string;
  private _email: string;
  private _password: string;
  private _teacherId?: string;
  private _permissions: string[];
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  private constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._email = "";
    this._password = "";
    this._permissions = [];
  }

  get id() {
    return this._id;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }
  get teacherId() {
    return this._teacherId;
  }
  get permissions() {
    return this._permissions;
  }

  withEmail(email: string) {
    this._email = email;
    return this;
  }
  withPassword(password: string) {
    this._password = password;
    return this;
  }
  withPermissions(permissions: string[]) {
    this._permissions = permissions;
    return this;
  }

  static restore(props?: {
    id?: string;
    email: string;
    password: string;
    teacherId?: string | null;
    permissions: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }): User | null {
    if (!props) return null;
    const user = new User(props.id, props.createdAt, props.updatedAt);
    user._email = props.email;
    user._password = props.password;
    user._teacherId = props.teacherId ?? undefined;
    user._permissions = props.permissions ?? [];
    return user;
  }
}
