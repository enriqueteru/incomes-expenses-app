export class User {
  static fromFirebase({ email, uid, name }: {email: string, uid:string, name:string}): User{
    return new User(uid, email, name);
  }

  constructor(public uid: string, public name: string, public email: string) {}
}
