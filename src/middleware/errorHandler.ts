import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../prisma/generated/prisma/client";

const errorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let errorMessage = "Internal Server Error";
    let errorDetails = error;

    // * Prisma Client Validation Error
    if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "Incorrect field type or missing fields"
    }

    // * Prisma Client Known Request Error
    else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2001") {
            statusCode = 404;
            errorMessage = "The requested record was not found."
        }
        if (error.code === "P2002") {
            statusCode = 400;
            errorMessage = "This value already exists. Please use a different one"
        }
        else if (error.code === "P2003") {
            statusCode = 400;
            errorMessage = "Invalid reference. Related record does not exist."
        }
        else if (error.code === "P2011") {
            statusCode = 400;
            errorMessage = "Required fields are missing."
        }
        else if (error.code === "P2012" || error.code === "P2013") {
            statusCode = 400;
            errorMessage = "Some required information is missing."
        }
        else if (error.code === "P2014") {
            statusCode = 400;
            errorMessage = "This action cannot be completed because related data exists."
        }
        else if (error.code === "P2024") {
            statusCode = 503;
            errorMessage = "Server is busy. Please try again later."
        }
        else if (error.code === "P2025") {
            statusCode = 404;
            errorMessage = "The requested record was not found."
        }
    }

    // * Prisma Client Unknown Request Error
    else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        errorMessage = "Error occurred during query execution"
    }

    // * Prisma Client Initialization Error
    else if (error instanceof Prisma.PrismaClientInitializationError) {
        if (error.errorCode === "P1000") {
            statusCode = 401;
            errorMessage = "Authentication failed. Invalid email or password"
        }
        else if (error.errorCode === "P1001") {
            statusCode = 400;
            errorMessage = "Can't reach database server"
        }
    }
    res.status(statusCode).json({
        message: errorMessage,
        error: errorDetails
    })
}

export default errorHandler;