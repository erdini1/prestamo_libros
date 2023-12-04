import { HTTP_MESSAGES } from "../constants/http.js";

export default class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.message = this.setMessage(message, statusCode);
    this.statusCode = statusCode;
  }

  setMessage(message, statusCode) {
    if (message) return message;
    switch (statusCode) {
      case 400:
        return HTTP_MESSAGES[400];
      case 401:
        return HTTP_MESSAGES[401];
      case 403:
        return HTTP_MESSAGES[403];
      case 404:
        return HTTP_MESSAGES[404];
      case 422:
        return HTTP_MESSAGES[422];
      case 500:
        return HTTP_MESSAGES[500];
      case 503:
        return HTTP_MESSAGES[503];
      default:
        return "Untracked Error";
    }
  }
}
