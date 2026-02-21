import { env } from '#/config/env';
import mongodb from '#/db/mongodb';
import server from '#/server';
import { log } from '#/utils/logger';

log.info(`Project started in ${env.node_env.toUpperCase()} mode`);

process.on('uncaughtException', (err) => {
  log.error(err.message, err);

  mongodb.closeAllConnection();

  // shutdown the server gracefully
  server.close(() => {
    process.exit(1); // then exit
  });

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => {
    process.abort(); // exit immediately and generate a core dump file
  }, 1000).unref();

  process.exit(1);
});

process.on('SIGTERM', (signal) => {
  log.warn('Received Signal', { signal });

  mongodb.closeAllConnection();

  // shutdown the server gracefully
  server.close(() => {
    process.exit(1); // then exit
  });
});
