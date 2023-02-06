import * as fs from 'fs';

export type ImportTranslationsParams = {
  [key in 'input' | 'output' | 'langs' | 'modules']?: string;
};

export const importTranslations = async (params: ImportTranslationsParams) => {
  const langs = params.langs?.split(',') || [];
  for (let lang of langs) {
    const langJson = fs.readFileSync(`${params.input}/${lang}.json`).toString();
    const langObj = JSON.parse(langJson);
    for (let module of params.modules?.split(',') || []) {
      const moduleJson = JSON.stringify(langObj[module], null, '\t');
      const outFilePath = `${params.output}/${module}/${lang}.ts`;
      const outFileText = fs.readFileSync(outFilePath).toString();
      const outFileMatch = new RegExp(`export const ${module}:.+(?={)`).exec(
        outFileText
      )[0];
      const newModuleJson = moduleJson
        .replace(/\"\(\(/g, '(')
        .replace(/\)\"/g, '');
      const newOutFileText =
        outFileText.substring(
          0,
          outFileText.indexOf(outFileMatch) + outFileMatch.length
        ) +
        newModuleJson +
        ';\n';
      fs.writeFileSync(`${params.output}/${module}/${lang}.ts`, newOutFileText);
    }
  }
};
