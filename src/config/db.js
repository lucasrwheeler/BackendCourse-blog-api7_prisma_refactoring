import {PrismaClient} from '../generated/prisma/client.js';
import {PrismaPg} from '@prisma/adapter-pg';


const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL});
const prisma = new PrismaClient({adapter});

export default prisma;

//this file is used to create a singleton instance of the PrismaClient, which can be imported and used throughout the application to interact with the database. The PrismaPg adapter is configured with the connection string from the environment variables, allowing for secure and flexible database connections.
//in other words, this file serves as a centralized database configuration and connection point for the application, ensuring that all database operations are performed through a single instance of the PrismaClient.
//simply put, this basically means using better database connection management and avoiding multiple instances of the PrismaClient, which can lead to performance issues and resource leaks.