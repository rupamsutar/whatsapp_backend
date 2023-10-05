import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitze from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';
const app = express();

//Morgan
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
// helmet
app.use(helmet());

// parse json req body
app.use(express.json());

// parse json req url
app.use(express.urlencoded({extended: true}));

// sanitize
app.use(mongoSanitze());

// Enable cookie parser
app.use(cookieParser());

// gzip compression
app.use(compression());

// file fileUpload
app.use(fileUpload({
    useTempFiles: true
}))

// cors
app.use(cors({
    origin: "http://localhost:3000"
}))

app.get('/', (req, res) => {
    res.send(req.body);
});

export default app;