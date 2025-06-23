import Playground from './pages/Playground';
import './App.css';
import { useEffect } from 'react';
import { initThemeSystem } from './utils/theme';

function App() {
  useEffect(() => {
    initThemeSystem();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Playground />
    </div>
  );
}

export default App;
