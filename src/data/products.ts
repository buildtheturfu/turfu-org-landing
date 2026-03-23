export interface Product {
  slug: string;
  layer: 0 | 1 | 2;
  status: 'concept' | 'development' | 'beta' | 'live';
  externalUrl?: string;
  stack?: string[];
}

export const products: Product[] = [
  { slug: 'turfu-org', layer: 0, status: 'live', externalUrl: 'https://turfu.org' },
  {
    slug: 'epis-protocol',
    layer: 1,
    status: 'development',
    stack: ['Solidity', 'Hive', 'Node.js'],
  },
  {
    slug: 'pickr',
    layer: 2,
    status: 'development',
    externalUrl: 'https://pickr.epis.network',
    stack: ['Next.js', 'EPIS SDK', 'Chrome Extension'],
  },
  { slug: 'memo', layer: 2, status: 'concept', stack: ['Next.js', 'EPIS SDK'] },
  {
    slug: 'turfu-labs',
    layer: 2,
    status: 'live',
    externalUrl: 'https://github.com/TURFu-org',
    stack: ['Research', 'Open Science'],
  },
  { slug: 'tcp', layer: 2, status: 'development', stack: ['AI Agents', 'LLM Pipeline'] },
  { slug: 'turfurxiv', layer: 2, status: 'concept' },
  {
    slug: 'nlex',
    layer: 2,
    status: 'live',
    externalUrl: 'https://nlaw.vercel.app',
    stack: ['Next.js', 'Claude Opus', 'Category Theory'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByLayer(layer: 0 | 1 | 2): Product[] {
  return products.filter((p) => p.layer === layer);
}
