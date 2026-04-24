import { findDogBySlug, renderDogPage } from '../../../../lib/site'

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dog = await findDogBySlug(slug)

  if (!dog) {
    return new Response('Not found', { status: 404 })
  }

  const html = await renderDogPage(dog)

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
