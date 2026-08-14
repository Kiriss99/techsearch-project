import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type Errors = Partial<Record<'name' | 'contact' | 'task', string>>;

const BUDGETS = ['до 30 000 ₽', '30–70 000 ₽', '70–150 000 ₽', 'больше 150 000 ₽'];

const Contact = () => {
  const { toast } = useToast();
  const [values, setValues] = useState({ name: '', contact: '', task: '' });
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<{ task?: string; budget?: string }>).detail;
      if (detail?.task) {
        setSent(false);
        setValues((v) => ({ ...v, task: detail.task as string }));
        setErrors((err) => ({ ...err, task: undefined }));
      }
      if (detail?.budget && BUDGETS.includes(detail.budget)) setBudget(detail.budget);
    };
    window.addEventListener('techsearch:prefill', onPrefill);
    return () => window.removeEventListener('techsearch:prefill', onPrefill);
  }, []);

  const update = (field: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = 'Напишите, как к вам обращаться';
    if (values.contact.trim().length < 4)
      next.contact = 'Оставьте телефон, почту или ник в Telegram';
    if (values.task.trim().length < 10)
      next.task = 'Опишите задачу подробнее — хотя бы пару предложений';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    toast({
      title: 'Заявка принята',
      description: 'Ответим в течение рабочего дня и уточним детали задачи.',
    });
  };

  return (
    <section id="contact" className="relative border-t border-border py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16">
          <div>
            <div className="eyebrow mb-6">Контакты и заявка</div>
            <h2 className="font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[34px] lg:text-[42px]">
              Расскажите задачу — вернёмся с готовым списком
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-[1.6] text-muted-foreground">
              Опишите, какая техника нужна, где будет стоять и на какую сумму рассчитываете.
              Уточняющие вопросы задаём сами — от вас не нужны характеристики и модели.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              <a
                href="https://t.me/techsearchteam"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 bg-card px-6 py-6 transition-colors hover:bg-secondary"
              >
                <Icon name="Send" size={20} className="text-primary" />
                <span>
                  <span className="block font-heading text-[15px] font-semibold">
                    Написать в Telegram
                  </span>
                  <span className="block text-[13px] text-muted-foreground">@techsearchteam</span>
                </span>
              </a>
              <a
                href="mailto:techsearchteam@gmail.com"
                className="group flex items-center gap-4 bg-card px-6 py-6 transition-colors hover:bg-secondary"
              >
                <Icon name="Mail" size={20} className="text-primary" />
                <span>
                  <span className="block font-heading text-[15px] font-semibold">Почта</span>
                  <span className="block text-[13px] text-muted-foreground">techsearchteam@gmail.com</span>
                </span>
              </a>
            </div>

            <p className="mt-6 flex items-center gap-2 text-[13px] text-muted-foreground">
              <Icon name="Clock" size={14} className="text-primary" />
              Отвечаем по будням с 10:00 до 20:00
            </p>
            <a
              href="https://t.me/techssearch"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="MessageSquare" size={14} className="text-primary" />
              Отзывы клиентов и разборы — в канале @techssearch
            </a>
          </div>

          <div className="rounded-sm border border-border bg-card p-6 lg:p-9">
            {sent ? (
              <div className="animate-scale-in flex h-full flex-col items-start justify-center py-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <Icon name="Check" size={22} />
                </span>
                <h3 className="mt-6 font-heading text-[22px] font-bold tracking-[-0.02em]">
                  Заявка принята
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                  Ответим в течение рабочего дня, уточним условия и сроки. Если нужно быстрее —
                  напишите в Telegram.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setValues({ name: '', contact: '', task: '' });
                  }}
                  className="mt-8 text-[14px] font-medium text-primary underline-offset-4 hover:underline"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[13px] font-medium text-muted-foreground"
                  >
                    Как к вам обращаться
                  </label>
                  <Input
                    id="name"
                    value={values.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Имя"
                    className="h-12 rounded-sm border-border bg-background text-[15px]"
                  />
                  {errors.name && (
                    <p className="mt-2 text-[13px] text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact"
                    className="mb-2 block text-[13px] font-medium text-muted-foreground"
                  >
                    Telegram, почта или телефон
                  </label>
                  <Input
                    id="contact"
                    value={values.contact}
                    onChange={(e) => update('contact', e.target.value)}
                    placeholder="@nickname или +7 900 000-00-00"
                    className="h-12 rounded-sm border-border bg-background text-[15px]"
                  />
                  {errors.contact && (
                    <p className="mt-2 text-[13px] text-destructive">{errors.contact}</p>
                  )}
                </div>

                <div>
                  <span className="mb-2 block text-[13px] font-medium text-muted-foreground">
                    Бюджет
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`rounded-sm border px-4 py-2.5 text-[13px] transition-colors ${
                          budget === b
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="task"
                    className="mb-2 block text-[13px] font-medium text-muted-foreground"
                  >
                    Задача и условия
                  </label>
                  <Textarea
                    id="task"
                    value={values.task}
                    onChange={(e) => update('task', e.target.value)}
                    rows={4}
                    placeholder="Например: нужен ТВ в гостиную 18 м², смотрим фильмы и играем на PS5"
                    className="rounded-sm border-border bg-background text-[15px]"
                  />
                  {errors.task && (
                    <p className="mt-2 text-[13px] text-destructive">{errors.task}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-sm bg-primary px-6 py-4 font-heading text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]"
                >
                  Получить подбор
                  <Icon
                    name="ArrowRight"
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="text-[12px] leading-[1.5] text-muted-foreground">
                  Отправляя форму, вы соглашаетесь на обработку контактных данных. Рассылок не
                  присылаем.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;