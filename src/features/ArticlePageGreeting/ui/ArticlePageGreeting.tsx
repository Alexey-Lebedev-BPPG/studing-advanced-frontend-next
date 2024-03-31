import { useTranslations } from 'next-intl';
import { FC, memo, useEffect, useState } from 'react';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/redux';
import { useDetectDevice } from '@/shared/lib/hooks/useDetectDevice/useDetectDevice';
import { Text } from '@/shared/ui/deprecated/Text';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';

// модалка с приветственным сообщением, когда пользователь зашел первый раз на страницу
export const ArticlePageGreeting: FC = memo(() => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { isArticlePageWasOpened } = useJsonSettings();
  const isMobile = useDetectDevice();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
    }
  }, [dispatch, isArticlePageWasOpened]);

  const text = (
    <Text
      title={t('Добро пожаловать на страницу статей')}
      text={t(
        'Здесь Вы можете искать и просматривать статьи на различные темы',
      )}
    />
  );

  if (isMobile)
    return (
      <Drawer isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
