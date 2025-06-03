import { AppError } from "./index";

export const errorMiddleware = (err, req, res, next) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message,
            details: err.details
        })
    }

    return res.status(500).json({
        message: "Internal server error {travelsaas}",
        details: {}
    })
}