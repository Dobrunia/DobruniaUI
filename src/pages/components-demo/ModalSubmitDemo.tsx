import React, { useState } from 'react';
import { ModalSubmit, TextField, Button } from '@DobruniaUI';

const styles = {
  demoContainer: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  } as React.CSSProperties,

  demoHeader: {
    marginBottom: '32px',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  demoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  } as React.CSSProperties,

  demoCard: {
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
  } as React.CSSProperties,

  buttonGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,

  formGroup: {
    marginBottom: '20px',
  } as React.CSSProperties,
};

export const ModalSubmitDemo: React.FC = () => {
  // Simple confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(false);

  // Form submission modal
  const [formModal, setFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState(false);

  // Loading modal
  const [loadingModal, setLoadingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation modal
  const [validationModal, setValidationModal] = useState(false);
  const [validationData, setValidationData] = useState({
    username: '',
    password: '',
  });

  const handleFormSubmit = async () => {
    console.log('Form submitted:', formData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormData({ name: '', email: '', message: '' });
  };

  const handleDeleteConfirm = async () => {
    console.log('Item deleted');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleLoadingSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Loading submit completed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidationSubmit = async () => {
    if (!validationData.username || !validationData.password) {
      throw new Error('Please fill all fields');
    }
    console.log('Validation submit:', validationData);
    setValidationData({ username: '', password: '' });
  };

  return (
    <div style={styles.demoContainer}>
      <div style={styles.demoHeader}>
        <h1>ModalSubmit Component Demo</h1>
        <p>Модальные окна для подтверждения действий и отправки форм</p>
      </div>

      <div style={styles.demoGrid}>
        {/* Simple Confirmation */}
        <div style={styles.demoCard}>
          <h3>Простое подтверждение</h3>
          <p>Базовое модальное окно для подтверждения действия</p>
          <Button variant='primary' onClick={() => setConfirmationModal(true)}>
            Открыть подтверждение
          </Button>
        </div>

        {/* Form Submission */}
        <div style={styles.demoCard}>
          <h3>Отправка формы</h3>
          <p>Модальное окно с формой и кнопками отправки</p>
          <Button variant='primary' onClick={() => setFormModal(true)}>
            Открыть форму
          </Button>
        </div>

        {/* Delete Confirmation */}
        <div style={styles.demoCard}>
          <h3>Подтверждение удаления</h3>
          <p>Опасное действие с предупреждением</p>
          <Button variant='warning' onClick={() => setDeleteModal(true)}>
            Удалить элемент
          </Button>
        </div>

        {/* Loading State */}
        <div style={styles.demoCard}>
          <h3>Состояние загрузки</h3>
          <p>Модальное окно с индикатором загрузки</p>
          <Button variant='primary' onClick={() => setLoadingModal(true)}>
            Открыть с загрузкой
          </Button>
        </div>

        {/* Validation Example */}
        <div style={styles.demoCard}>
          <h3>Валидация формы</h3>
          <p>Модальное окно с валидацией полей</p>
          <Button variant='primary' onClick={() => setValidationModal(true)}>
            Открыть валидацию
          </Button>
        </div>
      </div>

      {/* Simple Confirmation Modal */}
      <ModalSubmit
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        onSubmit={() => {
          console.log('Simple confirmation confirmed');
        }}
        title='Подтверждение действия'
        submitText='Подтвердить'
        cancelText='Отмена'
      >
        <p>Вы уверены, что хотите выполнить это действие?</p>
        <p>Это действие можно будет отменить позже.</p>
      </ModalSubmit>

      {/* Form Submission Modal */}
      <ModalSubmit
        isOpen={formModal}
        onClose={() => setFormModal(false)}
        onSubmit={handleFormSubmit}
        title='Отправить сообщение'
        submitText='Отправить'
        cancelText='Отмена'
        size='medium'
      >
        <div style={styles.formGroup}>
          <TextField
            label='Имя'
            type='text'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <TextField
            label='Email'
            type='email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <TextField
            label='Сообщение'
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>
      </ModalSubmit>

      {/* Delete Confirmation Modal */}
      <ModalSubmit
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onSubmit={handleDeleteConfirm}
        title='Удалить элемент'
        submitText='Удалить'
        cancelText='Отмена'
        submitVariant='warning'
        size='small'
      >
        <p>Вы действительно хотите удалить этот элемент?</p>
        <p>
          <strong>Это действие нельзя отменить.</strong>
        </p>
      </ModalSubmit>

      {/* Loading Modal */}
      <ModalSubmit
        isOpen={loadingModal}
        onClose={() => setLoadingModal(false)}
        onSubmit={handleLoadingSubmit}
        title='Отправка данных'
        submitText='Отправить'
        cancelText='Отмена'
        isLoading={isSubmitting}
        preventCloseOnSubmit={true}
      >
        <p>Нажмите "Отправить" чтобы начать процесс отправки данных.</p>
        <p>Процесс займет несколько секунд.</p>
        {isSubmitting && (
          <p>
            <em>Отправка данных... Пожалуйста, подождите.</em>
          </p>
        )}
      </ModalSubmit>

      {/* Validation Modal */}
      <ModalSubmit
        isOpen={validationModal}
        onClose={() => setValidationModal(false)}
        onSubmit={handleValidationSubmit}
        title='Авторизация'
        submitText='Войти'
        cancelText='Отмена'
        disabled={!validationData.username || !validationData.password}
      >
        <div style={styles.formGroup}>
          <TextField
            label='Имя пользователя'
            type='text'
            value={validationData.username}
            onChange={(e) => setValidationData({ ...validationData, username: e.target.value })}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <TextField
            label='Пароль'
            type='password'
            value={validationData.password}
            onChange={(e) => setValidationData({ ...validationData, password: e.target.value })}
            required
          />
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Кнопка "Войти" активируется только после заполнения всех полей.
        </p>
      </ModalSubmit>
    </div>
  );
};
