import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { sendLead } from '@/lib/api';

type Errors = Partial<Record<'name' | 'contact', string>>;

const TIMES = ['Сейчас', 'Утром 9–12', 'Днём 12–16', 'Вечером 16–20', 'В выходные'];

interface CallbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CallbackDialog = ({ open, onOpenChange }: CallbackDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [time, setTime] = useState(TIMES[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const reset = () => {
    setName('');
    setContact('');
    setTime(TIMES[0]);
    setErrors({});
    setSent(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const validate = () => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Напишите, как к вам обращаться';
    if (contact.trim().length < 4) next.contact = 'Оставьте телефон или ник в Telegram';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || loading) return;
    setLoading(true);
    try {
      await sendLead({
        name: name.trim(),
        contact: contact.trim(),
        task: `Заказ обратного звонка. Удобное время: ${time}`,
        source: 'Обратный звонок',
        callback_time: time,
      });
      setSent(true);
    } catch {
      toast({
        title: 'Не удалось отправить',
        description: 'Попробуйте ещё раз или напишите нам в Telegram — @techsearchteam.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-sm border-border bg-card sm:max-w-[440px]">
        {sent ? (
          <div className="animate-scale-in flex flex-col items-start py-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Icon name="Check" size={22} />
            </span>
            <h3 className="mt-6 font-heading text-[20px] font-bold tracking-[-0.02em]">
              Заявка на звонок принята
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">
              Перезвоним в выбранное время. Если удобнее написать — мы в Telegram: @techsearchteam.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-[20px] font-bold tracking-[-0.02em]">
                Заказать обратный звонок
              </DialogTitle>
              <DialogDescription className="text-[14px] leading-[1.55]">
                Оставьте контакт и удобное время — перезвоним сами.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="cb-name"
                  className="mb-2 block text-[13px] font-medium text-muted-foreground"
                >
                  Как к вам обращаться
                </label>
                <Input
                  id="cb-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((err) => ({ ...err, name: undefined }));
                  }}
                  placeholder="Имя"
                  className="h-11 rounded-sm border-border bg-background text-[15px]"
                />
                {errors.name && <p className="mt-2 text-[13px] text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label
                  htmlFor="cb-contact"
                  className="mb-2 block text-[13px] font-medium text-muted-foreground"
                >
                  Телефон или Telegram
                </label>
                <Input
                  id="cb-contact"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    setErrors((err) => ({ ...err, contact: undefined }));
                  }}
                  placeholder="+7 900 000-00-00 или @nickname"
                  className="h-11 rounded-sm border-border bg-background text-[15px]"
                />
                {errors.contact && (
                  <p className="mt-2 text-[13px] text-destructive">{errors.contact}</p>
                )}
              </div>

              <div>
                <span className="mb-2 block text-[13px] font-medium text-muted-foreground">
                  Удобное время для звонка
                </span>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded-sm border px-3.5 py-2 text-[13px] transition-colors ${
                        time === t
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-sm bg-primary px-6 py-3.5 font-heading text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)] disabled:pointer-events-none disabled:opacity-60"
              >
                {loading ? 'Отправляем…' : 'Жду звонка'}
                <Icon
                  name={loading ? 'LoaderCircle' : 'PhoneCall'}
                  size={16}
                  className={loading ? 'animate-spin' : ''}
                />
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallbackDialog;
