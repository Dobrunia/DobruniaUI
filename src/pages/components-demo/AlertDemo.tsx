import React from 'react';
import { Alert, AlertWithBorder } from '@DobruniaUI';

export const AlertDemo: React.FC = () => {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2 style={{ marginBottom: 24, color: 'var(--c-text-primary)' }}>
        Alert - Компонент уведомлений
      </h2>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>Базовые стили</h3>
      <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Alert type='success'>✨ Операция успешно выполнена! Ваши данные сохранены.</Alert>
        <Alert type='info'>💡 Информация: Система будет обновлена сегодня в 3:00.</Alert>
        <Alert type='warning'>⚠️ Внимание: Несохраненные изменения могут быть потеряны.</Alert>
        <Alert type='error'>🚫 Ошибка: Не удалось загрузить данные. Попробуйте позже.</Alert>
      </div>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>Outlined стили</h3>
      <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
      <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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

      <h2 style={{ marginTop: 48, marginBottom: 24, color: 'var(--c-text-primary)' }}>
        AlertWithBorder - Структурированные уведомления
      </h2>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>Базовые примеры</h3>
      <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AlertWithBorder
          type='success'
          title='Успешное выполнение'
          description='Операция была выполнена успешно. Все данные сохранены в системе.'
        >
          Дополнительная информация может быть размещена здесь.
        </AlertWithBorder>

        <AlertWithBorder
          type='info'
          title='Информация'
          description='Это информационное сообщение с важными деталями.'
        />

        <AlertWithBorder
          type='warning'
          title='Предупреждение'
          description='Обратите внимание на этот важный момент перед продолжением.'
        >
          <strong>Рекомендация:</strong> Проверьте все настройки перед сохранением.
        </AlertWithBorder>

        <AlertWithBorder
          type='error'
          title='Ошибка'
          description='Произошла ошибка при обработке запроса. Попробуйте еще раз.'
        >
          <details>
            <summary>Детали ошибки</summary>
            <p>Код ошибки: 404</p>
            <p>Время: {new Date().toLocaleTimeString()}</p>
          </details>
        </AlertWithBorder>
      </div>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>Гибкие варианты</h3>
      <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AlertWithBorder type='success' title='Только заголовок' />

        <AlertWithBorder type='info' description='Только описание без заголовка' />

        <AlertWithBorder type='warning'>
          Только дополнительный контент без заголовка и описания
        </AlertWithBorder>
      </div>

      <h3 style={{ margin: '0 0 16px 0', color: 'var(--c-text-primary)' }}>Практические примеры</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AlertWithBorder
          type='success'
          title='Аккаунт создан'
          description='Ваш аккаунт успешно создан и активирован.'
        >
          <strong>Следующие шаги:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li>Заполните профиль</li>
            <li>Подтвердите email</li>
            <li>Настройте уведомления</li>
          </ul>
        </AlertWithBorder>

        <AlertWithBorder
          type='warning'
          title='Обновление системы'
          description='Система будет недоступна с 02:00 до 04:00 для технического обслуживания.'
        />

        <AlertWithBorder
          type='error'
          title='Ошибка подключения'
          description='Не удалось установить соединение с сервером.'
        >
          <strong>Возможные причины:</strong>
          <br />
          • Проверьте интернет-соединение
          <br />
          • Убедитесь, что сервер доступен
          <br />• Попробуйте обновить страницу
        </AlertWithBorder>
      </div>
    </div>
  );
};
