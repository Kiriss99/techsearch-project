import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Icon from '@/components/ui/icon';
import { BLOG_POSTS } from '@/data/blog';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Блог — разборы техники от TechSearch"
        description="Статьи и разборы: как выбрать телевизор, холодильник, ноутбук и другую технику без переплаты и маркетинга."
        path="/blog"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden pb-16 pt-32 lg:pb-20 lg:pt-44">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
          <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={14} />
              На главную
            </a>

            <div className="mt-8 max-w-2xl">
              <div className="eyebrow mb-6">Блог</div>
              <h1 className="font-heading text-[32px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[42px] lg:text-[52px]">
                Разборы техники без маркетинга
              </h1>
              <p className="mt-6 text-[17px] leading-[1.6] text-muted-foreground">
                Пишем то же самое, что рассказываем клиентам в подборе: на что смотреть, что
                пропустить и где легко переплатить.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-secondary">
                    <img
                      src={post.cover}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6 lg:px-7 lg:py-7">
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
                      <Icon name={post.icon} size={14} />
                      {post.category}
                    </div>
                    <h2 className="mt-4 font-heading text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-foreground lg:text-[21px]">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-6 flex items-center gap-4 text-[12px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="Calendar" size={13} />
                        {formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="Clock" size={13} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="rounded-sm border border-border bg-card px-6 py-10 lg:px-12 lg:py-14">
              <h2 className="max-w-2xl font-heading text-[24px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[28px]">
                Не нашли статью про свою задачу?
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-muted-foreground">
                Опишите её нам — сравним варианты и пришлём короткий список с аргументами.
              </p>
              <a
                href="/#contact"
                className="group mt-8 inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-4 font-heading text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]"
              >
                Получить подбор
                <Icon
                  name="ArrowRight"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
