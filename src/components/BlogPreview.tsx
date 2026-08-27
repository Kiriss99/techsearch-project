import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SectionHeading from '@/components/SectionHeading';
import { BLOG_POSTS } from '@/data/blog';

const BlogPreview = () => {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Блог"
            title="Разборы техники без маркетинга"
            description="То же самое, что рассказываем в подборе: на что смотреть и где легко переплатить."
          />
          <Link
            to="/blog"
            className="mb-1 inline-flex items-center gap-2 text-[14px] font-medium text-primary transition-colors hover:text-foreground"
          >
            Все статьи
            <Icon name="ArrowRight" size={15} />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
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
              <div className="flex flex-1 flex-col px-6 py-6">
                <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
                  <Icon name={post.icon} size={13} />
                  {post.category}
                </div>
                <h3 className="mt-3 font-heading text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2.5 line-clamp-2 flex-1 text-[13.5px] leading-[1.55] text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
