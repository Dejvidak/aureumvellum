import config from '@payload-config'
import { getPayload } from 'payload'

const REQUIRED_FIELDS = ['name', 'email', 'phone', 'home', 'experience', 'expectation'] as const

function normalizeValue(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const data = {
    name: normalizeValue(formData.get('name')),
    email: normalizeValue(formData.get('email')),
    phone: normalizeValue(formData.get('phone')),
    litter: normalizeValue(formData.get('litter')),
    home: normalizeValue(formData.get('home')),
    experience: normalizeValue(formData.get('experience')),
    expectation: normalizeValue(formData.get('expectation')),
    consent: formData.get('consent') === 'on',
    source: 'web',
    status: 'new' as const,
  }

  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      return Response.json({ error: 'Chybí povinné pole formuláře.' }, { status: 400 })
    }
  }

  if (!data.consent) {
    return Response.json({ error: 'Je potřeba potvrdit souhlas se zpracováním údajů.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'inquiries',
      data,
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Poptávku se nepodařilo uložit. Zkuste to prosím znovu.' }, { status: 500 })
  }
}
