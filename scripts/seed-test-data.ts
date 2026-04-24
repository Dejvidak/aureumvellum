import config from '../src/payload.config'
import { getPayload } from 'payload'

type DogSeed = {
  color: string
  dateOfBirth: string
  description: string
  dogType: 'female' | 'male' | 'offspring'
  headline: string
  name: string
  published: boolean
  slug: string
  status: 'active' | 'planned' | 'archived'
  summary: string
}

type LitterSeed = {
  availablePuppies: number
  birthDate?: string
  expectedDate?: string
  headline: string
  motherSlug: string
  fatherSlug: string
  name: string
  published: boolean
  puppyCount: number
  puppySlugs: string[]
  slug: string
  status: 'planned' | 'expected' | 'born' | 'archived'
  story: string
  summary: string
  updates: Array<{
    date: string
    text: string
    title: string
  }>
}

const dogs: DogSeed[] = [
  {
    name: 'Amelie Aureum',
    slug: 'amelie-aureum',
    dogType: 'female',
    status: 'active',
    headline: 'Jemná a kontaktní chovná fena',
    summary: 'Vyrovnaná fena s příjemnou povahou, rodinným temperamentem a chutí spolupracovat.',
    description:
      'Amelie je klidná, velmi kontaktní fena se stabilní povahou. Hodí se jako testovací profil pro chovnou fenku na webu i v administraci.',
    dateOfBirth: '2022-04-14T00:00:00.000Z',
    color: 'světlá zlatá',
    published: true,
  },
  {
    name: 'Bruno Golden Vale',
    slug: 'bruno-golden-vale',
    dogType: 'male',
    status: 'active',
    headline: 'Vyrovnaný krycí pes',
    summary: 'Krycí pes s laskavou povahou, pěkným exteriérem a stabilním temperamentem.',
    description:
      'Bruno slouží jako testovací profil krycího psa. Má dostatek textu pro ověření výpisů, detailu a vztahů k vrhům.',
    dateOfBirth: '2021-11-02T00:00:00.000Z',
    color: 'zlatá',
    published: true,
  },
  {
    name: 'Bella Aureum Vellum',
    slug: 'bella-aureum-vellum',
    dogType: 'offspring',
    status: 'active',
    headline: 'Zvědavá fenka z vrhu A',
    summary: 'Mladá fenka z testovacího vrhu s přátelskou povahou a pěkným výrazem.',
    description:
      'Bella je ukázkový záznam odchovance pro testování propojení vrhu se štěňaty a budoucí výpisy odchovů.',
    dateOfBirth: '2026-07-08T00:00:00.000Z',
    color: 'světlá zlatá',
    published: true,
  },
  {
    name: 'Ben Aureum Vellum',
    slug: 'ben-aureum-vellum',
    dogType: 'offspring',
    status: 'active',
    headline: 'Klidný pejsek z vrhu A',
    summary: 'Testovací odchovanec vhodný pro párování do vrhu a budoucí přehled štěňat.',
    description:
      'Ben doplňuje Bellu jako druhý ukázkový odchovanec, aby bylo možné v administraci testovat více propojených položek.',
    dateOfBirth: '2026-07-08T00:00:00.000Z',
    color: 'zlatá',
    published: true,
  },
  {
    name: 'Clara Aureum',
    slug: 'clara-aureum',
    dogType: 'female',
    status: 'planned',
    headline: 'Plánovaná budoucí chovná fena',
    summary: 'Ukázkový profil ve stavu plánováno pro testování filtrů a stavů.',
    description:
      'Clara je připravená jako testovací záznam ve stavu plánováno, aby bylo možné ověřit filtrování a budoucí workflow.',
    dateOfBirth: '2024-03-21T00:00:00.000Z',
    color: 'krémová',
    published: true,
  },
]

const litters: LitterSeed[] = [
  {
    name: 'Vrh A',
    slug: 'vrh-a-2026',
    status: 'born',
    headline: 'Letní vrh Amelie a Bruna',
    summary: 'Ukázkový vrh s narozenými štěňaty pro testování výpisů, vztahů a aktualizací.',
    story:
      'Tento testovací vrh slouží k ověření práce s vrhy v administraci. Obsahuje rodiče, štěňata, počty i krátké aktuality.',
    motherSlug: 'amelie-aureum',
    fatherSlug: 'bruno-golden-vale',
    birthDate: '2026-07-08T00:00:00.000Z',
    puppyCount: 2,
    availablePuppies: 1,
    puppySlugs: ['bella-aureum-vellum', 'ben-aureum-vellum'],
    published: true,
    updates: [
      {
        title: 'Štěňata jsou na světě',
        date: '2026-07-08T00:00:00.000Z',
        text: 'Vrh A byl úspěšně narozen a oba testovací odchovanci jsou vloženi v administraci.',
      },
      {
        title: 'Začínáme socializaci',
        date: '2026-07-29T00:00:00.000Z',
        text: 'Štěňata si postupně zvykají na domácí prostředí, zvuky a kontakt s lidmi.',
      },
    ],
  },
  {
    name: 'Podzimní vrh 2026',
    slug: 'podzimni-vrh-2026',
    status: 'expected',
    headline: 'Plánovaný podzimní vrh',
    summary: 'Druhý testovací vrh pro ověření stavu očekáváno a práce s plánovanými záznamy.',
    story:
      'Tento záznam představuje budoucí vrh, aby bylo možné testovat rozdílné stavy a plánovaný obsah na webu i v adminu.',
    motherSlug: 'clara-aureum',
    fatherSlug: 'bruno-golden-vale',
    expectedDate: '2026-10-20T00:00:00.000Z',
    puppyCount: 0,
    availablePuppies: 0,
    puppySlugs: [],
    published: true,
    updates: [
      {
        title: 'Přijímáme předběžné rezervace',
        date: '2026-08-20T00:00:00.000Z',
        text: 'Vrh je zatím v přípravě a slouží hlavně jako testovací záznam pro administraci.',
      },
    ],
  },
]

async function upsertDog(payload: Awaited<ReturnType<typeof getPayload>>, dog: DogSeed) {
  const existing = await payload.find({
    collection: 'dogs',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: dog.slug,
      },
    },
  })

  const data = {
    ...dog,
  }

  if (existing.docs[0]) {
    return payload.update({
      collection: 'dogs',
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection: 'dogs',
    data,
  })
}

async function upsertLitter(
  payload: Awaited<ReturnType<typeof getPayload>>,
  litter: LitterSeed,
  dogIdsBySlug: Map<string, number>,
) {
  const existing = await payload.find({
    collection: 'litters',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: litter.slug,
      },
    },
  })

  const motherId = dogIdsBySlug.get(litter.motherSlug)
  const fatherId = dogIdsBySlug.get(litter.fatherSlug)

  if (typeof motherId !== 'number' || typeof fatherId !== 'number') {
    throw new Error(`Missing parent dog for litter ${litter.slug}`)
  }

  const puppyIds = litter.puppySlugs
    .map((slug) => dogIdsBySlug.get(slug))
    .filter((id): id is number => typeof id === 'number')

  const data = {
    name: litter.name,
    slug: litter.slug,
    status: litter.status,
    headline: litter.headline,
    summary: litter.summary,
    story: litter.story,
    mother: motherId,
    father: fatherId,
    birthDate: litter.birthDate,
    expectedDate: litter.expectedDate,
    puppyCount: litter.puppyCount,
    availablePuppies: litter.availablePuppies,
    puppies: puppyIds,
    updates: litter.updates,
    published: litter.published,
  }

  if (existing.docs[0]) {
    return payload.update({
      collection: 'litters',
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection: 'litters',
    data,
  })
}

async function main() {
  const payload = await getPayload({
    config,
  })

  const dogIdsBySlug = new Map<string, number>()

  for (const dog of dogs) {
    const saved = await upsertDog(payload, dog)
    dogIdsBySlug.set(dog.slug, saved.id)
  }

  await payload.update({
    collection: 'dogs',
    id: dogIdsBySlug.get('bella-aureum-vellum')!,
    data: {
      mother: dogIdsBySlug.get('amelie-aureum'),
      father: dogIdsBySlug.get('bruno-golden-vale'),
    },
  })

  await payload.update({
    collection: 'dogs',
    id: dogIdsBySlug.get('ben-aureum-vellum')!,
    data: {
      mother: dogIdsBySlug.get('amelie-aureum'),
      father: dogIdsBySlug.get('bruno-golden-vale'),
    },
  })

  for (const litter of litters) {
    await upsertLitter(payload, litter, dogIdsBySlug)
  }

  console.log(`Seeded ${dogs.length} psi and ${litters.length} vrhy for testing.`)
}

void main()
