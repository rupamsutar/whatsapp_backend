import dotenv from 'dotenv';
import app from './app.js';
import logger from './configs/logger.config.js';

dotenv.config({path: './config.env'});

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

const unexpectedErrorHandler = () => {
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