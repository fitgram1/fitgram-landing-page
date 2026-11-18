import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '@/i18n';
import { ThemeProvider } from '@/theme';
import { SiteLayout } from '@/components/SiteLayout';
import { HomePage } from '@/pages/HomePage';
import { FaqPage } from '@/pages/FaqPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { routes } from '@/lib/links';

// Em produção a app vive em /fitgram-landing-page/ (GitHub Pages); em desenvolvimento, na raiz.
const basename = (import.meta.env.BASE_URL as string).replace(/\/$/, '');

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              {/* Os preços vivem numa secção da página inicial: /precos leva até lá. */}
              <Route path={routes.legacyPricing} element={<Navigate to="/#precos" replace />} />
              <Route path={routes.faq} element={<FaqPage />} />
              {/* A candidatura à beta acabou: links antigos vão para a página inicial. */}
              <Route path={routes.legacyWaitlist} element={<Navigate to={routes.home} replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}
