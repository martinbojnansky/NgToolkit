export class Log {
  static info(text: string) {
    Log.log('INFO   ', '\x1b[36m', text);
  }

  static success(text: string) {
    Log.log('SUCCESS', '\x1b[32m', text);
  }

  static error(text: string) {
    Log.log('ERROR  ', '\x1b[31m', text);
  }

  static warn(text: string) {
    Log.log('WARNING', '\x1b[33m', text);
  }

  private static log(prefix: string, prefixColor: string, message: string) {
    const date = new Date();
    console.log(
      `${prefixColor}${prefix}\x1b[0m ${date.toLocaleDateString()} ${date.toLocaleTimeString()}: ${message}`
    );
  }
}
