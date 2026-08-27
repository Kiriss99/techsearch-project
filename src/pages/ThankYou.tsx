import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Icon from '@/components/ui/icon';

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Заявка принята — TechSearch"
        description="Спасибо за заявку. Мы получили её и ответим в течение рабочего дня."
        path="/thank-you"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden pb-20 pt-40 lg:pb-28 lg:pt-48">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
          <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="relative mx-auto max-w-[640px] px-5 text-center md:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-sm bg-primary text-primary-foreground animate-scale-in">
              <Icon name="Check" size={30} />
            </span>

            <h1 className="mt-8 font-heading text-[30px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[38px]">
              Заявка принята
            </h1>
            <p className="mt-5 text-[16px] leading-[1.6] text-muted-foreground">
              Мы получили вашу задачу и уже начали разбираться. Ответим в течение рабочего дня —
              на контакт, который вы оставили. Если нужно быстрее, напишите нам в Telegram.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              <a
                href="https://t.me/techsearchteam"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-3 bg-card px-6 py-5 font-heading text-[15px] font-medium transition-colors hover:bg-secondary"
              >
                <Icon name="Send" size={18} className="text-primary" />
                Написать в Telegram
              </a>
              <a
                href="/"
                className="group flex items-center justify-center gap-3 bg-card px-6 py-5 font-heading text-[15px] font-medium transition-colors hover:bg-secondary"
              >
                <Icon name="ArrowLeft" size={18} className="text-primary" />
                На главную
              </a>
            </div>

            <div className="mt-12 rounded-sm border border-border bg-card px-6 py-8">
              <Icon name="MessageSquare" size={22} className="mx-auto text-primary" />
              <h2 className="mt-4 font-heading text-[18px] font-semibold tracking-[-0.02em]">
                Пока ждёте ответ — почитайте реальные отзывы
              </h2>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">
                В канале @techssearch публикуем отзывы клиентов и разборы моделей без правок.
              </p>
              <a
                href="https://t.me/techssearch"
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-heading text-[14px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]"
              >
                Перейти в канал с отзывами
                <Icon
                  name="ArrowRight"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
