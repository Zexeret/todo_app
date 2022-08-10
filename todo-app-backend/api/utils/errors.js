export class PreConditionFailError extends Error {
  constructor(message) {
    super(message);
    this.message = message ;
    this.name = "ValidationError";
    this.status = 412;
  }
};

export class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.message = message ;
    this.name = "AuthorizationError";
    this.status = 401;
  }
};


