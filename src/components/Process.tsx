import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

const STEPS = [
  {
    n: '01',
    icon: 'PenLine',
    title: 'Заявка',
    text: 'Вы рассказываете, какая техника нужна, для каких задач и в каких условиях будет работать.',
  },
  {
    n: '02',
    icon: 'ScanSearch',
    title: 'Анализ',
    text: 'Изучаем модели, цены, реальные отзывы и условия продавцов — по вашему бюджету и сценарию.',
  },
  {
    n: '03',
    icon: 'Filter',
    title: 'Проверка',
    text: 'Отсеиваем слабые варианты, переплату за бренд и продавцов без внятной гарантии и доставки.',
  },
  {
    n: '04',
    icon: 'ListChecks',
    title: 'Итог',
    text: 'Присылаем короткий список с аргументами и ссылками — по каждому пункту понятно, почему он здесь.',
  },
];

const Process = () => (
  <section id="how" className="relative border-t border-border py-20 lg:py-28">
    <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
    <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Как работаем"
        title="Четыре шага без магии и скрытых действий"
        description="Вы видите каждый этап и понимаете, за что платите."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <article key={s.n} className="group relative bg-card px-6 py-8 transition-colors hover:bg-secondary">
            <span className="absolute right-5 top-6 font-heading text-[13px] font-bold tracking-[0.12em] text-muted-foreground/50">
              {s.n}
            </span>
            <Icon name={s.icon} size={22} className="text-primary" />
            <h3 className="mt-5 font-heading text-[18px] font-semibold tracking-[-0.02em]">
              {s.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{s.text}</p>
            <span className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
          </article>
        ))}
      </div>

      <p className="mt-8 font-heading text-[18px] font-medium tracking-[-0.02em] text-foreground sm:text-[20px]">
        Получаете понятные варианты и аргументы для покупки.
      </p>
    </div>
  </section>
);

export default Process;
