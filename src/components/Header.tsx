import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import CallbackDialog from '@/components/CallbackDialog';

const NAV = [
  { href: '#how', label: 'Как работаем' },
  { href: '#categories', label: 'Категории' },
  { href: '#quiz', label: 'Калькулятор' },
  { href: '#price', label: 'Тарифы' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '/about', label: 'О нас' },
  { href: '#faq', label: 'Вопросы' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const link = (href: string) => (href.startsWith('#') && !onHome ? `/${href}` : href);

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
          href="/"
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
              href={link(item.href)}
              className="border-b border-transparent pb-0.5 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCallbackOpen(true)}
            className="hidden items-center gap-2 rounded-sm border border-border px-4 py-2.5 font-heading text-[13px] font-medium text-foreground transition-colors hover:border-primary sm:inline-flex"
          >
            <Icon name="PhoneCall" size={14} className="text-primary" />
            Обратный звонок
          </button>
          <a
            href={link('#contact')}
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
                href={link(item.href)}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setCallbackOpen(true);
              }}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 font-heading text-sm font-medium text-foreground"
            >
              <Icon name="PhoneCall" size={15} className="text-primary" />
              Обратный звонок
            </button>
            <a
              href={link('#contact')}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 font-heading text-sm font-medium text-primary-foreground"
            >
              Получить подбор
            </a>
          </nav>
        </div>
      )}

      <CallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
    </header>
  );
};

export default Header;