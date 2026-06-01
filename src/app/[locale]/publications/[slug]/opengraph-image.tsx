import { ImageResponse } from 'next/og';
import { getPublishedPublication } from '@/lib/publications';

export const runtime = 'edge';
export const alt = 'TURFu Publication';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LAYER_COLORS: Record<number, string> = {
  0: '#4a6488',
  1: '#1f3a5f',
  2: '#a07a32',
};
const DEFAULT_ACCENT = '#1f3a5f';

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
        backgroundColor: '#fbf8f1',
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
            color: '#14161b',
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
              color: '#2d2f37',
              fontStyle: 'italic',
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
                border: `1px solid ${accentColor}`,
                color: accentColor,
                fontSize: 14,
                padding: '4px 12px',
                borderRadius: '2px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
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
              color: '#6a6757',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
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
