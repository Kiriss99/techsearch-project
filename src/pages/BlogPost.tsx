import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Icon from '@/components/ui/icon';
import { BLOG_POSTS, getPostBySlug } from '@/data/blog';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.cover,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'TechSearch' },
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${post.title} — TechSearch`} description={post.description} path={`/blog/${post.slug}`} image={post.cover} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main>
        <section className="relative overflow-hidden pb-14 pt-32 lg:pt-44">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
          <div className="relative mx-auto max-w-[820px] px-5 md:px-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={14} />
              Все статьи
            </Link>

            <div className="mt-8 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
              <Icon name={post.icon} size={14} />
              {post.category}
            </div>

            <h1 className="mt-5 font-heading text-[28px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[36px] lg:text-[44px]">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-4 text-[13px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="Calendar" size={14} />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="Clock" size={14} />
                {post.readTime}
              </span>
            </div>

            <div className="mt-9 aspect-[16/9] w-full overflow-hidden rounded-sm border border-border bg-secondary">
              <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-[820px] px-5 md:px-10">
            <article className="space-y-7">
              {post.content.map((block, i) => (
                <div key={i}>
                  {block.heading && (
                    <h2 className="mb-4 font-heading text-[21px] font-bold tracking-[-0.02em] sm:text-[24px]">
                      {block.heading}
                    </h2>
                  )}
                  {block.text && (
                    <p className="text-[16px] leading-[1.75] text-muted-foreground">{block.text}</p>
                  )}
                  {block.list && (
                    <ul className="mt-4 space-y-3">
                      {block.list.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Icon name="Check" size={15} className="mt-1 shrink-0 text-primary" />
                          <span className="text-[16px] leading-[1.6] text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>

            <div className="mt-14 rounded-sm border border-border bg-card px-6 py-8 lg:px-9 lg:py-10">
              <h2 className="font-heading text-[20px] font-bold tracking-[-0.02em]">
                Нужна помощь с конкретной моделью?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                Опишите задачу и бюджет — сравним варианты и пришлём короткий список с
                аргументами и ссылками.
              </p>
              <a
                href="/#contact"
                className="group mt-7 inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-3.5 font-heading text-[14px] font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_hsl(var(--primary)/0.32)]"
              >
                Получить подбор
                <Icon
                  name="ArrowRight"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {more.length > 0 && (
              <div className="mt-16">
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Читайте также
                </p>
                <div className="mt-5 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                  {more.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/blog/${p.slug}`}
                      className="group flex flex-col bg-card px-6 py-6 transition-colors hover:bg-secondary"
                    >
                      <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
                        <Icon name={p.icon} size={13} />
                        {p.category}
                      </span>
                      <span className="mt-3 font-heading text-[15px] font-semibold leading-[1.4] text-foreground">
                        {p.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
