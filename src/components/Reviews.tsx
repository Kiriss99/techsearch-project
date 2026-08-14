import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

type Review = {
  text: string;
  name: string;
  category: string;
};

const REVIEWS: Review[] = [
  {
    text: 'Смотрела телевизоры две недели и окончательно запуталась. Здесь получила три варианта с объяснением, чем они отличаются. Взяла средний — по факту всё как описали.',
    name: 'Марина',
    category: 'Телевизор',
  },
  {
    text: 'Хотел взять модель, которую советовали в магазине. Ребята показали, что за половину функций я просто переплачу. В итоге сэкономил около 20 тысяч.',
    name: 'Алексей',
    category: 'Холодильник',
  },
  {
    text: 'Нужен был ноутбук для монтажа, но без переплаты за бренд. Прислали подборку с расчётом, чего хватит на пару лет вперёд. Работаю уже полгода — вопросов нет.',
    name: 'Дмитрий',
    category: 'Ноутбук',
  },
  {
    text: 'Оснащали квартиру под сдачу. Получили таблицу по всем позициям с ценами и ссылками — осталось только оформить заказы. Уложились в бюджет.',
    name: 'Ольга',
    category: 'Комплект для квартиры',
  },
  {
    text: 'Отдельно понравилось, что проверили продавца, а не только модель. У одного магазина были проблемы с гарантией — предупредили заранее.',
    name: 'Сергей',
    category: 'Стиральная машина',
  },
  {
    text: 'Задала кучу вопросов, ответили на все спокойно и без давления. Ощущение, что человек реально на моей стороне, а не продаёт технику.',
    name: 'Екатерина',
    category: 'Кухонная техника',
  },
];

const Reviews = () => (
  <section id="reviews" className="relative border-t border-border py-20 lg:py-28">
    <div className="pointer-events-none absolute -right-40 top-10 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[140px]" />
    <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Отзывы клиентов"
        title="Что говорят те, кому мы уже подобрали технику"
        description="Отзывы приходят к нам в Telegram — публикуем их без правок."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <article key={r.name + r.category} className="flex flex-col bg-card px-6 py-8 lg:px-8">
            <Icon name="Quote" size={20} className="text-primary" />
            <p className="mt-5 flex-1 text-[15px] leading-[1.65] text-muted-foreground">{r.text}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary font-heading text-[14px] font-semibold text-foreground">
                {r.name.charAt(0)}
              </span>
              <span>
                <span className="block font-heading text-[14px] font-semibold text-foreground">
                  {r.name}
                </span>
                <span className="block text-[13px] text-muted-foreground">{r.category}</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <a
          href="https://t.me/techssearch"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-sm border border-border px-6 py-4 font-heading text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-primary"
        >
          <Icon name="Send" size={16} className="text-primary" />
          Все отзывы
          <Icon
            name="ArrowRight"
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
        <p className="text-[13px] text-muted-foreground">
          Отзывы и разборы публикуем в канале @techssearch
        </p>
      </div>
    </div>
  </section>
);

export default Reviews;
