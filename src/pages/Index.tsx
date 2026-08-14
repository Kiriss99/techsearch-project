import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Criteria from '@/components/Criteria';
import Categories from '@/components/Categories';
import Expertise from '@/components/Expertise';
import Quiz from '@/components/Quiz';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Process />
        <Criteria />
        <Categories />
        <Expertise />
        <Quiz />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;