export interface UsuarioInterface {
  nombres: string;
  apellidos: string;
  mail: string;
  password: string;
  telefono: string;
  rol: string;
  dni: string;
}

export class Usuario implements UsuarioInterface {
  constructor(
    public nombres: string = '',
    public apellidos: string = '',
    public mail: string = '',
    public password: string = '',
    public telefono: string = '',
    public rol: string = '',
    public dni: string = ''
  ) { }
}
