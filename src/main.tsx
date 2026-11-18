import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Recarregar a página abre sempre no início (o hero): tira a #âncora antes de o browser saltar para ela.
const nav = performance.getEntriesByType('navigation')[0];
if (nav instanceof PerformanceNavigationTiming && nav.type === 'reload' && window.location.hash) {
  window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
