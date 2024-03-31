// файл для продакшн сборки
import ESBuild from 'esbuild';
import { config } from './esbuild-config';

ESBuild.build(config).catch(err => console.log('error in build esbuild', err));
