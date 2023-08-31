## Запуск проекта

```
pnpm install - устанавливаем зависимости
pnpm run start:dev или pnpm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

---

## Скрипты

- `pnpm run start` - Запуск frontend проекта на webpack dev server
- `pnpm run start:vite` - Запуск frontend проекта на vite
- `pnpm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `pnpm run start:dev:vite` - Запуск frontend проекта на vite + backend
- `pnpm run start:dev:server` - Запуск backend сервера
- `pnpm run build:prod` - Сборка в prod режиме
- `pnpm run build:dev` - Сборка в dev режиме (не минимизирован)
- `pnpm run lint:ts` - Проверка ts файлов линтером
- `pnpm run lint:ts:fix` - Исправление ts файлов линтером
- `pnpm run lint:scss` - Проверка scss файлов style линтером
- `pnpm run lint:scss:fix` - Исправление scss файлов style линтером
- `pnpm run test:unit` - Запуск unit тестов с jest
- `pnpm run test:ui` - Запуск скриншотных тестов с loki
- `pnpm run test:ui:ok` - Подтверждение новых скриншотов
- `pnpm run test:ui:ci` - Запуск скриншотных тестов в CI
- `pnpm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `pnpm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `pnpm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `pnpm run storybook` - запуск Storybook
- `pnpm run storybook:build` - Сборка storybook билда
- `pnpm run prepare` - прекоммит хуки
- `pnpm run generate:slice` - Скрипт для генерации FSD слайсов

---

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Тесты

В проекте используются 4 вида тестов:

1. Обычные unit тесты на jest - `pnpm run test:unit`
2. Тесты на компоненты с React testing library -`pnpm run test:unit`
3. Скриншотное тестирование с loki `pnpm run test:ui`
4. e2e тестирование с Cypress `pnpm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin _eslint-plugin-ulbi-tv-plugin_,
который содержит 3 правила

1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2. layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entities)
3. public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров

- `pnpm run lint:ts` - Проверка ts файлов линтером
- `pnpm run lint:ts:fix` - Исправление ts файлов линтером
- `pnpm run lint:scss` - Проверка scss файлов style линтером
- `pnpm run lint:scss:fix` - Исправление scss файлов style линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

- `pnpm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

---

### Работа с feature-flags

Разрешено использование feature flags только с помощью хелпера toggleFeatures

в него передается объект с опциями

{
name: название фича-флага,
on: функция, которая отработает после Включения фичи
of: функция, которая отработает после ВЫключения фичи
}

Для автоматического удаления фичи использовать скрипт remove-feature.ts,
который принимает 2 аргумента

1. Название удаляемого фича-флага
2. Состояние (on\off)

---

## Сущности (entities)

- [Article](/src/entities/Article/README.md)
- [Comment](/src/entities/Comment/README.md)
- [Counter](/src/entities/Counter/README.md)
- [Country](/src/entities/Country/README.md)
- [Currency](/src/entities/Currency/README.md)
- [Notification](/src/entities/Notification/README.md)
- [Profile](/src/entities/Profile/README.md)
- [Rating](/src/entities/Rating/README.md)
- [User](/src/entities/User/README.md)

## Фичи (features)

- [addCommentForm](/src/features/AddCommentForm/README.md)
- [articleEditForm](/src/features/ArticleEditForm/README.md)
- [articleRating](/src/features/ArticleRating/README.md)
- [articleRecommendationsList](/src/features/ArticleRecommendationsList/README.md)
- [AuthByUsername](/src/features/AuthByUsername/README.md)
- [avatarDropdown](/src/features/AvatarDropdown/README.md)
- [editableProfileCard](/src/features/EditableProfileCard/README.md)
- [LanguageSwitcher](/src/features/LanguageSwitcher/README.md)
- [notificationButton](/src/features/NotificationButton/README.md)
- [profileRating](/src/features/ProfileRating/README.md)
- [ThemeSwitcher](/src/features/ThemeSwitcher/README.md)
- [UI](/src/features/UI/README.md)
