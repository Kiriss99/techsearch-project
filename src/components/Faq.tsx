import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SectionHeading from '@/components/SectionHeading';

const QA = [
  {
    q: 'Продаёте ли вы технику или получаете процент от магазинов?',
    a: 'Нет. Мы не продаём технику и не получаем вознаграждение от магазинов — вы платите только за подбор. Поэтому рекомендация всегда на вашей стороне.',
  },
  {
    q: 'Почему рекомендации независимые?',
    a: 'У нас нет партнёрских договоров и планов продаж. Мы сравниваем предложения магазинов и маркетплейсов по одинаковым критериям: итоговая цена, гарантия, доставка, отзывы владельцев. Если выгоднее взять у продавца, о котором вы не слышали, — так и напишем.',
  },
  {
    q: 'Что я получу после подбора?',
    a: 'Короткий список вариантов с аргументами: почему модель подходит под вашу задачу и бюджет, в чём её слабые места, где и по какой цене её купить. К каждому пункту — ссылки на конкретные предложения.',
  },
  {
    q: 'Можно ли обратиться по категории, которой нет в списке?',
    a: 'Да, напишите задачу. Если разберёмся в категории и сможем дать честный результат — возьмём в работу. Если нет — скажем сразу и не будем брать деньги.',
  },
  {
    q: 'Что делать, если я уже выбрал несколько моделей?',
    a: 'Тогда подойдёт «Проверка выбора»: разберём ваши варианты, покажем переплату и слабые места, проверим продавца и условия. В итоге вы поймёте, стоит ли брать то, что присмотрели.',
  },
  {
    q: 'Сколько занимает подбор?',
    a: 'Обычно 1–2 дня. Для комплекта помещения — до 4 дней, потому что позиций больше и бюджет распределяем между ними.',
  },
];

const Faq = () => (
  <section id="faq" className="border-t border-border py-20 lg:py-28">
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
        <SectionHeading eyebrow="Вопросы" title="Отвечаем прямо" />

        <Accordion type="single" collapsible className="w-full border-t border-border">
          {QA.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="py-5 text-left font-heading text-[16px] font-medium tracking-[-0.01em] hover:no-underline sm:text-[18px]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-6 text-[15px] leading-[1.65] text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default Faq;
