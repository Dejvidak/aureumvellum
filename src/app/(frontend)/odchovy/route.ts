import { renderLittersPage } from '../../../lib/site'

export const dynamic = 'force-dynamic'

export async function GET() {
  const html = await renderLittersPage()

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
