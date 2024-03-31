import { useTranslations } from 'next-intl';
import { FC, useCallback } from 'react';
import {
  getProfileData,
  getProfileIsReadonly,
} from '../../model/selectors/getEditableProfileCard';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface IEditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader: FC<IEditableProfileCardHeaderProps> = ({
  className,
}) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);
  const profileData = useAppSelector(getProfileData);
  const readonly = useAppSelector(getProfileIsReadonly);

  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(
    () => dispatch(profileActions.setReadonly(false)),
    [dispatch],
  );

  const onCancelEdit = useCallback(
    () => dispatch(profileActions.cancelEdit()),
    [dispatch],
  );

  const onSave = useCallback(() => dispatch(updateProfileData()), [dispatch]);

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <HStack
          max
          justify='between'
          className={classNames('', {}, [className])}
        >
          <TextDeprecated title={`${t('Профиль')}`} />
          {!!canEdit && (
            <div>
              {readonly ? (
                <ButtonDeprecated
                  theme='outline'
                  data-testid='EditableProfileCardHeader.EditButton'
                  onClick={onEdit}
                >
                  {t('Редактировать')}
                </ButtonDeprecated>
              ) : (
                <HStack gap='8'>
                  <ButtonDeprecated
                    theme='outline_red'
                    data-testid='EditableProfileCardHeader.CancelButton'
                    onClick={onCancelEdit}
                  >
                    {t('Отменить')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    theme='outline'
                    data-testid='EditableProfileCardHeader.SaveButton'
                    onClick={onSave}
                  >
                    {t('Сохранить')}
                  </ButtonDeprecated>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      }
      on={
        <Card fullWidth border='partial' padding='24'>
          <HStack
            max
            justify='between'
            className={classNames('', {}, [className])}
          >
            <Text title={`${t('Профиль')}`} />
            {!!canEdit && (
              <div>
                {readonly ? (
                  <Button
                    data-testid='EditableProfileCardHeader.EditButton'
                    onClick={onEdit}
                  >
                    {t('Редактировать')}
                  </Button>
                ) : (
                  <HStack gap='8'>
                    <Button
                      data-testid='EditableProfileCardHeader.CancelButton'
                      color='error'
                      onClick={onCancelEdit}
                    >
                      {t('Отменить')}
                    </Button>
                    <Button
                      data-testid='EditableProfileCardHeader.SaveButton'
                      color='success'
                      onClick={onSave}
                    >
                      {t('Сохранить')}
                    </Button>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        </Card>
      }
    />
  );
};
