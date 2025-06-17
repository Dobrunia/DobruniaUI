# Настройка деплоя демо на GitHub Pages

## Включение GitHub Pages

### Автоматическое включение (рекомендуется)

Workflow автоматически включит и настроит GitHub Pages при первом запуске.

### Ручное включение (если автоматическое не работает)

1. Перейти в настройки репозитория: **Settings** → **Pages**
2. В разделе **Source** выбрать **"GitHub Actions"**
3. Сохранить настройки

### Устранение ошибок

Если видите ошибку "Get Pages site failed":

1. Проверьте, что у вас есть права администратора в репозитории
2. Убедитесь, что в **Settings** → **Actions** → **General** включены workflow permissions
3. В разделе **Workflow permissions** выберите "Read and write permissions"

## Что происходит при деплое

1. **Сборка библиотеки**: `npm run build` собирает UMD/ES модули для npm
2. **Сборка демо**: `npm run build:demo` собирает статическое демо-приложение
3. **Публикация библиотеки**: загружается в npm как пакет `dobruniaui`
4. **Деплой демо**: загружается на GitHub Pages по адресу `https://dobrunia.github.io/DobruniaUI/`

## Результат

- 📦 Библиотека доступна в npm: `npm install dobruniaui`
- 🎮 Демо доступно по ссылке: https://dobrunia.github.io/DobruniaUI/
- 🏷️ Создается GitHub релиз с описанием изменений

## Скрипты

- `npm run build` - сборка библиотеки для npm
- `npm run build:demo` - сборка демо-приложения
- `npm run dev` - запуск dev-сервера с демо
- `npm run preview` - предварительный просмотр собранного демо
 