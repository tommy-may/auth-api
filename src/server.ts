import app from '#/app';
import { env } from '#/config/env';
import mongodb from '#/db/mongodb';
import { log } from '#/utils/logger';

const { port, host } = env;

const server = app.listen(port, host, () => {
  const hostname = host === '0.0.0.0' ? 'localhost' : host;
  log.info(`Server is running at http://${hostname}:${port}`);

  mongodb.connectTo();
});

export default server;
