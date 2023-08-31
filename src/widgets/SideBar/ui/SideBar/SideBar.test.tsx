import { fireEvent, screen } from '@testing-library/react';
import { SideBar } from './SideBar';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('SideBar', () => {
  test('Test render', () => {
    // чтоб можно было тестить с i18next
    // const SidebarWithTranslation = withTranslation()(SideBar);
    // render(<SidebarWithTranslation />);
    // после добавления обертки для тестирования с переводами, получаем такой синтаксис
    componentRender(<SideBar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('test toggle', () => {
    componentRender(<SideBar />);
    const toggleButton = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
