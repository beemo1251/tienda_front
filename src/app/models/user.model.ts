export interface UserInterface {
  mail: string;
  password: string;
}

export class User implements UserInterface {
  constructor(
    public mail: string = '',
    public password: string = ''
  ) {}
}
