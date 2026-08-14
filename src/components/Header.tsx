import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const NAV = [
  { href: '#problem', label: 'Зачем это' },
  { href: '#how', label: 'Как работаем' },
  { href: '#what', label: 'Что учитываем' },
  { href: '#categories', label: 'Категории' },
  { href: '#quiz', label: 'Калькулятор' },
  { href: '#price', label: 'Тарифы' },
  { href: '#faq', label: 'Вопросы' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-border' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-heading text-[17px] font-bold tracking-[-0.03em] text-foreground"
        >
          <img src="/logo.svg" alt="" className="h-6 w-auto" />
          <span>
            Tech<span className="text-primary">Search</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-transparent pb-0.5 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-sm bg-primary px-5 py-2.5 font-heading text-[13px] font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Получить подбор
          </a>
          <button
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
          >
            <Icon name={open ? 'X' : 'Menu'} size={18} />
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col px-5 py-3 md:px-10">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 font-heading text-sm font-medium text-primary-foreground"
            >
              Получить подбор
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;