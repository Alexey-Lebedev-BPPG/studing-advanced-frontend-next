import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
import { TestProvider } from '@/shared/lib/tests/componentRender/componentRender';

describe('Button', () => {
  test('Test render', () => {
    render(
      <TestProvider options={{ initialState: { counter: { value: 10 } } }}>
        <ArticleAdditionalInfo
          createdAt='22.10.2000'
          views={10}
          author={{
            avatar: '',
            id: '',
            username: '',
          }}
          onEdit={() => console.log()}
        />
      </TestProvider>,
    );
    expect(screen.getByText('22.10.2000')).toBeInTheDocument();
  });

  test('Test clear theme', () => {
    render(
      <TestProvider options={{ initialState: { counter: { value: 10 } } }}>
        <ArticleAdditionalInfo
          createdAt='22.10.2000'
          views={10}
          author={{
            avatar: '',
            id: '',
            username: '',
          }}
          onEdit={() => console.log()}
        />
      </TestProvider>,
    );
    const tree = renderer
      .create(
        <TestProvider options={{ initialState: { counter: { value: 10 } } }}>
          <ArticleAdditionalInfo
            createdAt='22.10.2000'
            views={10}
            author={{
              avatar: '',
              id: '',
              username: '',
            }}
            onEdit={() => console.log()}
          />
        </TestProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
