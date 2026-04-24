import { renderDogListPage, getSiteData } from '../../../lib/site'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { maleDogs } = await getSiteData()
  const html = await renderDogListPage({
    dogs: maleDogs,
    title: 'Krycí psi',
    typeLabel: 'Psi',
    description:
      'Přehled psů s důrazem na zdraví, povahu, typický exteriér a vhodnost pro plánovaná spojení.',
  })

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
