import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Text } from './Text';

describe('Text', () => {
  test('Test render', () => {
    render(<Text text={'TEST'} />);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('Test clear theme', () => {
    render(<Text theme='error' text={'TEST'} />);
    expect(screen.getByText('TEST')).toHaveClass('text');
    const tree = renderer
      .create(<Text theme='primary' text={'TEST'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
