import React from 'react';
import { Alert } from '@DobruniaUI';

export const AlertDemo: React.FC = () => {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2 style={{ marginBottom: 24, color: 'var(--c-text-primary)' }}>
        Alert - Компонент уведомлений
      </h2>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>Базовые стили</h3>
      <div style={{ marginBottom: 32 }}>
        <Alert type='success'>✨ Операция успешно выполнена! Ваши данные сохранены.</Alert>
        <Alert type='info'>💡 Информация: Система будет обновлена сегодня в 3:00.</Alert>
        <Alert type='warning'>⚠️ Внимание: Несохраненные изменения могут быть потеряны.</Alert>
        <Alert type='error'>🚫 Ошибка: Не удалось загрузить данные. Попробуйте позже.</Alert>
      </div>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>Outlined стили</h3>
      <div style={{ marginBottom: 32 }}>
        <Alert type='success' outlined>
          Файл успешно загружен в систему.
        </Alert>
        <Alert type='info' outlined>
          Новая версия приложения доступна для скачивания.
        </Alert>
        <Alert type='warning' outlined>
          Осталось 3 попытки входа в систему.
        </Alert>
        <Alert type='error' outlined>
          Соединение с сервером потеряно.
        </Alert>
      </div>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>С богатым содержимым</h3>
      <div style={{ marginBottom: 32 }}>
        <Alert type='info'>
          <strong>Обновление системы:</strong>
          <br />
          Планируется техническое обслуживание с 02:00 до 04:00. В это время сервис может быть
          недоступен.
        </Alert>

        <Alert type='warning' outlined>
          <strong>Проверьте данные:</strong>
          <br />
          • Email должен быть валидным
          <br />
          • Пароль должен содержать минимум 8 символов
          <br />• Обязательные поля должны быть заполнены
        </Alert>

        <Alert type='error'>
          <strong>Критическая ошибка!</strong>
          <br />
          Обратитесь к администратору системы или попробуйте{' '}
          <a href='#' style={{ color: 'inherit', textDecoration: 'underline' }}>
            перезагрузить страницу
          </a>
          .
        </Alert>

        <Alert type='success' outlined>
          <strong>Поздравляем! 🎉</strong>
          <br />
          Ваш аккаунт успешно создан. Письмо с подтверждением отправлено на указанный email.
        </Alert>
      </div>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>Практические примеры</h3>
      <div>
        <Alert type='info'>
          <strong>Совет:</strong> Используйте type="success" для подтверждения действий, "info" для
          информирования, "warning" для предупреждений, "error" для ошибок.
        </Alert>

        <Alert type='success'>Форма отправлена! Мы свяжемся с вами в течение 24 часов.</Alert>

        <Alert type='warning' outlined>
          Сессия истекает через 5 минут. Сохраните изменения.
        </Alert>

        <div style={{ marginBottom: 0 }}>
          <Alert type='error' outlined>
            Неверный логин или пароль. Попробуйте еще раз.
          </Alert>
        </div>
      </div>
    </div>
  );
};
