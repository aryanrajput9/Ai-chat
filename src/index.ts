import express from 'express'
import globalError from './middleware/globel-error.js';
import routes from './routes/index-route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())

app.get("/health", (_req, res) => {
    return res.status(200).json({
        message: "server is running ✅"
    })
});

app.use("/api/v1/", routes)


//Error Handler

app.use(globalError)


export default app