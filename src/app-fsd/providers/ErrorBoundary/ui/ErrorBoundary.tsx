import { Component, ErrorInfo, ReactNode, Suspense } from 'react';
import { PageError } from '@/widgets/PageError';

// можно использовать либу react-error-boundary
interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error) {
    // обновляем стейт, чтоб показать PageError
    return { hasError: true };
  }

  // перехватываем ошибку и выводим в консоль или отправляем куда-либо
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError)
      return (
        <Suspense fallback=''>
          <PageError />
        </Suspense>
      );

    return children;
  }
}

export default ErrorBoundary;
// для того, чтоб использовать переводы в классовых компонентах
// export default withTranslation()(ErrorBoundary);
