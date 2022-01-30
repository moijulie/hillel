export class NotFoundError extends Error {
    constructor() {
      super("Not Found");
    }
}


export class BadRequestError extends Error {
    constructor() {
      super("Bad Request");
    }
}

export class InternalError extends Error {
    constructor() {
      super("Oops..Something wrong happened");
    }
}