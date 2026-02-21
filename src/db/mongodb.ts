import { env } from '#/config/env';
import { log } from '#/utils/logger';
import mongoose from 'mongoose';

const { user, password, host, port, name } = env.db;

const mongodb = {
  connection: undefined as typeof mongoose | undefined,
  connectTo: async () => {
    try {
      const uri = `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin`;
      mongodb.connection = await mongoose.connect(uri);

      log.info(`Connected to database at mongodb://${host}:${port}/${name}`);
    } catch (err) {
      const { message, code } = err as {
        message: string;
        code: number | undefined;
      };

      console.error(
        `Error connecting to database (${code || 'unknown'}): ${message}`
      );
      process.exit(1);
    }
  },
  closeConnection: async () => {
    if (!mongodb.connection) return;

    await mongodb.connection.disconnect();
  },
  closeAllConnection: async () => {
    await mongodb.closeConnection();

    await mongoose.connection.close(true); // close the default connection
    await mongoose.disconnect(); // close all the connection opened
  },
  getStatus: () => {
    if (!mongodb.connection) return mongoose.STATES[99];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = (mongodb.connection as any).connections[0]._readyState;
    return mongoose.STATES[state];
  },
};

export default mongodb;
