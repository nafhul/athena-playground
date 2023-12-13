import { NextjsEnv } from '@bitdev/nextjs.nextjs-env';
import { ESLint as ESLintLib } from 'eslint';
import { Compiler } from '@teambit/compiler';
import { EnvHandler } from '@teambit/envs';
import {
  TypescriptCompiler,
  resolveTypes,
  TypescriptTask,
} from '@teambit/typescript.typescript-compiler';
import { ESLintLinter, EslintTask } from '@teambit/defender.eslint-linter';
import { JestTask } from '@teambit/defender.jest-tester';
// import { webpackTransformer } from './config/webpack.config';

export class MyNextjsEnv extends NextjsEnv {
  /* a shorthand name for the env */
  name = 'my-nextjs-env';

  /**
   * icon for the env. use this to build a more friendly env.
   * uses nextjs by default.
   */
  icon = 'https://static.bit.dev/extensions-icons/nextjs-logo.svg';

  /* the compiler to use during development */
  compiler(): EnvHandler<Compiler> {
    /**
     * @see https://bit.dev/reference/typescript/using-typescript
     * */
    return TypescriptCompiler.from({
      tsconfig: require.resolve('./config/tsconfig.json'),
      types: resolveTypes(__dirname, ['./types']),
    });
  }

  /**
   * returns an instance of the default ESLint.
   * config files would be used to validate coding standards in components.
   * bit will write the minimum required files in any workspace to optimize
   * for dev experience.
   */
  linter() {
    return ESLintLinter.from({
      tsconfig: require.resolve('./config/tsconfig.json'),
      eslint: ESLintLib,
      configPath: require.resolve('./config/eslintrc.js'),
      pluginsPath: __dirname,
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    });
  }

  /**
   * a set of processes to be performed before a component is snapped, during its build phase
   * @see https://bit.dev/docs/react-env/build-pipelines
   */
  build() {
    return super.build().replace([
      TypescriptTask.from({
        tsconfig: require.resolve('./config/tsconfig.json'),
        types: resolveTypes(__dirname, ['./types']),
      }),
      EslintTask.from({
        tsconfig: require.resolve('./config/tsconfig.json'),
        configPath: require.resolve('./config/eslintrc.js'),
        pluginsPath: __dirname,
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
      }),
      JestTask.from({
        config: require.resolve('./config/jest.config'),
      }),
    ]);
  }
}

export default new MyNextjsEnv();
