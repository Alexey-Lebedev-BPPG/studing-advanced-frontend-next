import { Meta, StoryFn } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
  argTypes: { backgroundColor: { control: 'color' } },

  component: CommentList,
  title: 'entities/Comment/CommentList',
} as Meta<typeof CommentList>;

const Template: StoryFn<typeof CommentList> = arg => <CommentList {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'lorem1',
      user: {
        id: '1',
        username: 'lorem1',
      },
    },
    {
      id: '2',
      text: 'lorem2',
      user: {
        id: '2',
        username: 'lorem2',
      },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
