import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

type Plan = {
  name: string;
  price: string;
  fit: string;
  items: string[];
  featured?: boolean;
  cta: string;
  href?: string;
};

const PLANS: Plan[] = [
  {
    name: 'Проверка выбора',
    price: '1 500 ₽',
    fit: 'Подходит, если вы уже присмотрели 2–3 модели и хотите понять, стоит ли брать.',
    items: [
      'Разбираем ваши варианты по задаче и условиям',
      'Показываем слабые места и скрытую переплату',
      'Проверяем цену, продавца, гарантию и доставку',
      'Короткий вывод: брать, менять или подождать',
    ],
    cta: 'Обсудить задачу',
  },
  {
    name: 'Подбор под задачу',
    price: '3 500 ₽',
    fit: 'Подходит, если техника нужна, а выбирать самому не хочется и некогда.',
    items: [
      'Разбираем задачу, условия и бюджет',
      'Сравниваем модели, характеристики и реальные отзывы',
      'Отсеиваем слабые варианты и ненадёжных продавцов',
      'Готовый список из 3 вариантов с аргументами и ссылками',
      'Один бесплатный пересмотр, если условия изменились',
    ],
    featured: true,
    cta: 'Получить подбор',
  },
  {
    name: 'Комплект помещения',
    price: 'от 9 000 ₽',
    fit: 'Подходит, если оснащаете квартиру, офис или объект под аренду целиком.',
    items: [
      'Список техники под каждое помещение и сценарий',
      'Распределяем бюджет между позициями',
      'Учитываем габариты, подключение и сроки доставки',
      'Сводная таблица с вариантами покупки и ссылками',
      'Сопровождаем до оформления заказов',
    ],
    cta: 'Написать в Telegram',
    href: 'https://t.me/techsearchteam',
  },
];

const Pricing = () => (
  <section id="price" className="relative border-t border-border py-20 lg:py-28">
    <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
    <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Тарифы"
        title="Фиксированная оплата — честный анализ рынка под ваш бюджет"
        description="Вы платите только за подбор. Стоимость известна заранее и не зависит от того, где вы в итоге купите."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border lg:grid-cols-3">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex flex-col px-6 py-8 lg:px-8 lg:py-10 ${
              plan.featured ? 'bg-secondary' : 'bg-card'
            }`}
          >
            {plan.featured && (
              <span className="absolute right-0 top-0 rounded-bl-sm bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                чаще всего берут
              </span>
            )}
            <h3 className="font-heading text-[19px] font-semibold tracking-[-0.02em]">{plan.name}</h3>
            <p className="mt-4 font-heading text-[32px] font-bold tracking-[-0.03em] text-foreground">
              {plan.price}
            </p>
            <p className="mt-4 text-[14px] leading-[1.6] text-muted-foreground">{plan.fit}</p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
              {plan.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="Check" size={15} className="mt-1 shrink-0 text-primary" />
                  <span className="text-[14px] leading-[1.55] text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={plan.href ?? '#contact'}
              target={plan.href ? '_blank' : undefined}
              rel={plan.href ? 'noreferrer' : undefined}
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3.5 font-heading text-[14px] font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                plan.featured
                  ? 'bg-primary text-primary-foreground hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]'
                  : 'border border-border bg-transparent text-foreground hover:border-primary'
              }`}
            >
              {plan.cta}
              <Icon name="ArrowRight" size={15} />
            </a>
          </article>
        ))}
      </div>

      <p className="mt-8 text-[14px] text-muted-foreground">
        Категории нет в списке? Напишите — скажем честно, сможем ли помочь.
      </p>
    </div>
  </section>
);

export default Pricing;