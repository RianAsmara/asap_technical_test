import { format } from 'date-fns';
import * as winston from 'winston';

function createLogger() {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.colorize(),
      winston.format.printf((log) => {
        if (log.stack) return `[${log.timestamp}] ${log.stack}`;
        return `[${log.timestamp}] ${log.message}`;
      }),
    ),
    transports: [
      new winston.transports.File({
        level: 'silly',
        filename: `logs/app/${format(new Date(), 'yyyy/MM/dd')}.log`,
      }),
    ],
  });
}

export default createLogger;
