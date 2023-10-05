import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({path: './config.env'});
console.log(process.env.NODE_ENV);

const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`Server is listening on PORT: ${port}.`);
})
