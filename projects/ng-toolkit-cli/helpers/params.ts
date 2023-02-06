import { Log } from './log';

export type Params = {
  [key: string]: string;
};

export const parseParam = (arg: string): Params => {
  if (!arg.startsWith('--')) {
    Log.error(`Parameter '${arg}' not recognized.`);
  } else if (arg.includes('=')) {
    const parts = arg.split('=');
    return { [parts[0].substring(2)]: parts[1] };
  } else {
    return { [arg.substring(2)]: 'true' };
  }
};

export const parseParams = (args: string[]): Params => {
  let params: { [key: string]: string } = {};
  args.forEach((arg) => {
    params = {
      ...params,
      ...parseParam(arg),
    };
  });
  return params;
};
