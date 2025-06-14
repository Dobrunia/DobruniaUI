import React, { useState } from 'react';
import { Row, Button, Avatar, Switch, Badge, TextField, ToggleButton } from '@DobruniaUI';

export const RowDemo: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='row-demo'>
      <h1>📋 Row Component</h1>
      <p>Компонент строки с тремя слотами: лево, центр, право</p>

      {/* Базовые примеры */}
      <section className='section'>
        <h2>🎯 Базовые примеры</h2>

        <div className='demo-group'>
          <h3>Профиль пользователя</h3>
          <Row
            left={<Avatar name='Иван Петров' size='md' />}
            center={
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>Иван Петров</div>
                <div style={{ fontSize: '14px', color: 'var(--c-text-secondary)' }}>
                  ivan@example.com
                </div>
              </div>
            }
            right={
              <Button variant='primary' size='small'>
                Подписаться
              </Button>
            }
          />
        </div>

        <div className='demo-group'>
          <h3>Только левый и правый слоты</h3>
          <Row
            left={<h3 style={{ margin: 0 }}>Заголовок раздела</h3>}
            right={<Badge value={5} />}
          />
        </div>

        <div className='demo-group'>
          <h3>Только центральный слот</h3>
          <Row
            center={
              <TextField
                label='Поиск по сайту...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            }
          />
        </div>
      </section>

      {/* Бесшовные списки */}
      <section className='section'>
        <h2>🔗 Бесшовные списки</h2>

        <div className='demo-group'>
          <h3>Список настроек</h3>
          <div className='seamless-rows'>
            <Row
              left={<span>🔔</span>}
              center={<span>Уведомления</span>}
              right={<Switch checked={notifications} onChange={setNotifications} />}
              onClick={() => setNotifications(!notifications)}
            />
            <Row
              left={<span>🌙</span>}
              center={<span>Тёмная тема</span>}
              right={<Switch checked={darkMode} onChange={setDarkMode} />}
              onClick={() => setDarkMode(!darkMode)}
            />
            <Row
              left={<span>💾</span>}
              center={<span>Автосохранение</span>}
              right={<Switch checked={autoSave} onChange={setAutoSave} />}
              onClick={() => setAutoSave(!autoSave)}
            />
            <Row
              left={<span>🔒</span>}
              center={<span>Приватность</span>}
              right={<span style={{ color: 'var(--c-text-secondary)' }}>→</span>}
              onClick={() => alert('Переход в настройки приватности')}
            />
          </div>
        </div>

        <div className='demo-group'>
          <h3>Список пользователей</h3>
          <div className='seamless-rows'>
            <Row
              left={<Avatar name='Анна Смирнова' size='sm' />}
              center={
                <div style={{ textAlign: 'left', width: '100%' }}>
                  <div style={{ fontWeight: 500 }}>Анна Смирнова</div>
                  <div style={{ fontSize: '12px', color: 'var(--c-text-secondary)' }}>Онлайн</div>
                </div>
              }
              right={
                <Button variant='ghost' size='small'>
                  Написать
                </Button>
              }
            />
            <Row
              left={<Avatar name='Петр Иванов' size='sm' />}
              center={
                <div style={{ textAlign: 'left', width: '100%' }}>
                  <div style={{ fontWeight: 500 }}>Петр Иванов</div>
                  <div style={{ fontSize: '12px', color: 'var(--c-text-secondary)' }}>
                    5 мин назад
                  </div>
                </div>
              }
              right={
                <Button variant='ghost' size='small'>
                  Написать
                </Button>
              }
            />
            <Row
              left={<Avatar name='Мария Козлова' size='sm' />}
              center={
                <div style={{ textAlign: 'left', width: '100%' }}>
                  <div style={{ fontWeight: 500 }}>Мария Козлова</div>
                  <div style={{ fontSize: '12px', color: 'var(--c-text-secondary)' }}>Вчера</div>
                </div>
              }
              right={
                <Button variant='ghost' size='small'>
                  Написать
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Выравнивание */}
      <section className='section'>
        <h2>📐 Выравнивание</h2>

        <div className='demo-group'>
          <h3>По верху (align="start")</h3>
          <Row
            left={<Avatar name='Тест' size='lg' />}
            center={
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div>Многострочный</div>
                <div>контент для</div>
                <div>демонстрации</div>
                <div>выравнивания</div>
              </div>
            }
            right={<Button>Действие</Button>}
            align='start'
            minHeight='100px'
          />
        </div>

        <div className='demo-group'>
          <h3>По центру (align="center")</h3>
          <Row
            left={<Avatar name='Тест' size='lg' />}
            center={
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div>Многострочный</div>
                <div>контент для</div>
                <div>демонстрации</div>
                <div>выравнивания</div>
              </div>
            }
            right={<Button>Действие</Button>}
            align='center'
            minHeight='100px'
          />
        </div>

        <div className='demo-group'>
          <h3>По низу (align="end")</h3>
          <Row
            left={<Avatar name='Тест' size='lg' />}
            center={
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div>Многострочный</div>
                <div>контент для</div>
                <div>демонстрации</div>
                <div>выравнивания</div>
              </div>
            }
            right={<Button>Действие</Button>}
            align='end'
            minHeight='100px'
          />
        </div>
      </section>

      {/* Интерактивные примеры */}
      <section className='section'>
        <h2>🎮 Интерактивные примеры</h2>

        <div className='demo-group'>
          <h3>Меню навигации</h3>
          <div className='seamless-rows'>
            <Row
              left={<span>🏠</span>}
              center={<span>Главная</span>}
              right={<span style={{ color: 'var(--c-text-secondary)' }}>→</span>}
              onClick={() => alert('Переход на главную')}
            />
            <Row
              left={<span>📊</span>}
              center={<span>Аналитика</span>}
              right={<Badge value='NEW' />}
              onClick={() => alert('Переход в аналитику')}
            />
            <Row
              left={<span>⚙️</span>}
              center={<span>Настройки</span>}
              right={<span style={{ color: 'var(--c-text-secondary)' }}>→</span>}
              onClick={() => alert('Переход в настройки')}
            />
            <Row
              left={<span>❓</span>}
              center={<span>Помощь</span>}
              right={<span style={{ color: 'var(--c-text-secondary)' }}>→</span>}
              onClick={() => alert('Переход в помощь')}
            />
          </div>
        </div>

        <div className='demo-group'>
          <h3>Список задач</h3>
          <div className='seamless-rows'>
            <Row
              left={
                <ToggleButton size='small' checked={true}>
                  ✓
                </ToggleButton>
              }
              center={
                <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>
                  Завершить проект
                </span>
              }
              right={
                <span style={{ fontSize: '12px', color: 'var(--c-text-secondary)' }}>Вчера</span>
              }
            />
            <Row
              left={
                <ToggleButton size='small' checked={false}>
                  ○
                </ToggleButton>
              }
              center={<span>Написать документацию</span>}
              right={<span style={{ fontSize: '12px', color: 'var(--c-warning)' }}>Сегодня</span>}
            />
            <Row
              left={
                <ToggleButton size='small' checked={false}>
                  ○
                </ToggleButton>
              }
              center={<span>Провести код-ревью</span>}
              right={
                <span style={{ fontSize: '12px', color: 'var(--c-text-secondary)' }}>Завтра</span>
              }
            />
          </div>
        </div>
      </section>

      <style>{`
        .row-demo {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .section {
          margin-bottom: 40px;
        }

        .section h2 {
          margin-bottom: 20px;
          color: var(--c-text-primary);
        }

        .demo-group {
          margin-bottom: 30px;
        }

        .demo-group h3 {
          margin-bottom: 12px;
          color: var(--c-text-primary);
          font-size: 16px;
        }

        .seamless-rows {
          border: 1px solid var(--c-border);
          border-radius: var(--radius-medium);
          overflow: hidden;
          background: var(--c-bg-subtle);
        }

        .seamless-rows > * {
          border-bottom: 1px solid var(--c-border);
        }

        .seamless-rows > *:last-child {
          border-bottom: none;
        }

        .seamless-rows > * > div {
          border-radius: 0 !important;
        }
      `}</style>
    </div>
  );
};
