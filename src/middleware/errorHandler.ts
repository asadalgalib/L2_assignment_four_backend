import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../prisma/generated/prisma/client";

const errorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let errorMessage = "Internal Server Error 1";
    let errorDetails = error;

    // * Prisma Client Validation Error
    if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "Incorrect field type or missing fields"
    }

    res.status(statusCode).json({
        message: errorMessage,
        error: errorDetails
    })
}

export default errorHandler;