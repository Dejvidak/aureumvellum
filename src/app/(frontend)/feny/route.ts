import { renderDogListPage, getSiteData } from '../../../lib/site'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { femaleDogs } = await getSiteData()
  const html = await renderDogListPage({
    dogs: femaleDogs,
    title: 'Naše chovné feny',
    typeLabel: 'Feny',
    description:
      'Feny, na kterých stavíme chov Aureum Vellum: zdraví, vyrovnaná povaha a laskavý rodinný temperament.',
  })

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
