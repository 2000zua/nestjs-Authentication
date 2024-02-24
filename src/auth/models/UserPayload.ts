
export interface UserPayload {
    sub: number; // identificador de cada user
    email: string;
    name: string;
    iat?: number;
    exp?: number;
  }