
export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.error_msg = message;
  }
}

export class AppError extends Error{

  constructor(message){
    super(message);
    this.error_msg = message; 
  }

}