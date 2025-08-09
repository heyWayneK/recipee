// Define the possible log levels for type safety
type LogLevel = "info" | "warn" | "error" | "debug";

// Define the shape of the context object
type LogContext = Record<string, unknown>;

/**
 * The core logging function for server side script logging.
 * @param level - The severity level of the log.
 * @param message - The main log message.
 * @param context - Additional data to include with the log.
 */
const log = (level: LogLevel, message: string, context: LogContext = {}): void => {
  const logEntry = {
    level,
    timestamp: new Date().toISOString(),
    message,
    ...context,
  };

  // Use console.error for severe logs and console.log for others
  if (level === "error" || level === "warn") {
    console.error(JSON.stringify(logEntry, null, 2)); // Using null, 2 for pretty-printing in dev
  } else {
    console.log(JSON.stringify(logEntry, null, 2));
  }
};

// Export the logger object with typed methods
export const logger = {
  info: (message: string, context?: LogContext): void => log("info", message, context),
  warn: (message: string, context?: LogContext): void => log("warn", message, context),
  error: (message: string, context?: LogContext): void => log("error", message, context),
  debug: (message: string, context?: LogContext): void => log("debug", message, context),
};
