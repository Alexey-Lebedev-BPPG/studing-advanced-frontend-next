export const isIgnoreMessageError = (message: string) =>
  message.includes('network error') ||
  message.includes('User rejected') ||
  message.includes('AxiosError') ||
  message.includes('Requested resource not available.');
