declare interface Request {
  state: {
    user?: {
      id: number;
      email: string;
      password: string;
    };
  };
}
