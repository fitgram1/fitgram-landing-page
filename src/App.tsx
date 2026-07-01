import { I18nProvider } from '@/i18n';
import { ThemeProvider } from '@/theme';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Showcase } from '@/components/sections/Showcase';
import { Offer } from '@/components/sections/Offer';
import { Faq } from '@/components/sections/Faq';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { Footer } from '@/components/sections/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Problem />
          <Solution />
          <Showcase />
          <Offer />
          <Faq />
          <WaitlistForm />
        </main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  );
}
