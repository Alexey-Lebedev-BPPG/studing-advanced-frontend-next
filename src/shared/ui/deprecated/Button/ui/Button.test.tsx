import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from './Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button>{'TEST'}</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
    const tree = renderer.create(<Button>{'TEST'}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Test clear theme', () => {
    render(<Button theme='clear'>{'TEST'}</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    const tree = renderer
      .create(<Button theme='clear'>{'TEST'}</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
