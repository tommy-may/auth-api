import { env } from '#/config/env';
import pino from 'pino';

const { level, dir } = env.log;

const customLevels = {
  error: 50,
  warn: 40,
  info: 30,
  http: 20,
  debug: 10,
};

const transport = {
  development: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      customLevels,
      customColors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue',
      },
    },
  },
  production: {
    target: 'pino/file',
    options: {
      destination: `${dir}/logs/app.log`,
      mkdir: true,
    },
  },
};

const logger = pino({
  name: 'app',
  customLevels,
  useOnlyCustomLevels: true,
  level,
  base: undefined as never,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  // nestedKey: "data",
  transport: transport[env.node_env],
});

export const log = {
  error: (message: string, err: unknown) => {
    logger.error({ err }, message);
  },
  warn: <T extends object>(message: string, data: T | null = null) => {
    logger.warn({ data }, message);
  },
  info: <T extends object>(message: string, data: T | null = null) => {
    logger.info({ data }, message);
  },
  http: (message: string) => {
    logger.http(message);
  },
  debug: <T extends object>(message: string, data: T | null = null) => {
    logger.debug({ data }, message);
  },
};

export default logger;
