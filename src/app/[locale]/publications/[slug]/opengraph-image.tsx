import { ImageResponse } from 'next/og';
import { getPublishedPublication } from '@/lib/publications';

export const runtime = 'edge';
export const alt = 'TURFu Publication';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LAYER_COLORS: Record<number, string> = {
  0: '#7C3AED',
  1: '#0D9488',
  2: '#EA580C',
};
const DEFAULT_ACCENT = '#B45309';

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '\u2026';
}

export default async function OGImage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const publication = await getPublishedPublication(params.locale, params.slug);

  const fontData = await fetch(
    new URL('../../../../../public/fonts/InstrumentSerif-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const accentColor = publication?.layer != null
    ? (LAYER_COLORS[publication.layer] ?? DEFAULT_ACCENT)
    : DEFAULT_ACCENT;

  const title = publication ? truncate(publication.title, 120) : 'TURFu';
  const abstract = publication?.abstract ? truncate(publication.abstract, 180) : '';
  const discipline = publication?.discipline ?? '';

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAF9',
      }}>
        {/* Accent stripe */}
        <div style={{
          display: 'flex',
          width: '100%',
          height: '8px',
          backgroundColor: accentColor,
        }} />

        {/* Content area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '60px',
        }}>
          {/* Title */}
          <div style={{
            display: 'flex',
            fontFamily: 'Instrument Serif',
            fontSize: 52,
            color: '#1C1917',
            lineHeight: 1.15,
            marginBottom: '20px',
          }}>
            {title}
          </div>

          {/* Abstract */}
          {abstract && (
            <div style={{
              display: 'flex',
              fontSize: 24,
              color: '#78716C',
              lineHeight: 1.4,
            }}>
              {abstract}
            </div>
          )}

          {/* Spacer */}
          <div style={{ display: 'flex', flex: 1 }} />

          {/* Bottom bar: discipline pill + TURFu branding */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
            {/* Discipline pill */}
            {discipline ? (
              <div style={{
                display: 'flex',
                backgroundColor: accentColor + '1A',
                color: accentColor,
                fontSize: 16,
                padding: '6px 16px',
                borderRadius: '6px',
              }}>
                {discipline}
              </div>
            ) : (
              <div style={{ display: 'flex' }} />
            )}

            {/* TURFu branding */}
            <div style={{
              display: 'flex',
              fontSize: 20,
              color: '#A8A29E',
              letterSpacing: '0.05em',
            }}>
              TURFu
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Serif',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
