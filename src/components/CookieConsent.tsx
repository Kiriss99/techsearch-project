import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const STORAGE_KEY = 'techsearch:cookie-consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-16">
        <p className="flex items-start gap-3 text-[13px] leading-[1.55] text-muted-foreground">
          <Icon name="Cookie" size={18} className="mt-0.5 shrink-0 text-primary" />
          Мы используем файлы cookie, чтобы сайт работал корректно и был удобнее. Продолжая
          пользоваться сайтом, вы соглашаетесь с их использованием.
        </p>
        <button
          type="button"
          onClick={accept}
          className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-primary px-5 py-2.5 font-heading text-[14px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]"
        >
          Хорошо
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
