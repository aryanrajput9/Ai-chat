


class ApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data?: object | undefined;

    constructor(statusCode: number, message: string, data?: object) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data
    }
};

export default ApiResponse