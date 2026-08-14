import { useState } from 'react';
import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

type Option = { id: string; label: string; hint?: string };

type Step = {
  key: 'category' | 'budget' | 'stage' | 'priority';
  question: string;
  options: Option[];
};

const STEPS: Step[] = [
  {
    key: 'category',
    question: 'Какую технику подбираем?',
    options: [
      { id: 'tv', label: 'Телевизор' },
      { id: 'fridge', label: 'Холодильник' },
      { id: 'laptop', label: 'Ноутбук или компьютер' },
      { id: 'kitchen', label: 'Кухонная техника' },
      { id: 'washer', label: 'Стиральная или сушильная' },
      { id: 'set', label: 'Несколько устройств сразу', hint: 'квартира, офис, объект под аренду' },
    ],
  },
  {
    key: 'budget',
    question: 'На какую сумму рассчитываете?',
    options: [
      { id: 'b1', label: 'до 30 000 ₽' },
      { id: 'b2', label: '30–70 000 ₽' },
      { id: 'b3', label: '70–150 000 ₽' },
      { id: 'b4', label: 'больше 150 000 ₽' },
      { id: 'b0', label: 'Пока не определился', hint: 'подскажем разумный диапазон' },
    ],
  },
  {
    key: 'stage',
    question: 'На каком вы этапе?',
    options: [
      { id: 'shortlist', label: 'Уже выбрал 2–3 модели', hint: 'нужно проверить, стоит ли брать' },
      { id: 'zero', label: 'Не знаю, с чего начать', hint: 'нужен готовый список вариантов' },
      { id: 'many', label: 'Нужно закрыть целое помещение', hint: 'список техники и бюджет по позициям' },
    ],
  },
  {
    key: 'priority',
    question: 'Что для вас важнее всего?',
    options: [
      { id: 'price', label: 'Не переплатить' },
      { id: 'life', label: 'Чтобы прослужило долго' },
      { id: 'service', label: 'Гарантия и надёжный продавец' },
      { id: 'fast', label: 'Быстро получить и не думать' },
    ],
  },
];

const PLAN_BY_STAGE: Record<string, { name: string; price: string; days: string; why: string }> = {
  shortlist: {
    name: 'Проверка выбора',
    price: '1 500 ₽',
    days: 'до 1 дня',
    why: 'Разберём ваши варианты, покажем слабые места и скрытую переплату — и скажем, брать или менять.',
  },
  zero: {
    name: 'Подбор под задачу',
    price: '3 500 ₽',
    days: '1–2 дня',
    why: 'Сравним модели, отсеем слабые варианты и пришлём 3 варианта с аргументами и ссылками.',
  },
  many: {
    name: 'Комплект помещения',
    price: 'от 9 000 ₽',
    days: '2–4 дня',
    why: 'Соберём список техники под каждое помещение и распределим бюджет между позициями.',
  },
};

const PRIORITY_NOTE: Record<string, string> = {
  price: 'Сфокусируемся на честной цене и уберём то, за что вы переплатите зря.',
  life: 'Отдадим приоритет ресурсу, ремонтопригодности и отзывам владельцев за 2–3 года.',
  service: 'Проверим гарантию, сервис и репутацию конкретного продавца, а не только модель.',
  fast: 'Оставим варианты, которые есть в наличии и приедут в разумный срок.',
};

const labelOf = (stepIndex: number, id: string) =>
  STEPS[stepIndex].options.find((o) => o.id === id)?.label ?? '';

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= STEPS.length;

  const choose = (key: string, id: string) => {
    setAnswers((a) => ({ ...a, [key]: id }));
    setStep((s) => s + 1);
  };

  const plan = PLAN_BY_STAGE[answers.stage] ?? PLAN_BY_STAGE.zero;

  const goToForm = () => {
    const text = `Нужна помощь с выбором: ${labelOf(0, answers.category)}. Бюджет: ${labelOf(
      1,
      answers.budget,
    )}. Этап: ${labelOf(2, answers.stage)}. Важнее всего: ${labelOf(3, answers.priority)}.`;
    window.dispatchEvent(
      new CustomEvent('techsearch:prefill', {
        detail: {
          task: text,
          budget: labelOf(1, answers.budget),
          quiz: {
            'Категория': labelOf(0, answers.category),
            'Бюджет': labelOf(1, answers.budget),
            'Этап': labelOf(2, answers.stage),
            'Приоритет': labelOf(3, answers.priority),
            'Рекомендованный тариф': `${plan.name} — ${plan.price}`,
          },
        },
      }),
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="quiz" className="relative border-t border-border py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Калькулятор подбора"
          title="Четыре вопроса — и вы поймёте, какой формат работы вам нужен"
          description="Ответы сразу подставятся в заявку, чтобы не описывать задачу заново."
        />

        <div className="mt-12 overflow-hidden rounded-sm border border-border bg-card">
          <div className="h-1 w-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(Math.min(step, STEPS.length) / STEPS.length) * 100}%` }}
            />
          </div>

          <div className="px-6 py-8 lg:px-10 lg:py-12">
            {!done ? (
              <div key={step} className="animate-fade-in">
                <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Шаг {step + 1} из {STEPS.length}
                </p>
                <h3 className="mt-4 font-heading text-[22px] font-bold tracking-[-0.02em] sm:text-[26px]">
                  {STEPS[step].question}
                </h3>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {STEPS[step].options.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => choose(STEPS[step].key, o.id)}
                      className="group rounded-sm border border-border bg-background px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-heading text-[15px] font-medium text-foreground">
                          {o.label}
                        </span>
                        <Icon
                          name="ArrowRight"
                          size={15}
                          className="shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                        />
                      </span>
                      {o.hint && (
                        <span className="mt-1.5 block text-[13px] leading-[1.5] text-muted-foreground">
                          {o.hint}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-7 inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon name="ArrowLeft" size={14} />
                    Назад
                  </button>
                )}
              </div>
            ) : (
              <div className="animate-scale-in">
                <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-primary">
                  Вам подойдёт
                </p>
                <div className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-2">
                  <h3 className="font-heading text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">
                    {plan.name}
                  </h3>
                  <span className="font-heading text-[22px] font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-[14px] text-muted-foreground">срок: {plan.days}</span>
                </div>

                <p className="mt-5 max-w-2xl text-[15px] leading-[1.65] text-muted-foreground">
                  {plan.why}
                </p>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    `Категория: ${labelOf(0, answers.category)}`,
                    `Бюджет: ${labelOf(1, answers.budget)}`,
                    PRIORITY_NOTE[answers.priority],
                    'Ответы уже подставлены в заявку',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Icon name="Check" size={15} className="mt-1 shrink-0 text-primary" />
                      <span className="text-[14px] leading-[1.55] text-muted-foreground">{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={goToForm}
                    className="group inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-4 font-heading text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]"
                  >
                    Перейти к заявке
                    <Icon
                      name="ArrowRight"
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                  <a
                    href="https://t.me/techsearchteam"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-4 font-heading text-[15px] font-medium transition-colors hover:border-primary"
                  >
                    <Icon name="Send" size={16} className="text-primary" />
                    Написать в Telegram
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      setStep(0);
                    }}
                    className="text-[14px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    Пройти заново
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;