import { memo } from 'react';

// делаем обертку для того, чтоб принимать дженериком тип для пропсов в компоненте, который использует мемо
export const typedMemo: <T>(c: T) => T = memo;
