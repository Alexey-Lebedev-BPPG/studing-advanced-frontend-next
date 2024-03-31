// переименовываем импорт, чтоб не было конфликта с Configuration вебпака
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export const buildDevServer = (
  options: BuildOptions,
): DevServerConfiguration => ({
  allowedHosts: options.isDev ? 'all' : undefined,
  // что показываем в консоли терминала
  client: {
    logging: options.isDevDebug ? 'log' : 'none',
    overlay: {
      errors: Boolean(options.isDevDebug),
      warnings: Boolean(options.isDevDebug),
    },
    progress: Boolean(options.isDevDebug),
  },
  // чтоб страницы не валились при перезагрузке. Работает только в девсервере
  historyApiFallback: true,
  // для горячей перезагрузки (чтоб при изменениях в коде не обновлять страницу)
  hot: true,
  // открываем автоматически страницу в браузере при старте приложения
  open: true,
  // порт, на котором открывается приложение
  port: options.port,
});
