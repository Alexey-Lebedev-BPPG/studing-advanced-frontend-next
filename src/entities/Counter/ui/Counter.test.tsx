import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Counter } from './Counter';
import {
  TestProvider,
  componentRender,
} from '@/shared/lib/tests/componentRender/componentRender';

describe('Counter', () => {
  test('Test render', () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
    // проверяем, что текст внутри элемента равен 10
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  test('increment', async () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
    await userEvent.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  test('decrement', async () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
    await userEvent.click(screen.getByTestId('decrement-btn'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });

  const tree = renderer
    .create(
      <TestProvider options={{ initialState: { counter: { value: 10 } } }}>
        <Counter />
      </TestProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
