const getCamelCase = require('../helpers/stringToCamelCase');
const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла компонентов
module.exports = componentName => {
  const nameToCamelCase = `${getCamelCase(componentName)}`;
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { FC, memo } from 'react';
import { useTranslations } from 'next-intl';
import cls from './${nameToPascalCase}.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface I${nameToPascalCase}Props {
  className?: string;
}

export const ${nameToPascalCase}: FC<I${nameToPascalCase}Props> = memo(props => {
  const { className } = props;
  const t = useTranslations();

  return (
    <div className={classNames(cls.${nameToCamelCase}, {}, [className])}>
      <div />
    </div>
  );
});

// export default ${nameToPascalCase};
`;
};
