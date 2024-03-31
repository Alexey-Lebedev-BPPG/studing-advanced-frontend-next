import { FC, memo, useState } from 'react';
import cls from './StarRating.module.scss';
import { Icon } from '../../../redesigned/Icon';
import { Icon as IconDeprecated } from '../../Icon';
import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

export interface IStartRatingProps {
  className?: string;
  // для выбора оценки
  onSelect?: (starsCount: number) => void;
  // для подсветки оценки, которую раньше пользователь уже выбирал
  selectedStars?: number;
  size?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating: FC<IStartRatingProps> = memo(props => {
  const { className, onSelect, selectedStars = 0, size = 30 } = props;
  // состояние, указывающее, сколько звезд подсвечивать при наведении
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  // состояние, указывающее, что пользователь уже ранее выбрал оценку
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  // если элементы не выбраны, то устанавливаем на какую звезду пользователь направил (при этом можно использовать замыкание т.к. в эту функцию нужно будет прокидывать данные)
  const onHover = (starCount: number) => () =>
    !isSelected && setCurrentStarsCount(starCount);

  // когда выходим мышкой за пределы звезд
  const onLeave = () => !isSelected && setCurrentStarsCount(0);

  const onClick = (starCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starCount);
      setCurrentStarsCount(starCount);
      setIsSelected(true);
    }
  };

  return (
    <div
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          off: () => cls['star-rating'],
          on: () => cls['star-rating-redesigned'],
        }),
        {},
        [className],
      )}
    >
      {stars.map(starNumber => {
        const commonProps = {
          Svg: StarIcon,
          className: classNames(
            cls['star-item'],
            { [cls.selected]: isSelected },
            [currentStarsCount >= starNumber ? cls.hovered : cls.normal],
          ),
          // для проверки количества выбранных звезд
          'data-selected': currentStarsCount >= starNumber,
          'data-testid': `StarRating.${starNumber}`,
          height: size,
          onClick: onClick(starNumber),
          onMouseEnter: onHover(starNumber),
          onMouseLeave: onLeave,
          width: size,
        };

        return (
          <ToggleFeatures
            key={starNumber}
            nameFeatures={'isAppRedesigned'}
            off={<IconDeprecated {...commonProps} />}
            on={<Icon clickable={!isSelected} {...commonProps} />}
          />
        );
      })}
    </div>
  );
});
