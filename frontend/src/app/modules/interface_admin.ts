
export interface Admin {
    _id: string;
    username: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    urlImage?: string;
  }
  