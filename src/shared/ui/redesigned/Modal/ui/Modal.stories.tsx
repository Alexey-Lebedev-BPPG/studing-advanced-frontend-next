import { Meta, StoryFn } from '@storybook/react';
import { Modal } from './Modal';
import { ThemeDecorator } from '@/shared/configs/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: Modal,
  title: 'shared/redesigned/Modal',
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = args => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus minima iusto commodi quia, id odio dolorem minus quisquam temporibus aliquam pariatur accusantium voluptate repudiandae! Iusto et, ipsum optio nisi veritatis sint aspernatur quo ea possimus autem? Ipsam minus aspernatur quos ab voluptatibus sunt aliquam minima officiis, consectetur vero illo consequatur corporis maxime animi voluptatem quaerat nam qui magnam. Ad, voluptatum harum voluptas eum expedita culpa in. Est architecto alias dolorem nostrum voluptatum numquam exercitationem minus non omnis amet, maiores culpa eveniet voluptates molestias? Ad laudantium beatae voluptates aperiam sunt. Quaerat laborum aspernatur blanditiis natus earum explicabo a perferendis ducimus quibusdam?',
  isOpen: true,
};

export const Dark = Template.bind({});
Dark.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus minima iusto commodi quia, id odio dolorem minus quisquam temporibus aliquam pariatur accusantium voluptate repudiandae! Iusto et, ipsum optio nisi veritatis sint aspernatur quo ea possimus autem? Ipsam minus aspernatur quos ab voluptatibus sunt aliquam minima officiis, consectetur vero illo consequatur corporis maxime animi voluptatem quaerat nam qui magnam. Ad, voluptatum harum voluptas eum expedita culpa in. Est architecto alias dolorem nostrum voluptatum numquam exercitationem minus non omnis amet, maiores culpa eveniet voluptates molestias? Ad laudantium beatae voluptates aperiam sunt. Quaerat laborum aspernatur blanditiis natus earum explicabo a perferendis ducimus quibusdam?',
  isOpen: true,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
