import { Meta, StoryFn } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/configs/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: CommentCard,
  title: 'entities/Comment/CommentCard',
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = arg => <CommentCard {...arg} />;

const otherArgs = {
  comment: {
    id: '1',
    text: 'lorem1',
    user: {
      id: '1',
      username: 'lorem1',
    },
  },
};

export const Normal = Template.bind({});
Normal.args = otherArgs;

// пример использования декоратора с компонентом с фичи-флагами
export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = otherArgs;
NormalRedesigned.decorators = [
  FeaturesFlagsDecorator({ isAppRedesigned: true }),
];

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'lorem1',
    user: {
      id: '1',
      username: 'lorem1',
    },
  },
  isLoading: true,
};
