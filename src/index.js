import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import logger from './configs/logger.config.js';

dotenv.config({path: './config.env'});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,                                           
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database")
})

const port = process.env.PORT || 5500;

const server = app.listen(port, () => {
    logger.info(`Server is listening on PORT: ${port}.`);
})

const exitHandler = () => {
    if (server) {
        logger.info('server is closing 🌟💣...');
    }
    process.exit(1)
}

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
}

process.on('unhandledRejection', unexpectedErrorHandler);
process.on('uncaughtException', unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
    if(server) {
        logger.info('server is closing 🌟💣...');
        process.exit(1);
    }
})

