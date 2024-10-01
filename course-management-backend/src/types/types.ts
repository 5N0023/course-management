
export interface loginCreds {
    username: string;
    password: string;
  }

export interface User {
    username: string;
    password: string;
    role: 'admin' | 'author' | 'reader';
  }