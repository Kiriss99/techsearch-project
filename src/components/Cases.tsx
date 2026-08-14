import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

type Case = {
  icon: string;
  category: string;
  task: string;
  budget: string;
  considered: string[];
  result: string;
  why: string[];
};

const CASES: Case[] = [
  {
    icon: 'Tv',
    category: 'Телевизор',
    task: 'ТВ в гостиную 18 м², смотрят фильмы и играют на PS5. Диван в трёх метрах от стены.',
    budget: 'до 75 000 ₽',
    considered: [
      '9 моделей 55–65" от четырёх производителей',
      'Отдельно считали связку «ТВ подешевле + саундбар»',
      'Проверили наличие HDMI 2.1 и реальную частоту матрицы',
    ],
    result: 'ТВ 65", 120 Гц — 68 400 ₽',
    why: [
      'Под три метра до дивана 65" комфортнее, чем 55" — картинка не «мелкая»',
      'Честные 120 Гц по HDMI 2.1: консоль раскрывается полностью',
      'У двух конкурентов частота была «программная» — отсеяли',
      'Осталось 6 600 ₽ бюджета на кронштейн и кабель',
    ],
  },
  {
    icon: 'Refrigerator',
    category: 'Холодильник',
    task: 'Семья из четырёх человек, закупаются раз в неделю. Ниша 60 см, кухня рядом со спальней.',
    budget: '50–60 000 ₽',
    considered: [
      '12 моделей объёмом 320–380 л',
      'Сравнили заявленный и измеренный уровень шума по тестам',
      'Проверили габариты с учётом дверного проёма и лифта',
    ],
    result: 'Холодильник 340 л, No Frost — 58 700 ₽',
    why: [
      '340 л закрывают недельные закупки без «мёртвого» объёма',
      '38 дБ по замерам — не мешает спать за стеной',
      'Влезает в нишу с зазором на вентиляцию, проходит в лифт',
      'У продавца гарантия 3 года и подъём на этаж в стоимости',
    ],
  },
  {
    icon: 'Laptop',
    category: 'Ноутбук',
    task: 'Ноутбук для монтажа видео и работы вне дома. Важен вес и автономность, брендовая переплата не нужна.',
    budget: 'до 80 000 ₽',
    considered: [
      '7 моделей 14–16" на разных процессорах',
      'Смотрели тесты рендера, а не маркетинговые цифры',
      'Проверяли, паяется ли память и можно ли расширить диск',
    ],
    result: 'Ноутбук 14", 16 ГБ / 1 ТБ — 71 200 ₽',
    why: [
      'В тестах монтажа обгоняет две модели дороже на 15 000 ₽',
      '1,3 кг и 9 часов реальной работы — можно носить каждый день',
      'Матовый яркий экран: видно у окна и в кафе',
      'Диск меняется — через пару лет можно расширить, а не менять ноутбук',
    ],
  },
  {
    icon: 'Building2',
    category: 'Комплект для квартиры',
    task: 'Однокомнатная квартира под посуточную аренду. Нужна вся техника: кухня, стирка, ТВ. Важна надёжность и сервис.',
    budget: 'до 180 000 ₽',
    considered: [
      '6 позиций техники, по каждой — от 5 до 9 моделей',
      'Считали общий бюджет и распределяли между позициями',
      'Проверили сроки доставки, чтобы всё приехало в одну неделю',
    ],
    result: 'Комплект из 6 устройств — 171 300 ₽',
    why: [
      'На ТВ и микроволновке сэкономили, стиральную взяли надёжнее — она ломается чаще',
      'Все позиции с сервисом в городе клиента: ремонт без пересылки',
      'Простое управление — гости не звонят с вопросами',
      'Уложились в бюджет и оставили запас на мелочи',
    ],
  },
];

const Cases = () => (
  <section id="cases" className="relative border-t border-border py-20 lg:py-28">
    <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
    <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Примеры подборов"
        title="Как выглядит работа на реальных задачах"
        description="Показываем логику: с чего начали, что рассматривали и почему выбрали именно это."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border lg:grid-cols-2">
        {CASES.map((c) => (
          <article key={c.category} className="flex flex-col bg-card px-6 py-8 lg:px-8 lg:py-10">
            <div className="flex items-center gap-3">
              <Icon name={c.icon} size={20} className="text-primary" />
              <span className="font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {c.category}
              </span>
            </div>

            <h3 className="mt-5 text-[16px] leading-[1.55] text-foreground">{c.task}</h3>

            <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-sm border border-border px-3 py-2 text-[13px] text-muted-foreground">
              <Icon name="Wallet" size={14} className="text-primary" />
              Бюджет: {c.budget}
            </p>

            <div className="mt-7">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Что рассматривали
              </p>
              <ul className="mt-3 space-y-2.5">
                {c.considered.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Icon name="Minus" size={14} className="mt-1 shrink-0 text-primary" />
                    <span className="text-[14px] leading-[1.55] text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 border-l-2 border-primary bg-secondary/50 px-5 py-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Что выбрали
              </p>
              <p className="mt-2 font-heading text-[18px] font-semibold tracking-[-0.02em] text-foreground">
                {c.result}
              </p>
            </div>

            <div className="mt-7 flex-1">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Почему
              </p>
              <ul className="mt-3 space-y-2.5">
                {c.why.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Icon name="Check" size={14} className="mt-1 shrink-0 text-primary" />
                    <span className="text-[14px] leading-[1.55] text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-[14px] text-muted-foreground">
        Примеры обезличены: показываем задачу и логику решения, а не данные клиентов.
      </p>
    </div>
  </section>
);

export default Cases;
