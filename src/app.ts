import { NotFoundError } from '#/lib/response-errors';
import errorMiddleware from '#/middlewares/error.middleware';
import router from '#/routes';
import type { ErrorResBody } from '#/types/response';
import { log } from '#/utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet());

app.use(cors()); // Access-Control-Allow-Origin: *

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.use(cookieParser());

app.use(
  morgan(
    ':remote-addr :method :url :status :res[content-length] - :response-time ms',
    {
      stream: {
        write: (message) => log.http(message.replace(/\r?\n|\r/g, '')),
      },
    }
  )
);

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1m
    max: 25,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      name: 'RateLimitError',
      message: 'Too Many Requests',
      err: null,
    } as ErrorResBody,
  })
);

app.use('/', router);

app.use((request, _response, next) => {
  next(new NotFoundError('Route Not Found', request.originalUrl));
});

app.use(errorMiddleware);

export default app;
