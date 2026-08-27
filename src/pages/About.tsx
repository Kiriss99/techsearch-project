import { useEffect } from 'react';
import Seo from '@/components/Seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cases from '@/components/Cases';
import SectionHeading from '@/components/SectionHeading';
import Icon from '@/components/ui/icon';

const FACTS = [
  { icon: 'Store', value: '8 лет', label: 'в рознице крупной бытовой техники' },
  { icon: 'ClipboardCheck', value: '400+', label: 'подборов для дома, офиса и аренды' },
  { icon: 'HandCoins', value: '0 ₽', label: 'комиссии от магазинов и маркетплейсов' },
  { icon: 'Timer', value: '1–2 дня', label: 'средний срок работы над подбором' },
];

const PRINCIPLES = [
  {
    icon: 'ShieldOff',
    title: 'Не берём деньги у магазинов',
    text: 'У нас нет партнёрских программ, реферальных ссылок и процентов с продаж. Единственный, кто нам платит, — вы. Поэтому нам незачем вести вас в конкретный магазин или к конкретному бренду.',
  },
  {
    icon: 'Eye',
    title: 'Показываем логику, а не вердикт',
    text: 'Мы не говорим «берите вот это». По каждой модели объясняем, за что вы платите, что получаете и от чего отказываетесь. Финальное решение всегда остаётся за вами — но уже осознанное.',
  },
  {
    icon: 'Scissors',
    title: 'Отсекаем то, за что вы переплатите',
    text: 'Половина функций в описании техники не используется никогда. Мы считаем, что из этого нужно именно вам, а за что не стоит отдавать деньги — и часто финальный вариант оказывается дешевле, чем человек планировал.',
  },
  {
    icon: 'MessageSquareWarning',
    title: 'Говорим честно, даже если это невыгодно',
    text: 'Если ваша текущая техника ещё послужит или подбор в вашем случае не нужен — скажем прямо и не возьмём оплату. Если категория не наша — тоже скажем, вместо того чтобы браться наугад.',
  },
];

const DECISIONS = [
  {
    step: '01',
    title: 'Начинаем с условий, а не с моделей',
    text: 'Где будет стоять техника, кто ей пользуется, как часто и в каком режиме. Габариты, проём, подключение, шум за стеной. Без этого любой список моделей — угадывание.',
  },
  {
    step: '02',
    title: 'Отделяем характеристики от маркетинга',
    text: 'Сверяем заявленное в описании с независимыми тестами и отзывами владельцев за 2–3 года. Красивые названия режимов расшифровываем: что это на самом деле и нужно ли оно вам.',
  },
  {
    step: '03',
    title: 'Проверяем не только модель, но и продавца',
    text: 'Итоговая цена с доставкой и подъёмом, срок, гарантия, наличие сервиса в вашем городе и что будет при возврате. Хорошая модель у плохого продавца — плохая покупка.',
  },
  {
    step: '04',
    title: 'Оставляем 3 варианта с аргументами',
    text: 'Не 20 позиций, в которых снова придётся разбираться. Три варианта: оптимальный, подешевле и с запасом — с объяснением, чем они отличаются, и ссылками, где выгоднее купить.',
  },
];

const About = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="О нас — TechSearch"
        description="8 лет опыта в рознице техники, 400+ подборов и независимость от магазинов. Как мы работаем, принимаем решения и что показываем на примерах реальных подборов."
        path="/about"
      />
      <Header />
      <main>
        <section id="top" className="relative overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
          <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={14} />
              На главную
            </a>

            <div className="mt-8 max-w-3xl">
              <div className="eyebrow mb-6">О нас</div>
              <h1 className="font-heading text-[32px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[42px] lg:text-[54px]">
                Мы не продаём технику. Мы помогаем в ней разобраться
              </h1>
              <p className="mt-6 text-[17px] leading-[1.6] text-muted-foreground">
                TechSearch — независимый сервис подбора техники. Мы не связаны ни с одним магазином
                и не получаем процент с продаж, поэтому можем спокойно сказать: «эта модель
                переоценена», «здесь вы переплатите за бренд» или «вам вообще не нужен подбор».
              </p>
            </div>

            <dl className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {FACTS.map((f) => (
                <div key={f.label} className="bg-card px-6 py-7">
                  <Icon name={f.icon} size={18} className="text-primary" />
                  <dt className="mt-4 font-heading text-[26px] font-bold tracking-[-0.03em] text-foreground">
                    {f.value}
                  </dt>
                  <dd className="mt-2 text-[13px] leading-snug text-muted-foreground">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-16">
              <div className="relative self-start">
                <div className="absolute -left-3 -top-3 h-full w-full rounded-sm border border-border" />
                <img
                  src="https://cdn.poehali.dev/projects/a2565413-a631-4ca3-9bf5-edcf50d8f947/files/0699d94c-4705-484d-99c7-13564c47349b.jpg"
                  alt="Рабочее место специалиста TechSearch: сравнение моделей и цен"
                  loading="lazy"
                  className="relative w-full rounded-sm border border-border object-cover"
                />
              </div>

              <div>
                <div className="eyebrow mb-6">Наш опыт</div>
                <h2 className="font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[32px]">
                  Восемь лет по ту сторону прилавка
                </h2>
                <div className="mt-6 space-y-5 text-[16px] leading-[1.7] text-muted-foreground">
                  <p>
                    Основатель TechSearch — Анна Ковалёва. Восемь лет она продавала крупную бытовую
                    технику: сначала в торговом зале, потом руководила отделом. И каждый день видела
                    одно и то же: человек приходит с реальной задачей, а уходит с моделью, которая
                    выгоднее магазину.
                  </p>
                  <p>
                    Дело даже не в злом умысле продавцов — у них план, акции и приоритетные бренды.
                    Просто интересы магазина и покупателя совпадают далеко не всегда. А разобраться
                    самому сложно: характеристики написаны так, чтобы впечатлять, а отзывы
                    противоречат друг другу.
                  </p>
                  <p>
                    Так появился TechSearch. Мы делаем ровно то, что делал бы хороший знакомый,
                    который разбирается в технике: слушаем задачу, честно сравниваем варианты
                    и называем те, которые действительно подходят — без оглядки на то, кому это
                    выгодно.
                  </p>
                </div>

                <blockquote className="mt-9 border-l-2 border-primary bg-secondary/50 px-6 py-5">
                  <p className="font-heading text-[17px] font-medium leading-[1.5] text-foreground">
                    «Я 8 лет продавала крупную бытовую технику и видела, как легко покупателю
                    навязать лишние функции. Сейчас я делаю наоборот: отсекаю шум, считаю реальную
                    пользу и оставляю только то, что подходит под задачу».
                  </p>
                  <footer className="mt-4 text-[14px] text-muted-foreground">
                    Анна Ковалёва — основатель TechSearch
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <SectionHeading
              eyebrow="Принципы"
              title="Почему мы работаем без комиссии от магазинов"
              description="Независимость — это не лозунг, а условие, при котором совет вообще имеет смысл."
            />

            <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <article key={p.title} className="bg-card px-6 py-8 lg:px-8 lg:py-10">
                  <div className="flex items-center gap-3">
                    <Icon name={p.icon} size={20} className="text-primary" />
                    <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.65] text-muted-foreground">{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute -right-40 top-10 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <SectionHeading
              eyebrow="Как принимаем решения"
              title="Что происходит между вашей задачей и финальным списком"
            />

            <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
              {DECISIONS.map((d) => (
                <article key={d.step} className="bg-card px-6 py-8 lg:px-8 lg:py-10">
                  <span className="font-heading text-[13px] font-bold tracking-[0.12em] text-primary">
                    {d.step}
                  </span>
                  <h3 className="mt-4 font-heading text-[19px] font-semibold tracking-[-0.02em]">
                    {d.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.65] text-muted-foreground">{d.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Cases />

        <section className="border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="rounded-sm border border-border bg-card px-6 py-10 lg:px-12 lg:py-14">
              <h2 className="max-w-2xl font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[32px]">
                Расскажите задачу — вернёмся с готовым списком
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-muted-foreground">
                Опишите, какая техника нужна и на какую сумму рассчитываете. Уточняющие вопросы
                задаём сами.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/#contact"
                  className="group inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-4 font-heading text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]"
                >
                  Получить подбор
                  <Icon
                    name="ArrowRight"
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="https://t.me/techsearchteam"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-4 font-heading text-[15px] font-medium transition-colors hover:border-primary"
                >
                  <Icon name="Send" size={16} className="text-primary" />
                  Написать в Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;