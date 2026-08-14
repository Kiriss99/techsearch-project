import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

const BLOCKS = [
  {
    icon: 'RefreshCw',
    title: 'Если подбор не подошёл',
    items: [
      'Разбираем, что именно не устроило — задачу, бюджет или конкретные модели',
      'Один пересмотр входит в стоимость: собираем новую подборку под уточнённые условия',
      'Если и после пересмотра решение не подошло — возвращаем оплату полностью',
      'Спорные ситуации решаем в вашу пользу: репутация нам важнее одного платежа',
    ],
  },
  {
    icon: 'CreditCard',
    title: 'Как происходит оплата',
    items: [
      'Сначала обсуждаем задачу — до оплаты вы понимаете, чем мы поможем',
      'Стоимость фиксируем заранее, она не меняется по ходу работы',
      'Оплата переводом на карту или по счёту для юрлиц',
      'Никаких комиссий, процентов от покупки и доплат за «срочность»',
    ],
  },
  {
    icon: 'ShieldCheck',
    title: 'Какие гарантии даём',
    items: [
      'Не получаем вознаграждение от магазинов и не продвигаем бренды за деньги',
      'По каждой модели объясняем, почему она в списке, а не просто даём ссылку',
      'Проверяем продавца, гарантию и условия возврата до того, как советовать',
      'Отвечаем на вопросы по подборке ещё 14 дней после сдачи работы',
    ],
  },
];

const Terms = () => (
  <section id="terms" className="border-t border-border py-20 lg:py-28">
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Условия работы"
        title="Договариваемся на берегу — без мелкого шрифта"
        description="Что будет, если результат не подошёл, как платить и за что мы отвечаем."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border lg:grid-cols-3">
        {BLOCKS.map((b) => (
          <article key={b.title} className="bg-card px-6 py-8 lg:px-8 lg:py-10">
            <div className="flex items-center gap-3">
              <Icon name={b.icon} size={20} className="text-primary" />
              <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em]">
                {b.title}
              </h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {b.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="Check" size={15} className="mt-1 shrink-0 text-primary" />
                  <span className="text-[14px] leading-[1.6] text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Terms;
