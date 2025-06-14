import React, { useState } from 'react';
import { Card, Button, Avatar, Badge, Switch, ToggleButton } from '@DobruniaUI';

export const CardDemo: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className='card-demo'>
      <h1>🃏 Card Component</h1>
      <p>Компонент карточки для отображения контента в структурированном виде</p>

      {/* Варианты отображения */}
      <section className='section'>
        <h2>🎨 Варианты отображения</h2>

        <div className='cards-grid'>
          <Card title='Default' subtitle='Стандартная карточка'>
            Обычная карточка с границей и фоном. Подходит для большинства случаев использования.
          </Card>

          <Card title='Outlined' subtitle='Контурная карточка' variant='outlined'>
            Карточка с толстой границей без тени. Хорошо подходит для акцентирования внимания.
          </Card>

          <Card title='Elevated' subtitle='Приподнятая карточка' variant='elevated'>
            Карточка с тенью, создающая эффект приподнятости над поверхностью.
          </Card>

          <Card title='Flat' subtitle='Плоская карточка' variant='flat'>
            Минималистичная карточка без границ и теней. Идеальна для чистого дизайна.
          </Card>
        </div>
      </section>

      {/* Интерактивные карточки */}
      <section className='section'>
        <h2>⚡ Интерактивные карточки</h2>

        <div className='cards-grid'>
          <Card
            title='Кликабельная карточка'
            subtitle='Нажмите для взаимодействия'
            clickable
            onClick={() => alert('Карточка нажата!')}
          >
            Эта карточка реагирует на клики и имеет мягкие hover эффекты
          </Card>

          <Card
            title='Отключенная карточка'
            subtitle='Недоступна для взаимодействия'
            clickable
            disabled
            onClick={() => alert('Не должно сработать')}
          >
            Эта карточка отключена и не реагирует на действия
          </Card>

          <Card
            title='Лайк пост'
            subtitle='Интерактивный контент'
            footer={
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <ToggleButton checked={liked} onChange={setLiked} showIcon>
                  {liked ? 'Нравится' : 'Лайк'}
                </ToggleButton>
                <Button variant='ghost' size='small'>
                  Поделиться
                </Button>
              </div>
            }
          >
            Пример карточки с интерактивными элементами в футере
          </Card>
        </div>
      </section>

      {/* Карточки с контентом */}
      <section className='section'>
        <h2>📋 Карточки с контентом</h2>

        <div className='cards-grid'>
          <Card
            title='Профиль пользователя'
            footer={
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant='primary' size='small'>
                  Подписаться
                </Button>
                <Button variant='ghost' size='small'>
                  Сообщение
                </Button>
              </div>
            }
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}
            >
              <Avatar name='Анна Смирнова' size='lg' />
              <div>
                <div style={{ fontWeight: 500 }}>Анна Смирнова</div>
                <div style={{ fontSize: '14px', color: 'var(--c-text-secondary)' }}>
                  Frontend Developer
                </div>
              </div>
            </div>
            <p>Разработчик интерфейсов с 5-летним опытом. Специализируюсь на React и TypeScript.</p>
          </Card>

          <Card title='Настройки' subtitle='Персонализация приложения'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>Уведомления</span>
                <Switch checked={notifications} onChange={setNotifications} />
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>Тёмная тема</span>
                <Switch checked={darkMode} onChange={setDarkMode} />
              </div>
            </div>
          </Card>

          <Card title='Статистика' subtitle='Данные за последний месяц' variant='elevated'>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--c-accent)' }}>
                  1,234
                </div>
                <div style={{ fontSize: '14px', color: 'var(--c-text-secondary)' }}>Просмотры</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--c-success)' }}>
                  89
                </div>
                <div style={{ fontSize: '14px', color: 'var(--c-text-secondary)' }}>Лайки</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Карточки с изображениями */}
      <section className='section'>
        <h2>🖼️ Карточки с изображениями</h2>

        <div className='cards-grid'>
          <Card variant='elevated' className='no-padding'>
            <div
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent-hover))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                margin: '-16px -16px 16px -16px',
              }}
            >
              🖼️ Изображение
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0' }}>Красивый пейзаж</h3>
              <p style={{ margin: 0, color: 'var(--c-text-secondary)' }}>
                Потрясающий вид на горы и озеро
              </p>
            </div>
          </Card>

          <Card
            title='Товар'
            subtitle='Новинка в каталоге'
            variant='outlined'
            footer={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--c-accent)' }}>
                  2,999₽
                </span>
                <Button variant='primary' size='small'>
                  В корзину
                </Button>
              </div>
            }
          >
            <div
              style={{
                height: '120px',
                background: 'var(--c-bg-elevated)',
                borderRadius: 'var(--radius-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                fontSize: '32px',
              }}
            >
              📱
            </div>
            <p>Современный смартфон с отличными характеристиками</p>
          </Card>

          <Card
            title='Уведомление'
            subtitle='2 минуты назад'
            clickable
            onClick={() => alert('Открыть уведомление')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--c-info)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                📧
              </div>
              <div>
                <div style={{ fontWeight: 500 }}>Новое сообщение</div>
                <div style={{ fontSize: '14px', color: 'var(--c-text-secondary)' }}>
                  У вас есть непрочитанное сообщение
                </div>
              </div>
              <Badge value='1' />
            </div>
          </Card>
        </div>
      </section>

      {/* Размеры карточек */}
      <section className='section'>
        <h2>📐 Размеры карточек</h2>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Card title='Фиксированная ширина' width='300px' variant='outlined'>
            Эта карточка имеет фиксированную ширину 300px
          </Card>

          <Card title='Максимальная ширина' width='100%' maxWidth='400px' variant='elevated'>
            Эта карточка растягивается на всю ширину, но не больше 400px
          </Card>
        </div>
      </section>

      {/* Кастомизация через классы */}
      <section className='section'>
        <h2>🎨 Кастомизация через классы</h2>

        <div className='cards-grid'>
          <Card title='Без отступов' className='no-padding'>
            <div style={{ padding: '20px', background: 'var(--c-bg-elevated)', margin: '-16px' }}>
              Карточка без отступов с кастомным контентом
            </div>
          </Card>

          <Card title='Большие отступы' className='large-padding'>
            Карточка с увеличенными отступами для просторного контента
          </Card>

          <Card title='Кастомный стиль' className='custom-card'>
            Карточка с кастомными стилями через CSS класс
          </Card>
        </div>
      </section>

      <style>{`
        .card-demo {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section {
          margin-bottom: 40px;
        }

        .section h2 {
          margin-bottom: 20px;
          color: var(--c-text-primary);
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        /* Кастомные классы для карточек */
        .no-padding {
          padding: 0 !important;
        }

        .large-padding {
          padding: 24px !important;
        }

        .custom-card {
          background: linear-gradient(135deg, var(--c-accent-subtle), var(--c-bg-subtle)) !important;
          border: 2px solid var(--c-accent) !important;
        }

        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
