import { exportTranslations } from './commands/export-translations';
import { importTranslations } from './commands/import-translations';
import { Log } from './helpers/log';
import { parseParams } from './helpers/params';

const run = async () => {
  const command = process.argv[2] as
    | 'export-translations'
    | 'import-translations'
    | 'help';
  const params = parseParams(process.argv.slice(3));

  Log.info(
    `Executing '${command}' command with params '{${Object.keys(params).map(
      (key) => `\n\t\t${key}=${params[key]}`
    )}\n\t}'`
  );

  switch (command) {
    case 'export-translations':
      await exportTranslations(params);
      break;
    case 'import-translations':
      await importTranslations(params);
      break;
    case 'help':
      help();
      break;
    default:
      Log.error(`Oops, the command '${command}' was not recognized.`);
      help();
      break;
  }
};

const help = () => {
  Log.info(`

    - help ** Prints CLI docs.

    - export-translations ** Exports JSONs translatable via BabelEdit or other.
      [--input=src/translations] 
      [--langs=en,de,it] 
      [--modules=module1,module2] 
      [--output=src/translations]

    - import-translations ** Imports translated JSONs and applies them.
      [--input=src/translations] 
      [--langs=en,de,it] 
      [--modules=module1,module2] 
      [--output=src/translations]
  `);
};

run().then(() => {});
