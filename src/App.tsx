import Playground from './pages/Playground';
import './App.css';
import { initThemeSystem } from '@DobruniaUI';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Инициализируем систему тем при монтировании приложения
    initThemeSystem();
  }, []);
  return (
    <div style={{ height: '100vh' }}>
      <Playground />
    </div>
  );
}
