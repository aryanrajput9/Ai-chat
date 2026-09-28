


class ApiError extends Error {

    statusCode: number;
    success: boolean;

    constructor(statusCode: number, message: string) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.success = false;

        Error.captureStackTrace(this, this.constructor)
    }
};

export default ApiError