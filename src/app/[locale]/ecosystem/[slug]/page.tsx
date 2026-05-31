import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/data/products';
import { locales } from '@/i18n';
import ProseLayout from '@/components/layout/ProseLayout';
import { ExternalLink } from 'lucide-react';
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
    })),
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
    <ProseLayout className="py-20 md:py-28">
      <Link
        href={`/${locale}/ecosystem`}
        className="group inline-flex items-center gap-3 text-ink-tertiary hover:text-accent text-body-sm mb-12 transition-colors"
      >
        <span className="h-px w-6 bg-gold transition-all group-hover:w-10" />
        {t('productDetail.backToEcosystem')}
      </Link>

      {/* Editorial header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            Layer {product.layer} — {t(`layers.${product.layer}`)}
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05] mb-6">
          {t(`products.${slug}.name`)}
        </h1>
        <p className="font-display italic text-xl md:text-2xl text-ink-secondary leading-snug max-w-3xl">
          {t(`products.${slug}.tagline`)}
        </p>
      </div>

      <div className="divide-y divide-rule-soft border-y border-rule-soft">
        <section className="py-10 grid md:grid-cols-[12rem_1fr] gap-4 md:gap-10">
          <div className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('productDetail.problem')}
          </div>
          <p className="text-body text-ink-secondary leading-relaxed">
            {t(`products.${slug}.problem`)}
          </p>
        </section>

        <section className="py-10 grid md:grid-cols-[12rem_1fr] gap-4 md:gap-10">
          <div className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('productDetail.solution')}
          </div>
          <p className="text-body text-ink-secondary leading-relaxed">
            {t(`products.${slug}.solution`)}
          </p>
        </section>

        <section className="py-10 grid md:grid-cols-[12rem_1fr] gap-4 md:gap-10">
          <div className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            {t('productDetail.status')}
          </div>
          <span className="inline-block self-start px-3 py-1 border border-gold text-gold bg-gold-light/40 rounded-sm text-caption font-mono uppercase tracking-wider">
            {t(`status.${product.status}`)}
          </span>
        </section>

        {product.stack && product.stack.length > 0 && (
          <section className="py-10 grid md:grid-cols-[12rem_1fr] gap-4 md:gap-10">
            <div className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
              {t('productDetail.stack')}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {product.stack.map((tech, i) => (
                <span key={tech} className="flex items-center gap-2">
                  {i > 0 && <span className="text-rule text-caption">·</span>}
                  <span className="text-caption text-ink-secondary italic font-mono">{tech}</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {product.externalUrl && (
        <div className="mt-16">
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-paper font-medium rounded-sm hover:bg-accent-hover transition-colors"
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
