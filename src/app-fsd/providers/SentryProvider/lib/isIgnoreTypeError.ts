export const isIgnoreTypeError = (typeError?: string) =>
  typeError === 'WalletNotSelectedError' ||
  typeError === 'WalletConnectionError' ||
  typeError === 'WalletSignMessageError' ||
  typeError === 'WalletNotConnectedError' ||
  typeError === 'WalletNotReadyError' ||
  typeError === 'WalletWindowClosedError' ||
  typeError === 'WalletWindowBlockedError' ||
  typeError === 'AxiosError';
