import dotenv from 'dotenv';
import app from './app.js';
import logger from './configs/logger.config.js';

dotenv.config({path: './config.env'});
console.log(process.env.NODE_ENV);

const port = process.env.PORT || 5500;

app.listen(port, () => {
    logger.info(`Server is listening on PORT: ${port}.`);
})
