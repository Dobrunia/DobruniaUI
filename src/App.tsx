import { useEffect } from 'react';
import './styles/variables.pcss';
import Playground from './pages/Playground';
import './App.css';
function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);
  return <Playground />;
}

export default App;
