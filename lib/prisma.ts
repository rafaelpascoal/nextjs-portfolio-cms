// Import PrismaClient from @prisma/client
import { PrismaClient } from "@prisma/client";

declare global {
    // Create a global variable for PrismaClient, avoid multiple instances of PrismaClient in development
    var prisma: PrismaClient | undefined;
}

// If already exists, use the existing instance, otherwise create a new instance. The log property is used to log the queries to the console in development mode.
export const prisma = 
    global.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
    });

// Make sure the created instance will be saved to the global variable and reused in HMR.
    if (process.env.NODE_ENV !== "production") global.prisma = prisma;
