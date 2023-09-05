'use client';

import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import cls from './AddCommentForm.module.scss';
import { getAddCommentFormText } from '../model/selectors/getAddCommentForm/getAddCommentForm';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../model/slice/addCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

export interface IAddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<IAddCommentFormProps> = props => {
  const { className, onSendComment } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const text = useAppSelector(getAddCommentFormText);

  const onCommentTextChange = useCallback(
    (value: string) => dispatch(addCommentFormActions.setText(value)),
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <HStack
            max
            justify='between'
            className={classNames(cls.addCommentForm, {}, [className])}
            data-testid='AddCommentForm'
          >
            <InputDeprecated
              placeholder={`${t('Введите текст комментария')}`}
              value={text}
              className={cls.input}
              data-testid='AddCommentForm.Input'
              onChange={onCommentTextChange}
            />
            <ButtonDeprecated
              data-testid='AddCommentForm.Button'
              onClick={onSendHandler}
            >
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        }
        on={
          <Card fullWidth padding='24' border='partial'>
            <HStack
              max
              gap='16'
              justify='between'
              data-testid='AddCommentForm'
              className={classNames(cls.addCommentFormRedesigned, {}, [
                className,
              ])}
            >
              <Input
                placeholder={`${t('Введите текст комментария')}`}
                value={text}
                className={cls.input}
                data-testid='AddCommentForm.Input'
                onChange={onCommentTextChange}
              />
              <Button
                data-testid='AddCommentForm.Button'
                onClick={onSendHandler}
              >
                {t('Отправить')}
              </Button>
            </HStack>
          </Card>
        }
      />
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
