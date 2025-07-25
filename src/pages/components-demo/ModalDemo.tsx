import React, { useState } from 'react';
import { Modal, TextField, Button } from '@DobruniaUI';

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
    border: '1px solid var(--c-border)',
    backgroundColor: 'var(--c-bg-default)',
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

export const ModalDemo: React.FC = () => {
  const [basicModal, setBasicModal] = useState(false);
  const [sizesModal, setSizesModal] = useState<'small' | 'medium' | 'large' | 'fullscreen' | null>(
    null
  );
  const [confirmModal, setConfirmModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [secondNestedModal, setSecondNestedModal] = useState(false);
  const [customModal, setCustomModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormModal(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const longContent = (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo.
      </p>
      <p>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      </p>
      <p>
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
        velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
        quaerat voluptatem.
      </p>
      <p>
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
        nisi ut aliquid ex ea commodi consequatur?
      </p>
    </div>
  );

  return (
    <div style={styles.demoContainer}>
      <div style={styles.demoHeader}>
        <h1>Modal Component Demo</h1>
        <p>Модальные окна с различными настройками и размерами</p>
      </div>

      <div style={styles.demoGrid}>
        {/* Basic Modal */}
        <div style={styles.demoCard}>
          <h3>Базовое модальное окно</h3>
          <p>Простое модальное окно с заголовком и кнопкой закрытия</p>
          <Button variant='primary' onClick={() => setBasicModal(true)}>
            Открыть базовое модальное окно
          </Button>
        </div>

        {/* Size Variants */}
        <div style={styles.demoCard}>
          <h3>Размеры модальных окон</h3>
          <p>Различные размеры: small, medium, large, fullscreen</p>
          <div style={styles.buttonGroup}>
            <Button variant='primary' onClick={() => setSizesModal('small')}>
              Small
            </Button>
            <Button variant='primary' onClick={() => setSizesModal('medium')}>
              Medium
            </Button>
            <Button variant='primary' onClick={() => setSizesModal('large')}>
              Large
            </Button>
            <Button variant='primary' onClick={() => setSizesModal('fullscreen')}>
              Fullscreen
            </Button>
          </div>
        </div>

        {/* Confirmation Modal */}
        <div style={styles.demoCard}>
          <h3>Модальное окно подтверждения</h3>
          <p>Модальное окно для подтверждения действий</p>
          <Button variant='warning' onClick={() => setConfirmModal(true)}>
            Удалить аккаунт
          </Button>
        </div>

        {/* Form Modal */}
        <div style={styles.demoCard}>
          <h3>Модальное окно с формой</h3>
          <p>Форма обратной связи в модальном окне</p>
          <Button variant='primary' onClick={() => setFormModal(true)}>
            Открыть форму
          </Button>
        </div>

        {/* Nested Modals */}
        <div style={styles.demoCard}>
          <h3>Вложенные модальные окна</h3>
          <p>Модальное окно, которое открывает другое модальное окно</p>
          <Button variant='primary' onClick={() => setNestedModal(true)}>
            Открыть вложенное модальное окно
          </Button>
        </div>

        {/* Custom Styled Modal */}
        <div style={styles.demoCard}>
          <h3>Кастомное модальное окно</h3>
          <p>Модальное окно с отключением стандартного поведения</p>
          <Button variant='primary' onClick={() => setCustomModal(true)}>
            Открыть кастомное
          </Button>
        </div>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={basicModal}
        onClose={() => setBasicModal(false)}
        title='Базовое модальное окно'
      >
        <div>
          <p>Это простое модальное окно с заголовком и содержимым.</p>
          <p>Его можно закрыть:</p>
          <ul>
            <li>Нажав на кнопку закрытия</li>
            <li>Нажав клавишу Escape</li>
            <li>Кликнув по фону</li>
          </ul>
        </div>
      </Modal>

      {/* Size Variants */}
      <Modal
        isOpen={sizesModal !== null}
        onClose={() => setSizesModal(null)}
        title={`Модальное окно размера ${sizesModal}`}
        size={sizesModal || 'medium'}
      >
        <div>
          <p>
            Это модальное окно размера <strong>{sizesModal}</strong>.
          </p>
          {longContent}
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        title='Подтверждение удаления'
        size='small'
      >
        <div>
          <p>Вы действительно хотите удалить свой аккаунт?</p>
          <p>
            <strong>Это действие нельзя отменить.</strong>
          </p>
          <div style={{ ...styles.buttonGroup, marginTop: '24px' }}>
            <Button variant='secondary' onClick={() => setConfirmModal(false)}>
              Отмена
            </Button>
            <Button
              variant='warning'
              onClick={() => {
                console.log('Account deleted');
                setConfirmModal(false);
              }}
            >
              Удалить
            </Button>
          </div>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={formModal}
        onClose={() => setFormModal(false)}
        title='Обратная связь'
        size='medium'
      >
        <form onSubmit={handleFormSubmit}>
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
          <div style={styles.buttonGroup}>
            <Button type='button' variant='secondary' onClick={() => setFormModal(false)}>
              Отмена
            </Button>
            <Button type='submit' variant='primary'>
              Отправить
            </Button>
          </div>
        </form>
      </Modal>

      {/* Nested Modals */}
      <Modal
        isOpen={nestedModal}
        onClose={() => setNestedModal(false)}
        title='Первое модальное окно'
      >
        <div>
          <p>Это первое модальное окно.</p>
          <p>Из него можно открыть второе модальное окно.</p>
          <Button variant='primary' onClick={() => setSecondNestedModal(true)}>
            Открыть второе модальное окно
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={secondNestedModal}
        onClose={() => setSecondNestedModal(false)}
        title='Второе модальное окно'
        size='small'
      >
        <div>
          <p>Это второе модальное окно, открытое поверх первого.</p>
          <p>Z-index автоматически управляется Portal компонентом.</p>
        </div>
      </Modal>

      {/* Custom Modal */}
      <Modal
        isOpen={customModal}
        onClose={() => setCustomModal(false)}
        closeOnBackdropClick={false}
        closeOnEscape={false}
        showCloseButton={false}
        title='Кастомное модальное окно'
      >
        <div>
          <p>Это модальное окно с отключенными стандартными способами закрытия:</p>
          <ul>
            <li>Нельзя закрыть кликом по фону</li>
            <li>Нельзя закрыть клавишей Escape</li>
            <li>Нет кнопки закрытия в заголовке</li>
          </ul>
          <p>Его можно закрыть только кнопкой ниже:</p>
          <Button variant='primary' onClick={() => setCustomModal(false)}>
            Закрыть модальное окно
          </Button>
        </div>
      </Modal>
    </div>
  );
};
