const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла сторибука
module.exports = componentName => {
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { StoryFn, Meta } from '@storybook/react';
import { ${nameToPascalCase} } from './${nameToPascalCase}';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },
  component: ${nameToPascalCase},
  title: '***/${nameToPascalCase}',
} as Meta<typeof ${nameToPascalCase}>;

const Template: StoryFn<typeof ${nameToPascalCase}> = arg => <${nameToPascalCase} {...arg} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
`;
};
