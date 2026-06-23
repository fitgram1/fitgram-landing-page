import { I18nProvider } from '@/i18n';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Testimonials } from '@/components/sections/Testimonials';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { Footer } from '@/components/sections/Footer';

export default function App() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Solution />
        <Testimonials />
        <WaitlistForm />
      </main>
      <Footer />
    </I18nProvider>
  );
}
