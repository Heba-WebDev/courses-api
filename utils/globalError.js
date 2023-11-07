class AppError extends Error {
  constructor() {
    super();
  }

  create(message, code, text) {
    this.message = message;
    this.statusCode = code;
    this.statusText = text;
    return this;
  }
}

module.exports = new AppError();
