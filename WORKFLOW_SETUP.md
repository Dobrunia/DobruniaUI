# 🚀 Настройка CI/CD для DobruniaUI

## Обзор workflow'ов

Создано 2 GitHub Actions workflow'а:

### 1. `ci-cd.yml` - Автоматический CI/CD

- **Триггер**: push в `main`/`master` и pull requests
- **Функции**:
  - ✅ Проверка линтинга и сборки
  - 🔄 Автоматическое обновление версии (если не обновлена вручную)
  - 📦 Публикация в NPM
  - 🏷️ Создание Git тегов и GitHub релизов

### 2. `release.yml` - Ручной релиз

- **Триггер**: ручной запуск через GitHub UI
- **Функции**:
  - 📈 Выбор типа версии (patch/minor/major)
  - 🔧 Контролируемый процесс релиза

## 📋 Шаги настройки

### 1. Настройка NPM токена

1. Войдите на [npmjs.com](https://www.npmjs.com)
2. Перейдите в **Access Tokens** в настройках профиля
3. Создайте новый токен с правами **Automation**
4. Скопируйте токен

### 2. Настройка GitHub Secrets

В вашем GitHub репозитории:

1. Перейдите в **Settings** → **Secrets and variables** → **Actions**
2. Добавьте секрет:
   - **Name**: `NPM_TOKEN`
   - **Value**: ваш NPM токен

### 3. Обновите package.json

Замените в `package.json`:

- `USERNAME` на ваш GitHub username
- `Your Name <your.email@example.com>` на ваши данные

```json
{
  "homepage": "https://github.com/YOUR_USERNAME/dobruniaui#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YOUR_USERNAME/dobruniaui.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/dobruniaui/issues"
  },
  "author": "Your Name <your.email@example.com>"
}
```

### 4. Проверьте настройки NPM

Убедитесь, что пакет `dobruniaui` доступен для публикации:

```bash
# Проверить доступность имени
npm view dobruniaui

# Если пакет уже существует, измените name в package.json
```

## 🔧 Как использовать

### Автоматический workflow

1. Сделайте изменения в коде
2. Commit и push в `main`/`master`
3. Workflow автоматически:
   - Проверит код
   - Обновит версию (patch) если вы забыли
   - Опубликует в NPM
   - Создаст релиз

### Ручной релиз

1. Перейдите в **Actions** → **Release**
2. Нажмите **Run workflow**
3. Выберите тип версии:
   - `patch`: 1.0.0 → 1.0.1 (исправления)
   - `minor`: 1.0.0 → 1.1.0 (новые функции)
   - `major`: 1.0.0 → 2.0.0 (breaking changes)

### Ручное обновление версии

```bash
# Patch версия (1.0.0 → 1.0.1)
yarn version:patch

# Minor версия (1.0.0 → 1.1.0)
yarn version:minor

# Major версия (1.0.0 → 2.0.0)
yarn version:major
```

## 📦 Что происходит при публикации

1. **Сборка проекта**: `yarn build`
2. **Проверка линтинга**: `yarn lint`
3. **Обновление версии**: автоматически или вручную
4. **Создание Git тега**: `v1.0.0`
5. **Публикация в NPM**: `yarn publish`
6. **GitHub релиз**: с changelog и инструкциями

## 🛡️ Безопасность

- Workflow'ы используют `[skip ci]` для избежания бесконечных циклов
- Проверяется существование версии в NPM перед публикацией
- Секреты GitHub надежно хранятся и не логируются

## 🔍 Мониторинг

Отслеживайте статус workflow'ов в разделе **Actions** вашего репозитория.

## 🆘 Возможные проблемы

### Ошибка: "Package already exists"

- Измените `name` в package.json или обновите версию

### Ошибка: "Invalid NPM token"

- Проверьте правильность NPM_TOKEN в GitHub Secrets

### Ошибка: "Permission denied"

- Убедитесь, что токен имеет права **Automation**
- Проверьте права доступа к репозиторию

## ✅ Проверка готовности

- [ ] NPM токен настроен в GitHub Secrets
- [ ] package.json обновлен с вашими данными
- [ ] Имя пакета доступно в NPM
- [ ] Код проходит линтинг: `yarn lint`
- [ ] Проект собирается: `yarn build`

После выполнения всех шагов ваш CI/CD готов к работе! 🎉
