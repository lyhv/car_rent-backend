import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorException = {
      code: httpStatus,
      title: '',
      message: '',
      errors: [],
    };
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      errorException.title = exception.name;
      if (typeof errorResponse === 'string') {
        errorException.message = errorResponse;
      } else if (Array.isArray(errorResponse)) {
        errorException.errors = errorResponse.map((error) => ({
          code: error.code || '',
          field: error.field || '',
          message: error.message || '',
        }));
      } else if (typeof errorResponse === 'object') {
        const messages = errorResponse['message'];
        if (Array.isArray(messages)) {
          errorException.errors = messages.map((message) => ({
            message: message || '',
          }));
        } else {
          errorException.message = messages;
        }
        errorException.title = errorResponse['error'];
      }
    } else if (exception instanceof Error) {
      errorException.title = exception.name;
      errorException.message = exception.message;
    }
    response.status(httpStatus).json({ error: errorException });
  }
}
