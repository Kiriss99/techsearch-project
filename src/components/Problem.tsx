import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

const PAINS = [
  {
    icon: 'Layers',
    title: 'Десятки моделей',
    text: 'Открываете маркетплейс — и видите десятки моделей, у каждой длинный список характеристик.',
  },
  {
    icon: 'MessagesSquare',
    title: 'Противоречивые отзывы',
    text: 'Одни хвалят, другие ругают ту же модель. Понять, где реальный опыт, а где реклама, сложно.',
  },
  {
    icon: 'CircleDollarSign',
    title: 'Риск переплаты',
    text: 'Легко заплатить за функции, которыми вы не пользуетесь, или взять слабую модель под вашу задачу.',
  },
];

const Problem = () => (
  <section id="problem" className="relative border-t border-border py-20 lg:py-28">
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHeading
          eyebrow="Проблема и решение"
          title="Покупка техники — это стресс. Мы его убираем."
          description="Рекомендации в интернете часто звучат слишком общо, а сравнивать самому — долго. Мы разбираемся в вашей задаче, проверяем рынок и оставляем только варианты, которые действительно подходят под бюджет и условия использования."
        />

        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border">
          {PAINS.map((p) => (
            <article key={p.title} className="group bg-card px-6 py-6 transition-colors hover:bg-secondary">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border text-primary transition-colors group-hover:border-primary">
                  <Icon name={p.icon} size={18} />
                </span>
                <div>
                  <h3 className="font-heading text-[16px] font-semibold tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">{p.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Problem;
