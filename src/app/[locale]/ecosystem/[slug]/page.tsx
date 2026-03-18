import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/data/products';
import { locales } from '@/i18n';
import ProseLayout from '@/components/layout/ProseLayout';
import { PillTag } from '@/components/publications/PillTag';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return products.flatMap((product) =>
    locales.map((locale) => ({
      locale,
      slug: product.slug,
    }))
  );
}

export default async function ProductDetailPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const t = await getTranslations('ecosystemPage');

  return (
    <ProseLayout className="py-16">
      <Link
        href={`/${locale}/ecosystem`}
        className="inline-flex items-center gap-2 text-ink-secondary hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        {t('productDetail.backToEcosystem')}
      </Link>

      <div className="mb-6">
        <PillTag label={t(`layers.${product.layer}`)} layer={product.layer} />
      </div>

      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
        {t(`products.${slug}.name`)}
      </h1>
      <p className="text-lg text-ink-secondary leading-relaxed mb-12">
        {t(`products.${slug}.tagline`)}
      </p>

      <section className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-ink mb-3">
          {t('productDetail.problem')}
        </h2>
        <p className="text-body text-ink-secondary leading-relaxed">
          {t(`products.${slug}.problem`)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-ink mb-3">
          {t('productDetail.solution')}
        </h2>
        <p className="text-body text-ink-secondary leading-relaxed">
          {t(`products.${slug}.solution`)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-ink mb-3">
          {t('productDetail.status')}
        </h2>
        <PillTag label={t(`status.${product.status}`)} layer={product.layer} />
      </section>

      {product.stack && product.stack.length > 0 && (
        <section className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-ink mb-3">
            {t('productDetail.stack')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.stack.map((tech) => (
              <span
                key={tech}
                className="inline-block px-3 py-1 text-sm rounded-lg bg-paper-depth text-ink-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {product.externalUrl && (
        <div className="mt-12">
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
          >
            {t('productDetail.visit')}
            <ExternalLink size={16} />
          </a>
        </div>
      )}
    </ProseLayout>
  );
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not Found' };

  const t = await getTranslations({ locale, namespace: 'ecosystemPage' });
  return {
    title: t(`products.${slug}.name`),
    description: t(`products.${slug}.tagline`),
  };
}
