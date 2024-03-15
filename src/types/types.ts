export interface CreateUserRequestBody {
    username: string;
     email: string;
     password: string;
  }
 
  export interface LoginUserRequestBody {
     username?: string;
     email?: string,
     password: string;
  }
  
  export interface TokenData {
     userId: string;
     userRoles: string[];
  }