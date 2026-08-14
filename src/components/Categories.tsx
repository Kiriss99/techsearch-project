import { useState } from 'react';
import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

type Category = {
  id: string;
  icon: string;
  name: string;
  short: string;
  points: string[];
  example: string;
};

const CATEGORIES: Category[] = [
  {
    id: 'tv',
    icon: 'Tv',
    name: 'Телевизоры',
    short: 'диагональ, матрица, звук, консоли',
    points: [
      'Диагональ под расстояние до дивана, а не «чем больше, тем лучше»',
      'Матрица и частота: нужна ли она под консоль или хватит обычной',
      'Звук: хватит встроенного или сразу считаем саундбар',
      'Разъёмы и поддержка сервисов, которыми вы реально пользуетесь',
    ],
    example: 'ТВ 65" · 120 Гц · 68 400 ₽ — подходит под PS5 и остаётся в бюджете',
  },
  {
    id: 'fridge',
    icon: 'Refrigerator',
    name: 'Холодильники',
    short: 'объём, зона свежести, доставка',
    points: [
      'Объём под состав семьи и привычки закупок',
      'Зона свежести, No Frost и реальный уровень шума',
      'Габариты и проём: пройдёт ли в дверь и лифт',
      'Доставка, подъём и условия гарантии у конкретного продавца',
    ],
    example: 'Холодильник 340 л · 58 700 ₽ — тихий, входит в нишу, доставка в срок',
  },
  {
    id: 'laptop',
    icon: 'Laptop',
    name: 'Ноутбуки',
    short: 'работа, учёба, игры, вес и автономность',
    points: [
      'Задача: документы и звонки, учёба, монтаж или игры',
      'Память и накопитель с запасом на пару лет, а не впритык',
      'Вес и автономность, если носите каждый день',
      'Экран: яркость и матовое покрытие для работы у окна',
    ],
    example: 'Ноутбук 14" · 16 ГБ · 71 200 ₽ — 1,3 кг и честные 9 часов работы',
  },
  {
    id: 'kitchen',
    icon: 'CookingPot',
    name: 'Кухонная техника',
    short: 'встройка, размеры, режимы',
    points: [
      'Встраиваемая или отдельностоящая — по вашей кухне и планам',
      'Режимы, которыми вы будете пользоваться, без переплаты за лишние',
      'Расход воды и электричества на длинной дистанции',
      'Сервис и наличие запчастей по вашему городу',
    ],
    example: 'Посудомойка 45 см · 42 900 ₽ — влезает в нишу, тихий режим ночью',
  },
  {
    id: 'wash',
    icon: 'WashingMachine',
    name: 'Стиральные машины',
    short: 'загрузка, отжим, шум',
    points: [
      'Загрузка под семью и частоту стирок',
      'Глубина корпуса под ванную или кухню',
      'Уровень шума и вибрация — особенно для квартиры',
      'Надёжность серии по реальным отзывам владельцев',
    ],
    example: 'Стиралка 7 кг · 39 500 ₽ — узкая, тихий отжим, гарантия 3 года',
  },
];

const SCENARIOS = [
  { icon: 'House', label: 'Для себя домой' },
  { icon: 'Briefcase', label: 'В офис' },
  { icon: 'KeyRound', label: 'На съёмную квартиру' },
  { icon: 'TreePine', label: 'В загородный дом' },
  { icon: 'BedDouble', label: 'В апарт-отель или посуточную аренду' },
];

const Categories = () => {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const current = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];

  return (
    <section id="categories" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Категории и сценарии"
          title="Подбираем не «по каталогу», а под условия использования"
          description="Выберите категорию — покажем, на что смотрим в первую очередь."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-px bg-border">
            {CATEGORIES.map((c) => {
              const isActive = c.id === current.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`flex items-start gap-3 px-6 py-5 text-left transition-colors ${
                    isActive ? 'bg-secondary' : 'bg-card hover:bg-secondary/60'
                  }`}
                >
                  <Icon
                    name={c.icon}
                    size={18}
                    className={`mt-0.5 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                  <span>
                    <span
                      className={`block font-heading text-[15px] font-semibold tracking-[-0.01em] ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {c.name}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                      {c.short}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div key={current.id} className="animate-fade-in bg-card px-6 py-8 lg:px-10 lg:py-10">
            <h3 className="font-heading text-[22px] font-bold tracking-[-0.02em] lg:text-[26px]">
              {current.name} — {current.short}
            </h3>
            <ul className="mt-6 space-y-4">
              {current.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Icon name="Check" size={16} className="mt-1 shrink-0 text-primary" />
                  <span className="text-[15px] leading-[1.6] text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-primary bg-secondary/50 px-5 py-4 text-[14px] leading-[1.6] text-foreground">
              Пример из подбора: {current.example}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Сценарии покупки
          </p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {SCENARIOS.map((s) => (
              <li
                key={s.label}
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-[14px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Icon name={s.icon} size={16} className="text-primary" />
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Categories;
