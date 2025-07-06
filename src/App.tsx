import Playground from './pages/Playground';
import './App.css';
import { initThemeSystem } from '@DobruniaUI';

/* ••• вызов сразу при загрузке модуля (только в браузере) ••• */
if (typeof window !== 'undefined') initThemeSystem();

export default function App() {
  return (
    <div style={{ height: '100vh' }}>
      <Playground />
    </div>
  );
}
