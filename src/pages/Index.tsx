import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Criteria from '@/components/Criteria';
import Categories from '@/components/Categories';
import CategoryFaq from '@/components/CategoryFaq';
import Expertise from '@/components/Expertise';
import Quiz from '@/components/Quiz';
import Pricing from '@/components/Pricing';
import Terms from '@/components/Terms';
import Reviews from '@/components/Reviews';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="TechSearch — независимый подбор техники под задачу и бюджет"
        description="Подбираем технику для дома и офиса: сравниваем модели, цены, отзывы и продавцов. Без процента с продаж и привязки к магазину."
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Process />
        <Criteria />
        <Categories />
        <CategoryFaq />
        <Expertise />
        <Quiz />
        <Pricing />
        <Terms />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;