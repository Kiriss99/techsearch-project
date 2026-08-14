import Icon from '@/components/ui/icon';

type Row = { model: string; verdict: string; keep?: boolean };

const ROWS: Row[] = [
  { model: 'ТВ 65" · 60 Гц · 74 900 ₽', verdict: 'мало для консоли' },
  { model: 'Ноутбук 14" · 8 ГБ · 79 000 ₽', verdict: 'памяти впритык' },
  { model: 'ТВ 65" · 120 Гц · 68 400 ₽', verdict: 'подходит', keep: true },
  { model: 'Холодильник 320 л · 61 900 ₽', verdict: 'нет доставки в срок' },
  { model: 'ТВ 55" · QLED · 89 900 ₽', verdict: 'выше бюджета' },
  { model: 'Ноутбук 16" · 2,4 кг · 92 000 ₽', verdict: 'тяжёлый для учёбы' },
  { model: 'Ноутбук 14" · 16 ГБ · 71 200 ₽', verdict: 'подходит', keep: true },
  { model: 'Холодильник 280 л · 54 000 ₽', verdict: 'продавец без гарантии' },
  { model: 'ТВ 75" · 55 000 ₽', verdict: 'отзывы о подсветке' },
  { model: 'Ноутбук 13" · 4 ч · 64 900 ₽', verdict: 'слабая автономность' },
  { model: 'Холодильник 340 л · 58 700 ₽', verdict: 'подходит', keep: true },
  { model: 'ТВ 50" · 43 000 ₽', verdict: 'переплата за бренд' },
];

const Tape = ({ hidden = false }: { hidden?: boolean }) => (
  <div aria-hidden={hidden || undefined}>
    {ROWS.map((row, i) => (
      <div
        key={`${row.model}-${i}`}
        className="flex items-baseline justify-between gap-4 border-b border-border/60 px-5 py-3"
      >
        <span
          className={`whitespace-nowrap text-[13px] font-medium tracking-[-0.01em] ${
            row.keep ? 'text-foreground' : 'text-hero-strike line-through decoration-1'
          }`}
        >
          {row.model}
        </span>
        <span
          className={
            row.keep
              ? 'whitespace-nowrap rounded-[2px] bg-primary px-2 py-[3px] text-[11px] font-bold text-primary-foreground'
              : 'whitespace-nowrap text-[11px] text-hero-strike'
          }
        >
          {row.verdict}
        </span>
      </div>
    ))}
  </div>
);

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden pt-[68px]">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.35]" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-primary/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-[1440px] items-start gap-12 px-5 pb-16 pt-14 md:px-10 lg:grid-cols-[1fr_430px] lg:gap-16 lg:px-16 lg:pb-24 lg:pt-20">
        <div>
          <div className="eyebrow mb-8">Подбор техники для дома и офиса</div>

          <h1 className="font-heading text-[38px] font-bold leading-[1.04] tracking-[-0.038em] sm:text-[46px] lg:text-[58px]">
            <span className="block overflow-hidden">
              <i className="block translate-y-[105%] animate-rise not-italic">Отсеиваем шум.</i>
            </span>
            <span className="block overflow-hidden">
              <i className="block translate-y-[105%] animate-rise not-italic [animation-delay:0.1s]">
                Остаётся то,
              </i>
            </span>
            <span className="block overflow-hidden">
              <i className="block translate-y-[105%] animate-rise not-italic [animation-delay:0.2s]">
                что <em className="not-italic text-primary">подходит</em>.
              </i>
            </span>
          </h1>

          <p className="mt-7 max-w-[26em] text-[17px] leading-[1.55] text-muted-foreground opacity-0 animate-fade-in [animation-delay:0.5s]">
            Вы называете задачу, условия и&nbsp;бюджет. Мы&nbsp;сравниваем модели, цены, отзывы
            и&nbsp;продавцов&nbsp;— и&nbsp;присылаем{' '}
            <b className="font-medium text-foreground">
              короткий список с&nbsp;аргументами и&nbsp;ссылками
            </b>
            .
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 opacity-0 animate-fade-in [animation-delay:0.68s]">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-4 font-heading text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]"
            >
              Обсудить задачу
              <Icon
                name="ArrowRight"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <p className="max-w-[15em] text-[13px] leading-[1.4] text-muted-foreground">
              Без процента с&nbsp;продаж и&nbsp;привязки к&nbsp;магазину.
            </p>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
            {[
              { v: '34 → 3', l: 'модели в итоге' },
              { v: '2 дня', l: 'средний срок' },
              { v: '0 %', l: 'комиссии магазинов' },
              { v: '6 лет', l: 'в подборе техники' },
            ].map((s) => (
              <div key={s.l} className="bg-card px-4 py-4">
                <dt className="font-heading text-[19px] font-bold tracking-[-0.02em] text-foreground">
                  {s.v}
                </dt>
                <dd className="mt-1 text-[12px] leading-tight text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside
          aria-label="Как мы отсеиваем варианты"
          className="relative h-[440px] overflow-hidden rounded-sm border border-border bg-card opacity-0 animate-fade-in [animation-delay:0.3s] lg:h-[560px]"
        >
          <div className="absolute inset-x-0 top-0 z-10 flex items-baseline justify-between border-b border-border bg-card px-5 pb-3 pt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            <span>Проверка рынка</span>
            <b className="text-foreground">34 модели → 3</b>
          </div>

          <div
            className="absolute inset-x-0 bottom-0 top-[52px] overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(180deg,transparent 0,#000 42px,#000 calc(100% - 70px),transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(180deg,transparent 0,#000 42px,#000 calc(100% - 70px),transparent 100%)',
            }}
          >
            <div className="animate-roll">
              <Tape />
              <Tape hidden />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[74px] z-10">
            <div className="h-[2px] w-full bg-primary" />
            <span className="absolute right-0 top-[2px] rounded-b-sm bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
              сравниваем
            </span>
          </div>
        </aside>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-14 md:px-10 lg:px-16">
        <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: 'Search', t: 'Ищем выгодные предложения' },
            { icon: 'Store', t: 'Сравниваем магазины и маркетплейсы' },
            { icon: 'MessageSquareText', t: 'Даём понятные рекомендации' },
            { icon: 'Wallet', t: 'Подбираем под бюджет и сценарии' },
            { icon: 'ShieldCheck', t: 'Работаем независимо' },
          ].map((item) => (
            <li key={item.t} className="flex items-start gap-3 bg-card px-5 py-5">
              <Icon name={item.icon} size={18} className="mt-0.5 shrink-0 text-primary" />
              <span className="text-[14px] leading-snug text-muted-foreground">{item.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;