import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getProductsByLayer } from '@/data/products';
import GridLayout from '@/components/layout/GridLayout';
import { Shield, Rocket, Boxes, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

const layerIcons = [Shield, Rocket, Boxes] as const;

export default async function EcosystemPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('ecosystemPage');

  const layers = [0, 1, 2] as const;

  return (
    <GridLayout className="py-20 md:py-28">
      {/* Editorial header */}
      <div className="max-w-4xl mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold" />
          <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
            Écosystème
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-8">
          {t('title')}
        </h1>
        <p className="font-display italic text-xl md:text-2xl text-ink-secondary leading-snug max-w-3xl">
          {t('subtitle')}
        </p>
      </div>

      {/* Layer overview — editorial rows */}
      <section className="mb-20 border-y border-rule-soft py-2">
        {layers.map((layer) => {
          const Icon = layerIcons[layer];
          return (
            <article
              key={layer}
              className="grid md:grid-cols-[auto_1fr_2fr] gap-8 md:gap-10 items-start py-10 border-t first:border-t-0 border-rule-soft"
            >
              <div className="flex md:flex-col items-center md:items-start gap-4">
                <span className="font-display italic text-5xl md:text-6xl text-gold leading-none">
                  {layer}
                </span>
                <div className="w-10 h-px bg-rule-soft hidden md:block" />
                <Icon size={20} className="text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                {t(`layers.${layer}`)}
              </h2>
              <p className="text-body text-ink-secondary leading-relaxed">
                {t(`layerDescriptions.${layer}`)}
              </p>
            </article>
          );
        })}
      </section>

      {/* Product listing by layer — editorial */}
      {([2, 1, 0] as const).map((layer) => {
        const layerProducts = getProductsByLayer(layer);
        if (layerProducts.length === 0) return null;
        return (
          <section key={layer} className="mb-16">
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-8 bg-gold" />
              <span className="text-caption font-mono uppercase tracking-[0.18em] text-accent">
                Layer {layer} — {t(`layers.${layer}`)}
              </span>
            </div>
            <div className="divide-y divide-rule-soft">
              {layerProducts.map((product, idx) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/ecosystem/${product.slug}`}
                  className="group grid md:grid-cols-[auto_1fr_auto] gap-6 items-start py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors hover:bg-accent-light/40"
                >
                  <span className="font-display italic text-3xl text-gold leading-none mt-1 hidden sm:block">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl text-ink mb-2 leading-tight group-hover:text-accent transition-colors">
                      {t(`products.${product.slug}.name`)}
                    </h3>
                    <p className="text-body text-ink-secondary leading-relaxed mb-3">
                      {t(`products.${product.slug}.tagline`)}
                    </p>
                    <span className="text-caption font-mono uppercase tracking-wider text-ink-tertiary">
                      {t(`status.${product.status}`)}
                    </span>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-ink-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 hidden sm:block"
                  />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </GridLayout>
  );
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ecosystemPage' });
  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}
