import React, { useState } from 'react';
import { Button, Snackbar, UndoSnackbar } from '@DobruniaUI';

export const UndoSnackbarDemo: React.FC = () => {
  const [fileDeleteSnackbar, setFileDeleteSnackbar] = useState(false);
  const [itemsDeleteSnackbar, setItemsDeleteSnackbar] = useState(false);
  const [archiveSnackbar, setArchiveSnackbar] = useState(false);
  const [moveSnackbar, setMoveSnackbar] = useState(false);
  const [customSnackbar, setCustomSnackbar] = useState(false);

  // Обычные snackbar'ы для демонстрации работы с разными позициями
  const [topRightSnackbar, setTopRightSnackbar] = useState(false);
  const [bottomCenterSnackbar, setBottomCenterSnackbar] = useState(false);
  const [topLeftSnackbar, setTopLeftSnackbar] = useState(false);
  const [bottomLeftSnackbar, setBottomLeftSnackbar] = useState(false);

  // Состояния для демонстрации undo функциональности
  const [deletedFile, setDeletedFile] = useState<string | null>(null);
  const [deletedItems, setDeletedItems] = useState<string[]>([]);
  const [archivedProject, setArchivedProject] = useState<string | null>(null);
  const [movedItems, setMovedItems] = useState<string[]>([]);
  const [customAction, setCustomAction] = useState<string | null>(null);

  const handleDeleteFile = () => {
    setDeletedFile('document.pdf');
    setFileDeleteSnackbar(true);
  };

  const handleUndoFileDelete = () => {
    console.log(`Восстановлен файл: ${deletedFile}`);
    setDeletedFile(null);
  };

  const handleDeleteItems = () => {
    const items = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
    setDeletedItems(items);
    setItemsDeleteSnackbar(true);
  };

  const handleUndoItemsDelete = () => {
    console.log(`Восстановлены элементы:`, deletedItems);
    setDeletedItems([]);
  };

  const handleArchiveProject = () => {
    setArchivedProject('Проект 2024');
    setArchiveSnackbar(true);
  };

  const handleUndoArchive = () => {
    console.log(`Проект "${archivedProject}" извлечен из архива`);
    setArchivedProject(null);
  };

  const handleMoveToTrash = () => {
    const items = ['файл1.doc', 'файл2.doc'];
    setMovedItems(items);
    setMoveSnackbar(true);
  };

  const handleUndoMove = () => {
    console.log(`Элементы возвращены из корзины:`, movedItems);
    setMovedItems([]);
  };

  const handleCustomAction = () => {
    setCustomAction('Настройки сброшены');
    setCustomSnackbar(true);
  };

  const handleUndoCustom = () => {
    console.log('Настройки восстановлены');
    setCustomAction(null);
  };

  // Функция для показа всех UndoSnackbar'ов сразу (тест стекинга)
  const showAllUndoSnackbars = () => {
    setDeletedFile('test.pdf');
    setDeletedItems(['img1.jpg', 'img2.jpg']);
    setArchivedProject('Test Project');
    setMovedItems(['doc1.txt', 'doc2.txt']);
    setCustomAction('Test Action');

    setFileDeleteSnackbar(true);
    setTimeout(() => setItemsDeleteSnackbar(true), 500);
    setTimeout(() => setArchiveSnackbar(true), 1000);
    setTimeout(() => setMoveSnackbar(true), 1500);
    setTimeout(() => setCustomSnackbar(true), 2000);
  };

  // Функция для показа обычных snackbar'ов в разных позициях
  const showPositionSnackbars = () => {
    setTopRightSnackbar(true);
    setTimeout(() => setBottomCenterSnackbar(true), 500);
    setTimeout(() => setTopLeftSnackbar(true), 1000);
    setTimeout(() => setBottomLeftSnackbar(true), 1500);
  };

  const hideAllSnackbars = () => {
    // UndoSnackbar'ы
    setFileDeleteSnackbar(false);
    setItemsDeleteSnackbar(false);
    setArchiveSnackbar(false);
    setMoveSnackbar(false);
    setCustomSnackbar(false);

    // Обычные snackbar'ы
    setTopRightSnackbar(false);
    setBottomCenterSnackbar(false);
    setTopLeftSnackbar(false);
    setBottomLeftSnackbar(false);
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'var(--font-family)' }}>
      <h1 style={{ color: 'var(--c-text-primary)', marginBottom: '24px' }}>
        Snackbar Demo (стекинг встроен в базовый компонент)
      </h1>

      <div
        style={{
          display: 'grid',
          gap: '24px',
          maxWidth: '800px',
        }}
      >
        {/* Тест стекинга UndoSnackbar'ов */}
        <div
          style={{
            padding: '24px',
            border: '2px solid var(--c-accent)',
            borderRadius: 'var(--radius-medium)',
            backgroundColor: 'var(--c-bg-default)',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '16px' }}>
            🧪 Тест стекинга UndoSnackbar'ов (справа сверху)
          </h3>
          <p style={{ color: 'var(--c-text-primary)', marginBottom: '16px' }}>
            UndoSnackbar'ы используют <code>enableStacking=true</code> и позицию{' '}
            <code>top-right</code>.
            <br />
            <strong>Главное:</strong> Когда вы закрываете один из snackbar'ов в середине стека,
            остальные автоматически "подтягиваются" вверх!
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button onClick={showAllUndoSnackbars}>Показать все UndoSnackbar'ы</Button>
            <Button variant='secondary' onClick={hideAllSnackbars}>
              Скрыть все
            </Button>
          </div>
        </div>

        {/* Тест стекинга в разных позициях */}
        <div
          style={{
            padding: '24px',
            border: '2px solid var(--c-accent)',
            borderRadius: 'var(--radius-medium)',
            backgroundColor: 'var(--c-bg-default)',
          }}
        >
          <h3 style={{ color: 'var(--c-text-primary)', marginBottom: '16px' }}>
            🎯 Тест стекинга по позициям
          </h3>
          <p style={{ color: 'var(--c-text-primary)', marginBottom: '16px' }}>
            Обычные Snackbar'ы с <code>enableStacking=true</code> в разных углах экрана.
            <br />
            Каждая позиция имеет свой независимый стек!
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button onClick={showPositionSnackbars} variant='primary'>
              Показать во всех углах
            </Button>
            <Button variant='secondary' onClick={hideAllSnackbars}>
              Скрыть все
            </Button>
          </div>
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: 'var(--c-bg-subtle)',
              borderRadius: 'var(--radius-small)',
              fontSize: 'var(--font-size-small)',
              color: 'var(--c-text-secondary)',
            }}
          >
            💡 <strong>Позиции:</strong> Справа сверху, Снизу по центру, Слева сверху, Слева снизу
          </div>
        </div>

        {/* Быстрые тесты */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <Button onClick={handleDeleteFile} variant='secondary'>
            1️⃣ Удалить файл
          </Button>
          <Button onClick={handleDeleteItems} variant='secondary'>
            2️⃣ Удалить фото
          </Button>
          <Button onClick={handleArchiveProject} variant='secondary'>
            3️⃣ Архивировать
          </Button>
          <Button onClick={handleMoveToTrash} variant='secondary'>
            4️⃣ В корзину
          </Button>
          <Button onClick={handleCustomAction} variant='secondary'>
            5️⃣ Сбросить настройки
          </Button>
        </div>

        {/* Подробные примеры */}
        <details
          style={{
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-medium)',
            padding: '16px',
          }}
        >
          <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '16px' }}>
            Подробные примеры использования
          </summary>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-small)',
              }}
            >
              <h4 style={{ color: 'var(--c-text-primary)', marginBottom: '8px' }}>
                Новая архитектура
              </h4>
              <p
                style={{
                  color: 'var(--c-text-primary)',
                  marginBottom: '12px',
                  fontSize: 'var(--font-size-small)',
                }}
              >
                Стекинг теперь встроен в базовый Snackbar через пропс <code>enableStacking</code>.
                UndoSnackbar использует эту функциональность автоматически.
              </p>
            </div>

            <div
              style={{
                padding: '16px',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-small)',
              }}
            >
              <h4 style={{ color: 'var(--c-text-primary)', marginBottom: '8px' }}>
                Группировка по позициям
              </h4>
              <p
                style={{
                  color: 'var(--c-text-primary)',
                  marginBottom: '12px',
                  fontSize: 'var(--font-size-small)',
                }}
              >
                Snackbar'ы группируются по позиции (top-right, bottom-center, etc.). Каждая группа
                имеет независимый стек.
              </p>
            </div>
          </div>
        </details>
      </div>

      {/* UndoSnackbar компоненты */}
      <UndoSnackbar
        open={fileDeleteSnackbar}
        message={`Файл "${deletedFile}" удален`}
        onClose={() => setFileDeleteSnackbar(false)}
        onUndo={handleUndoFileDelete}
      />

      <UndoSnackbar
        open={itemsDeleteSnackbar}
        message={`${deletedItems.length} фотографии удалены`}
        onClose={() => setItemsDeleteSnackbar(false)}
        onUndo={handleUndoItemsDelete}
        undoText='Восстановить'
      />

      <UndoSnackbar
        open={archiveSnackbar}
        message={`Проект "${archivedProject}" архивирован`}
        onClose={() => setArchiveSnackbar(false)}
        onUndo={handleUndoArchive}
        undoText='Извлечь'
      />

      <UndoSnackbar
        open={moveSnackbar}
        message={`${movedItems.length} файла перемещены в корзину`}
        onClose={() => setMoveSnackbar(false)}
        onUndo={handleUndoMove}
        autoHideDuration={8000}
        undoText='Вернуть'
      />

      <UndoSnackbar
        open={customSnackbar}
        message={customAction}
        onClose={() => setCustomSnackbar(false)}
        onUndo={handleUndoCustom}
        autoHideDuration={0}
        undoText='Восстановить'
      />

      {/* Обычные Snackbar компоненты для демонстрации стекинга в разных позициях */}
      <Snackbar
        open={topRightSnackbar}
        message='Уведомление справа сверху'
        onClose={() => setTopRightSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        enableStacking={true}
        action={<Button variant='ghost'>Действие</Button>}
      />

      <Snackbar
        open={bottomCenterSnackbar}
        message='Уведомление снизу по центру'
        onClose={() => setBottomCenterSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        enableStacking={true}
      />

      <Snackbar
        open={topLeftSnackbar}
        message='Уведомление слева сверху'
        onClose={() => setTopLeftSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        enableStacking={true}
      />

      <Snackbar
        open={bottomLeftSnackbar}
        message='Уведомление слева снизу'
        onClose={() => setBottomLeftSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        enableStacking={true}
      />
    </div>
  );
};
