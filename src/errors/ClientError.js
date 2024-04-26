class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.name = 'ClientErorr';
  }
}

module.exports = ClientError;
