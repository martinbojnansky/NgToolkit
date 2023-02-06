import * as fs from 'fs';
import * as tsc from 'typescript';
import { Log } from '../helpers/log';
import { trySafe } from '../helpers/try-safe';

export type ExportTranslationsParams = {
  [key in 'input' | 'output' | 'langs' | 'modules']?: string;
};

export const exportTranslations = async (params: ExportTranslationsParams) => {
  trySafe(() => {
    fs.rmdirSync(params.output);
    Log.info('');
  });

  const langs = params.langs?.split(',') || [];
  for (let lang of langs) {
    let allModules = {};
    for (let module of params.modules?.split(',') || []) {
      const moduleTs = fs
        .readFileSync(`${params.input}/${module}/${lang}.ts`)
        .toString();
      const moduleJs = tsc.transpileModule(moduleTs, {
        compilerOptions: {
          module: tsc.ModuleKind.CommonJS,
          moduleResolution: tsc.ModuleResolutionKind.NodeJs,
          target: tsc.ScriptTarget.ES2018,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
        },
      }).outputText;
      allModules = {
        ...allModules,
        ...{
          [module]: eval(`${moduleJs}`),
        },
      };
    }
    const langJson = JSON.stringify(
      allModules,
      (key: any, value: any): any => {
        switch (typeof value) {
          case 'function':
            return `(${(value as Function).toString()})`;
          default:
            return value;
        }
      },
      '\t'
    );
    fs.mkdirSync(params.output, { recursive: true });
    fs.writeFileSync(`${params.output}/${lang}.json`, langJson);
  }
};
