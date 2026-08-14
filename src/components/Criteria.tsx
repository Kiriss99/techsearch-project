import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';

const ITEMS = [
  {
    icon: 'Home',
    title: 'Ваши реальные условия',
    text: 'Где будет стоять техника, кто ей пользуется, как часто и в каком режиме. От этого зависит, какие характеристики важны, а какие можно не оплачивать.',
  },
  {
    icon: 'Gauge',
    title: 'Реальные характеристики',
    text: 'Проверяем, что заявлено в описании, а что подтверждают тесты и отзывы владельцев. Маркетинговые названия режимов расшифровываем простыми словами.',
  },
  {
    icon: 'Truck',
    title: 'Цены и условия продавцов',
    text: 'Сравниваем магазины и маркетплейсы: итоговую цену, гарантию, сроки доставки и то, что будет, если товар придётся вернуть.',
  },
  {
    icon: 'Wallet',
    title: 'Ваш бюджет',
    text: 'Не предлагаем «чуть дороже, зато лучше», если вы этого не просили. Ищем лучшее в рамках вашей суммы.',
  },
];

const Criteria = () => (
  <section id="what" className="border-t border-border py-20 lg:py-28">
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Что учитываем"
        title="Что именно проверяем перед тем, как что-то советовать"
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
        {ITEMS.map((item) => (
          <article key={item.title} className="bg-card px-6 py-8 lg:px-8 lg:py-10">
            <div className="flex items-center gap-3">
              <Icon name={item.icon} size={20} className="text-primary" />
              <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
            </div>
            <p className="mt-4 text-[15px] leading-[1.65] text-muted-foreground">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Criteria;
