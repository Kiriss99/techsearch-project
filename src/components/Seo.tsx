import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://techsearch.poehali.dev';
const DEFAULT_IMAGE = 'https://cdn.poehali.dev/intertnal/img/phl2/og-main-2.webp';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const Seo = ({ title, description, path = '/', image = DEFAULT_IMAGE }: SeoProps) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="TechSearch" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
