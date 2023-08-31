import { addCommentFormActions, addCommentFormReducer } from './addCommentForm';
import { AddCommentFormSchema } from '../types/addCommentForm';

describe('addCommentFormSlice', () => {
  test('', () => {
    const state: DeepPartial<AddCommentFormSchema> = {};
    expect(
      addCommentFormReducer(
        state as AddCommentFormSchema,
        addCommentFormActions.setText('123'),
      ),
    ).toEqual({ text: '123' });
  });
});
