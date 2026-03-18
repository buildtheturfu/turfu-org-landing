import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getProductsByLayer } from '@/data/products';
import GridLayout from '@/components/layout/GridLayout';
import { PillTag } from '@/components/publications/PillTag';
import { Shield, Rocket, Boxes } from 'lucide-react';
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
    <GridLayout className="py-16">
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
        {t('title')}
      </h1>
      <p className="text-lg text-ink-secondary leading-relaxed mb-16 max-w-3xl">
        {t('subtitle')}
      </p>

      {/* Layer overview cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {layers.map((layer) => {
          const Icon = layerIcons[layer];
          return (
            <div
              key={layer}
              className="relative p-8 rounded-2xl bg-paper border border-border overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-layer-${layer}`} />
              <div className="absolute top-4 right-4 text-6xl font-bold text-ink/5">
                {layer}
              </div>
              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl bg-layer-${layer} flex items-center justify-center mb-6`}
                >
                  <Icon size={28} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2">{t(`layers.${layer}`)}</h2>
                <p className="text-ink-secondary leading-relaxed">
                  {t(`layerDescriptions.${layer}`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product grid by layer */}
      {([2, 1, 0] as const).map((layer) => {
        const layerProducts = getProductsByLayer(layer);
        if (layerProducts.length === 0) return null;
        return (
          <div key={layer} className="mb-12">
            <div className="mb-6">
              <PillTag label={t(`layers.${layer}`)} layer={layer} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {layerProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/ecosystem/${product.slug}`}
                  className="group relative p-6 rounded-2xl bg-paper border border-border overflow-hidden hover:border-accent transition-colors"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-layer-${product.layer}`}
                  />
                  <div className="pt-2">
                    <h3 className="text-xl font-bold mt-3 mb-2 group-hover:text-accent transition-colors">
                      {t(`products.${product.slug}.name`)}
                    </h3>
                    <p className="text-ink-secondary text-body leading-relaxed">
                      {t(`products.${product.slug}.tagline`)}
                    </p>
                    <p className="text-xs text-ink-secondary/60 mt-3">
                      {t(`status.${product.status}`)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
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
