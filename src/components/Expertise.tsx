import Icon from '@/components/ui/icon';

const FACTS = [
  { icon: 'Store', text: '8 лет в рознице крупной бытовой техники' },
  { icon: 'ClipboardCheck', text: 'Более 400 подборов для дома, офиса и аренды' },
  { icon: 'HandCoins', text: 'Ноль рублей комиссии от магазинов и маркетплейсов' },
];

const Expertise = () => (
  <section id="about" className="border-t border-border py-20 lg:py-28">
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-16">
        <div className="relative">
          <div className="absolute -left-3 -top-3 h-full w-full rounded-sm border border-border" />
          <img
            src="https://cdn.poehali.dev/projects/a2565413-a631-4ca3-9bf5-edcf50d8f947/files/0699d94c-4705-484d-99c7-13564c47349b.jpg"
            alt="Рабочее место специалиста TechSearch: сравнение моделей и цен"
            loading="lazy"
            className="relative w-full rounded-sm border border-border object-cover"
          />
        </div>

        <div>
          <div className="eyebrow mb-6">Экспертность</div>
          <blockquote className="font-heading text-[22px] font-medium leading-[1.35] tracking-[-0.02em] text-foreground sm:text-[26px] lg:text-[30px]">
            «Я 8 лет продавала крупную бытовую технику и видела, как легко покупателю навязать
            лишние функции. Сейчас я делаю наоборот: отсекаю шум, считаю реальную пользу
            и&nbsp;оставляю только то, что подходит под задачу».
          </blockquote>
          <p className="mt-6 text-[15px] text-muted-foreground">
            Анна Ковалёва — специалист по подбору техники, основатель TechSearch
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
            {FACTS.map((f) => (
              <li key={f.text} className="bg-card px-5 py-5">
                <Icon name={f.icon} size={18} className="text-primary" />
                <p className="mt-3 text-[14px] leading-snug text-muted-foreground">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Expertise;
