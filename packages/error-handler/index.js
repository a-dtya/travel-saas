

export class AppError extends Error{
    statusCode;
    isOperational;
    details;

    constructor(message, statusCode, isOperational=true, details={}){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this);
    }
}

//Not found error

export class NotFoundError extends AppError{
    constructor(message="Resources not found {travelsaas}"){
        super(message, 404);
    }
}

//validation error

export class ValidationError extends AppError{
    constructor(message="Invalid request data {travelsaas}",details){
        super(message, 400, true, details);
    }
}

//authentication error

export class AuthError extends AppError{
    constructor(message="Unauthorized {travelsaas}"){
        super(message, 401);
    }
}

//forbidden error
export class ForbiddenError extends AppError{
    constructor(message="Forbidden {travelsaas}"){
        super(message, 403);
    }
}

//database error
export class DatabaseError extends AppError{
    constructor(message="Database error {travelsaas}", details){
        super(message, 500, false, details);
    }
}

//rate limit error
export class RateLimitError extends AppError{
    constructor(message="Too many requests from this IP, please try again after 15 minutes {travelsaas}"){
        super(message, 429);
    }
}