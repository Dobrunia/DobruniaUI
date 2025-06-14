import React, { useState } from 'react';
import { ToggleButton } from '@DobruniaUI';

export const ToggleButtonDemo: React.FC = () => {
  // Состояние для интерактивных примеров
  const [basicToggle, setBasicToggle] = useState(false);
  const [iconToggle, setIconToggle] = useState(true);
  const [smallToggle, setSmallToggle] = useState(false);
  const [largeToggle, setLargeToggle] = useState(true);

  // Состояние для групп переключателей
  const [features, setFeatures] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  const [selectedSize, setSelectedSize] = useState('medium');

  const handleFeatureToggle = (key: string) => (checked: boolean) => {
    setFeatures((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSizeChange = (checked: boolean, value?: string) => {
    if (checked && value) {
      setSelectedSize(value);
    }
  };

  return (
    <div className='demo-container'>
      <h1>ToggleButton Demo</h1>

      {/* Интерактивные примеры */}
      <section className='demo-section'>
        <h2>Интерактивные примеры</h2>
        <div className='demo-grid'>
          <div className='demo-item'>
            <h3>Основной стиль</h3>
            <ToggleButton checked={basicToggle} onChange={setBasicToggle}>
              Переключить
            </ToggleButton>
            <p className='demo-status'>Состояние: {basicToggle ? 'Включено' : 'Выключено'}</p>
          </div>

          <div className='demo-item'>
            <h3>С иконкой</h3>
            <ToggleButton showIcon checked={iconToggle} onChange={setIconToggle}>
              С огоньком
            </ToggleButton>
            <p className='demo-status'>Состояние: {iconToggle ? 'Включено' : 'Выключено'}</p>
          </div>

          <div className='demo-item'>
            <h3>Отключенная</h3>
            <ToggleButton disabled checked={false}>
              Заблокировано
            </ToggleButton>
            <p className='demo-status'>Не активна</p>
          </div>
        </div>
      </section>

      {/* Размеры */}
      <section className='demo-section'>
        <h2>Размеры</h2>
        <div className='demo-flex'>
          <ToggleButton size='small' checked={smallToggle} onChange={setSmallToggle}>
            Маленькая
          </ToggleButton>

          <ToggleButton checked={basicToggle} onChange={setBasicToggle}>
            Средняя
          </ToggleButton>

          <ToggleButton size='large' checked={largeToggle} onChange={setLargeToggle}>
            Большая
          </ToggleButton>
        </div>
      </section>

      {/* Группы переключателей */}
      <section className='demo-section'>
        <h2>Группы переключателей</h2>

        <div className='demo-item'>
          <h3>Настройки (множественный выбор)</h3>
          <div className='demo-flex'>
            <ToggleButton
              checked={features.notifications}
              onChange={handleFeatureToggle('notifications')}
            >
              Уведомления
            </ToggleButton>

            <ToggleButton checked={features.darkMode} onChange={handleFeatureToggle('darkMode')}>
              Тёмная тема
            </ToggleButton>

            <ToggleButton checked={features.autoSave} onChange={handleFeatureToggle('autoSave')}>
              Автосохранение
            </ToggleButton>
          </div>

          <div className='demo-output'>
            <strong>Активные настройки:</strong>
            <ul>
              {features.notifications && <li>Уведомления</li>}
              {features.darkMode && <li>Тёмная тема</li>}
              {features.autoSave && <li>Автосохранение</li>}
            </ul>
          </div>
        </div>

        <div className='demo-item'>
          <h3>Выбор размера (одиночный выбор)</h3>
          <div className='demo-flex'>
            <ToggleButton
              name='size'
              value='small'
              checked={selectedSize === 'small'}
              onChange={handleSizeChange}
              size='small'
            >
              Small
            </ToggleButton>

            <ToggleButton
              name='size'
              value='medium'
              checked={selectedSize === 'medium'}
              onChange={handleSizeChange}
            >
              Medium
            </ToggleButton>

            <ToggleButton
              name='size'
              value='large'
              checked={selectedSize === 'large'}
              onChange={handleSizeChange}
              size='large'
            >
              Large
            </ToggleButton>
          </div>

          <div className='demo-output'>
            <strong>Выбранный размер:</strong> {selectedSize}
          </div>
        </div>
      </section>

      <style>{`
        .demo-container {
          padding: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .demo-section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid var(--c-border);
          border-radius: 8px;
          background: var(--c-bg-subtle);
        }

        .demo-section h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: var(--c-text-primary);
          border-bottom: 2px solid var(--c-accent);
          padding-bottom: 8px;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .demo-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }

        .demo-item {
          padding: 15px;
          border: 1px solid var(--c-border);
          border-radius: 6px;
          background: var(--c-bg-elevated);
          margin-bottom: 15px;
        }

        .demo-item h3 {
          margin-top: 0;
          margin-bottom: 10px;
          color: var(--c-text-primary);
          font-size: 14px;
        }

        .demo-status {
          margin-top: 8px;
          font-size: 12px;
          color: var(--c-text-secondary);
          font-weight: 500;
        }

        .demo-output {
          padding: 10px;
          background: var(--c-bg-default);
          border: 1px solid var(--c-border);
          border-radius: 4px;
          font-size: 12px;
          color: var(--c-text-secondary);
          margin-top: 10px;
        }

        .demo-output strong {
          color: var(--c-text-primary);
        }

        .demo-output ul {
          margin: 5px 0 0 0;
          padding-left: 15px;
        }

        .demo-output li {
          margin: 2px 0;
        }
      `}</style>
    </div>
  );
};
