import React, { useState } from 'react';
import { Row, Button, Avatar, Switch, Badge, TextField, ToggleButton } from '@DobruniaUI';

export const RowDemo: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <h1>📋 Row Component</h1>
      <p>Компонент строки с тремя слотами: лево, центр, право</p>

      {/* Базовые примеры */}
      <section>
        <h2>🎯 Базовые примеры</h2>

        <div>
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

        <div>
          <h3>Только левый и правый слоты</h3>
          <Row
            left={<h3 style={{ margin: 0 }}>Заголовок раздела</h3>}
            right={<Badge value={5} />}
          />
        </div>

        <div>
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
      <section>
        <h2>🔗 Бесшовные списки</h2>

        <div>
          <h3>Список настроек</h3>
          <div>
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

        <div>
          <h3>Список пользователей</h3>
          <div>
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

      {/* Горизонтальное выравнивание в center */}
      <section>
        <h2>📐 Горизонтальное выравнивание в center</h2>

        <div>
          <h3>По левому краю (centerJustify="left")</h3>
          <Row
            left={<Avatar name='Тест' size='lg' />}
            center={
              <div>
                <div>Многострочный</div>
                <div>контент для</div>
                <div>демонстрации</div>
                <div>выравнивания</div>
              </div>
            }
            right={<Button>Действие</Button>}
            centerJustify='left'
            minHeight='100px'
          />
        </div>

        <div>
          <h3>По центру (centerJustify="center")</h3>
          <Row
            left={<Avatar name='Тест' size='lg' />}
            center={
              <div>
                <div>Многострочный</div>
                <div>контент для</div>
                <div>демонстрации</div>
                <div>выравнивания</div>
              </div>
            }
            right={<Button>Действие</Button>}
            centerJustify='center'
            minHeight='100px'
          />
        </div>

        <div>
          <h3>По правому краю (centerJustify="right")</h3>
          <Row
            left={<Avatar name='Тест' size='lg' />}
            center={
              <div>
                <div>Многострочный</div>
                <div>контент для</div>
                <div>демонстрации</div>
                <div>выравнивания</div>
              </div>
            }
            right={<Button>Действие</Button>}
            centerJustify='right'
            minHeight='100px'
          />
        </div>
      </section>

      {/* Интерактивные примеры */}
      <section>
        <h2>🎮 Интерактивные примеры</h2>

        <div>
          <h3>Меню навигации</h3>
          <div>
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

        <div>
          <h3>Список задач</h3>
          <div>
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
    </div>
  );
};
