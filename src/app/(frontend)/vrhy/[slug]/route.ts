import { findLitterBySlug, renderLitterPage } from '../../../../lib/site'

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const litter = await findLitterBySlug(slug)

  if (!litter) {
    return new Response('Not found', { status: 404 })
  }

  const html = await renderLitterPage(litter)

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
