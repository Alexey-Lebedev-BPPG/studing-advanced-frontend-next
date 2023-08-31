'use client';

import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RatingCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useDetectDevice } from '@/shared/lib/hooks/useDetectDevice/useDetectDevice';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface IRatingCardProps {
  className?: string;
  // отзыв, который будем писать внутри модального окна
  feedbackTitle: string;
  // указывает, нужно ли будет писать отзыв
  hasFeedback?: boolean;
  // отправить/отменить отзыв
  onAccept?: (starCount: number, feedback?: string) => void;
  onCancel?: (starCount: number) => void;
  // количество звезд, которое юзер оставил ранее
  rate?: number;
  title: string;
}

export const RatingCard: FC<IRatingCardProps> = props => {
  const {
    className,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    rate = 0,
    title,
  } = props;

  const { t } = useTranslation();
  const isMobile = useDetectDevice();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStarCount: number) => {
      setStarsCount(selectedStarCount);
      // eslint-disable-next-line no-unused-expressions
      hasFeedback ? setIsOpenModal(true) : onAccept?.(selectedStarCount);
    },
    [hasFeedback, onAccept],
  );

  const acceptHandle = useCallback(() => {
    setIsOpenModal(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsOpenModal(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testId='RatingCard.InputDeprecated'
            value={feedback}
            placeholder={`${t('Ваш отзыв')}`}
            onChange={setFeedback}
          />
        </>
      }
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testId='RatingCard.InputDeprecated'
            value={feedback}
            placeholder={`${t('Ваш отзыв')}`}
            onChange={setFeedback}
          />
        </>
      }
    />
  );

  const mainContent = (
    <VStack max gap='8' align='center'>
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        on={<Text title={starsCount ? `${t('Спасибо за оценку!')}` : title} />}
        off={
          <TextDeprecated
            title={starsCount ? `${t('Спасибо за оценку!')}` : title}
          />
        }
      />
      <StarRating
        selectedStars={starsCount}
        size={40}
        onSelect={onSelectStars}
      />
      {isMobile ? (
        <Drawer isOpen={isOpenModal} onClose={cancelHandle}>
          <VStack gap='32'>
            {modalContent}
            <ToggleFeatures
              nameFeatures={'isAppRedesigned'}
              off={
                <ButtonDeprecated fullWidth size='l' onClick={acceptHandle}>
                  {t('Отправить')}
                </ButtonDeprecated>
              }
              on={
                <Button fullWidth size='l' onClick={acceptHandle}>
                  {t('Отправить')}
                </Button>
              }
            />
          </VStack>
        </Drawer>
      ) : (
        <Modal isOpen={isOpenModal}>
          <VStack max gap='32'>
            {modalContent}
            <ToggleFeatures
              nameFeatures={'isAppRedesigned'}
              off={
                <HStack max gap='16' justify='end'>
                  <ButtonDeprecated
                    theme='outline_red'
                    data-testid='RatingCard.Close'
                    onClick={cancelHandle}
                  >
                    {t('Закрыть')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    data-testid='RatingCard.Send'
                    onClick={acceptHandle}
                  >
                    {t('Отправить')}
                  </ButtonDeprecated>
                </HStack>
              }
              on={
                <HStack max gap='16' justify='end'>
                  <Button data-testid='RatingCard.Close' onClick={cancelHandle}>
                    {t('Закрыть')}
                  </Button>
                  <Button data-testid='RatingCard.Send' onClick={acceptHandle}>
                    {t('Отправить')}
                  </Button>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      )}
    </VStack>
  );

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <CardDeprecated
          fullWidth
          className={classNames(cls.rating, {}, [className])}
          data-testid='RatingCard'
        >
          {mainContent}
        </CardDeprecated>
      }
      on={
        <Card fullWidth padding='24' border='partial' data-testid='RatingCard'>
          {mainContent}
        </Card>
      }
    />
  );
};
