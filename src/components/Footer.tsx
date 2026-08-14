import Icon from '@/components/ui/icon';

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-heading text-[17px] font-bold tracking-[-0.03em]">
            Tech<span className="text-primary">Search</span>
          </p>
          <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">
            Независимый подбор техники для дома, офиса и аренды. Без процента с продаж и привязки к
            магазину.
          </p>
        </div>

        <nav className="flex flex-col gap-3 text-[14px] text-muted-foreground">
          <a href="#how" className="transition-colors hover:text-foreground">
            Как работаем
          </a>
          <a href="#categories" className="transition-colors hover:text-foreground">
            Категории и сценарии
          </a>
          <a href="#price" className="transition-colors hover:text-foreground">
            Тарифы
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            Вопросы
          </a>
        </nav>

        <div className="flex flex-col gap-3 text-[14px] text-muted-foreground">
          <a
            href="https://t.me/techsearch"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Icon name="Send" size={15} className="text-primary" />
            Написать в Telegram
          </a>
          <a
            href="mailto:hello@techsearch.ru"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Icon name="Mail" size={15} className="text-primary" />
            hello@techsearch.ru
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} TechSearch</p>
        <p>Не продаём технику и не получаем вознаграждение от магазинов</p>
      </div>
    </div>
  </footer>
);

export default Footer;
