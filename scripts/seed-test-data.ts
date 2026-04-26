import config from '../src/payload.config'
import { getPayload } from 'payload'

type DogType = 'female' | 'male' | 'offspring'
type DogStatus = 'active' | 'planned' | 'archived'
type LitterStatus = 'planned' | 'expected' | 'born' | 'archived'

type HealthTestSeed = {
  notes?: string
  result: string
  testName: string
}

type DogSeed = {
  color: string
  dateOfBirth: string
  description: string
  dogType: DogType
  fatherSlug?: string
  headline: string
  healthTests: HealthTestSeed[]
  motherSlug?: string
  name: string
  published: boolean
  slug: string
  status: DogStatus
  summary: string
  titlesAndAwards: string[]
}

type LitterSeed = {
  availablePuppies: number
  birthDate?: string
  expectedDate?: string
  fatherSlug: string
  headline: string
  motherSlug: string
  name: string
  published: boolean
  puppyCount: number
  puppySlugs: string[]
  slug: string
  status: LitterStatus
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
    headline: 'Jemná a vyrovnaná chovná fena',
    summary:
      'Rodinně založená fenka s klidnou hlavou, příjemným výrazem a výbornou spoluprací v běžném životě.',
    description:
      'Amelie je hlavní fenou chovu Aureum Vellum. Během posledního roku byla aktivně prezentovaná na webu, v administraci má kompletní profil, zdravotní testy i vazby na odchovy.',
    dateOfBirth: '2022-04-14T00:00:00.000Z',
    color: 'světlá zlatá',
    published: true,
    healthTests: [
      { testName: 'DKK', result: 'A/A' },
      { testName: 'DLK', result: '0/0' },
      { testName: 'Oči', result: 'prosté dědičných vad', notes: 'vyšetření 2025' },
      { testName: 'PRA1/PRA2', result: 'clear' },
    ],
    titlesAndAwards: ['Výborná 1', 'CAC', 'Klubová výstava 2025'],
  },
  {
    name: 'Clara Aureum',
    slug: 'clara-aureum',
    dogType: 'female',
    status: 'active',
    headline: 'Mladá fenka v přípravě do chovu',
    summary:
      'Perspektivní fenka se světlou barvou, milou povahou a pěkným pohybem, která během roku přešla z plánované do aktivní sekce.',
    description:
      'Clara slouží jako druhá aktivní fenka v databázi. Má dost dat na testování filtrování, detailů i budoucího plánovaného vrhu.',
    dateOfBirth: '2024-03-21T00:00:00.000Z',
    color: 'krémová',
    published: true,
    healthTests: [
      { testName: 'DKK', result: 'A/A' },
      { testName: 'DLK', result: '0/0' },
      { testName: 'DNA panel', result: 'clear by parentage' },
    ],
    titlesAndAwards: ['Velmi nadějná 1', 'Oblastní výstava mladých 2025'],
  },
  {
    name: 'Daisy Sun Meadow',
    slug: 'daisy-sun-meadow',
    dogType: 'female',
    status: 'archived',
    headline: 'Archivovaná zakladatelská fena',
    summary:
      'Starší fenka ponechaná v databázi jako historický profil, aby web působil jako dlouhodobě používaný.',
    description:
      'Daisy je archivovaný profil zakladatelské feny. Pomáhá simulovat web, který už delší dobu funguje a uchovává historii chovu.',
    dateOfBirth: '2018-05-10T00:00:00.000Z',
    color: 'zlatá',
    published: true,
    healthTests: [
      { testName: 'DKK', result: 'A/A' },
      { testName: 'DLK', result: '0/0' },
      { testName: 'Oči', result: 'čisté' },
    ],
    titlesAndAwards: ['Výborná 2', 'Res. CAC'],
  },
  {
    name: 'Bruno Golden Vale',
    slug: 'bruno-golden-vale',
    dogType: 'male',
    status: 'active',
    headline: 'Vyrovnaný krycí pes s pevným zdravím',
    summary:
      'Krycí pes s laskavou povahou, pěkným exteriérem a stabilním temperamentem, pravidelně využívaný v profilech i vrzích.',
    description:
      'Bruno je hlavní krycí pes v databázi. Má vazby na více vrhů a je ideální pro testování rodičovských vztahů napříč webem.',
    dateOfBirth: '2021-11-02T00:00:00.000Z',
    color: 'zlatá',
    published: true,
    healthTests: [
      { testName: 'DKK', result: 'A/A' },
      { testName: 'DLK', result: '0/0' },
      { testName: 'Srdce', result: 'bez nálezu' },
      { testName: 'ICT-A', result: 'clear' },
    ],
    titlesAndAwards: ['Výborný 1', 'CAC', 'BOB'],
  },
  {
    name: 'Aron Silver Brook',
    slug: 'aron-silver-brook',
    dogType: 'male',
    status: 'active',
    headline: 'Druhý krycí pes pro plánovaná spojení',
    summary:
      'Aktivní pes vedený v databázi pro plánovaná i budoucí spojení, vhodný pro testování více aktivních psů ve výpisu.',
    description:
      'Aron doplňuje Bruna jako druhý aktivní pes, aby sekce krycích psů nepůsobila prázdně a šly ověřit různé scénáře filtrování.',
    dateOfBirth: '2020-08-18T00:00:00.000Z',
    color: 'středně zlatá',
    published: true,
    healthTests: [
      { testName: 'DKK', result: 'A/A' },
      { testName: 'DLK', result: '0/0' },
      { testName: 'Oči', result: 'prosté vad' },
      { testName: 'DNA panel', result: 'clear' },
    ],
    titlesAndAwards: ['Výborný 1', 'CAC ČMKU'],
  },
  {
    name: 'Bella Aureum Vellum',
    slug: 'bella-aureum-vellum',
    dogType: 'offspring',
    status: 'active',
    headline: 'Kontaktní fenka z jarního vrhu',
    summary:
      'Odchovankyně z jarního vrhu 2025, která je vedená jako ukázkový profil mladého psa s propojením na vrh a rodiče.',
    description:
      'Bella představuje odchovankyni, která na webu zůstává i po odchodu do nového domova. Má záznamy vhodné pro testování sekce odchovů.',
    dateOfBirth: '2025-04-12T00:00:00.000Z',
    color: 'světlá zlatá',
    motherSlug: 'amelie-aureum',
    fatherSlug: 'bruno-golden-vale',
    published: true,
    healthTests: [{ testName: 'Kontrola štěněte', result: 'bez výhrad' }],
    titlesAndAwards: ['Nejhezčí štěně třídy dorostu'],
  },
  {
    name: 'Ben Aureum Vellum',
    slug: 'ben-aureum-vellum',
    dogType: 'offspring',
    status: 'active',
    headline: 'Klidný pejsek z jarního vrhu',
    summary:
      'Mladý pes z vrhu A, který pomáhá simulovat reálný odchov s více sourozenci a samostatnými profily.',
    description:
      'Ben je druhý záznam z téhož vrhu a doplňuje Bellu jako sourozenec. Díky tomu databáze působí jako skutečně používaná během celého roku.',
    dateOfBirth: '2025-04-12T00:00:00.000Z',
    color: 'zlatá',
    motherSlug: 'amelie-aureum',
    fatherSlug: 'bruno-golden-vale',
    published: true,
    healthTests: [{ testName: 'Kontrola štěněte', result: 'bez výhrad' }],
    titlesAndAwards: ['Velmi nadějný 1'],
  },
  {
    name: 'Cora Aureum Vellum',
    slug: 'cora-aureum-vellum',
    dogType: 'offspring',
    status: 'active',
    headline: 'Živá fenka z letního vrhu',
    summary:
      'Fenka z letního vrhu 2025, kterou lze využít v přehledu odchovů i při testování rodokmenových vazeb.',
    description:
      'Cora byla přidaná do databáze během léta a má vlastní aktualizace navázané na vrh i rodiče.',
    dateOfBirth: '2025-08-02T00:00:00.000Z',
    color: 'krémová',
    motherSlug: 'amelie-aureum',
    fatherSlug: 'aron-silver-brook',
    published: true,
    healthTests: [{ testName: 'Kontrola štěněte', result: 'bez výhrad' }],
    titlesAndAwards: ['Miláček návštěvníků'],
  },
  {
    name: 'Cyril Aureum Vellum',
    slug: 'cyril-aureum-vellum',
    dogType: 'offspring',
    status: 'active',
    headline: 'Silný pejsek z letního vrhu',
    summary:
      'Bráška Cory ze stejného vrhu, vhodný pro realistické naplnění databáze odchovanců a vrhů.',
    description:
      'Cyril představuje další odchov, který pomáhá webu působit jako aktivně používaný přes více vrhů a více sourozenců.',
    dateOfBirth: '2025-08-02T00:00:00.000Z',
    color: 'zlatá',
    motherSlug: 'amelie-aureum',
    fatherSlug: 'aron-silver-brook',
    published: true,
    healthTests: [{ testName: 'Kontrola štěněte', result: 'bez výhrad' }],
    titlesAndAwards: ['Velmi nadějný pes'],
  },
  {
    name: 'Dita Aureum Vellum',
    slug: 'dita-aureum-vellum',
    dogType: 'offspring',
    status: 'active',
    headline: 'Zimní fenka s jemnou povahou',
    summary:
      'Odchovankyně z přelomu roku, vhodná pro simulaci novějších záznamů v databázi a pokračující aktivity webu.',
    description:
      'Dita je jedním z mladších záznamů, který pomáhá vytvořit dojem, že web byl pravidelně doplňován i během zimy.',
    dateOfBirth: '2025-12-14T00:00:00.000Z',
    color: 'světlá zlatá',
    motherSlug: 'clara-aureum',
    fatherSlug: 'bruno-golden-vale',
    published: true,
    healthTests: [{ testName: 'Kontrola štěněte', result: 'bez výhrad' }],
    titlesAndAwards: ['Nejhezčí fenka vrhu'],
  },
  {
    name: 'Dorian Aureum Vellum',
    slug: 'dorian-aureum-vellum',
    dogType: 'offspring',
    status: 'active',
    headline: 'Mladý pes z přelomu roku',
    summary:
      'Sourozenec Dity, který rozšiřuje databázi o další realistický záznam s aktivním stavem a vazbou na vrh.',
    description:
      'Dorian doplňuje zimní vrh a pomáhá vytvořit souvislou historii odchovů napříč několika obdobími roku.',
    dateOfBirth: '2025-12-14T00:00:00.000Z',
    color: 'středně zlatá',
    motherSlug: 'clara-aureum',
    fatherSlug: 'bruno-golden-vale',
    published: true,
    healthTests: [{ testName: 'Kontrola štěněte', result: 'bez výhrad' }],
    titlesAndAwards: ['Velmi nadějný 1'],
  },
  {
    name: 'Ema Aureum Vellum',
    slug: 'ema-aureum-vellum',
    dogType: 'offspring',
    status: 'planned',
    headline: 'Rezervovaná fenka z očekávaného vrhu',
    summary:
      'Předpřipravený testovací záznam pro očekávaný vrh, který simuluje práci s plánovaným obsahem.',
    description:
      'Ema zatím patří do plánované části databáze. Profil existuje pro testování situace, kdy se štěňata připravují dopředu.',
    dateOfBirth: '2026-05-30T00:00:00.000Z',
    color: 'krémová',
    motherSlug: 'clara-aureum',
    fatherSlug: 'aron-silver-brook',
    published: true,
    healthTests: [],
    titlesAndAwards: [],
  },
  {
    name: 'Egon Aureum Vellum',
    slug: 'egon-aureum-vellum',
    dogType: 'offspring',
    status: 'planned',
    headline: 'Plánovaný pejsek z očekávaného vrhu',
    summary:
      'Druhý předpřipravený záznam k očekávanému vrhu, aby se dala testovat práce s budoucími štěňaty.',
    description:
      'Egon doplňuje Emu jako sourozenec v plánovaném vrhu a rozšiřuje databázi o další realistický scénář.',
    dateOfBirth: '2026-05-30T00:00:00.000Z',
    color: 'zlatá',
    motherSlug: 'clara-aureum',
    fatherSlug: 'aron-silver-brook',
    published: true,
    healthTests: [],
    titlesAndAwards: [],
  },
]

const litters: LitterSeed[] = [
  {
    name: 'Vrh A',
    slug: 'vrh-a-2025',
    status: 'archived',
    headline: 'Jarní vrh Amelie a Bruna',
    summary:
      'První větší vrh z minulého jara, dnes už archivovaný, ale stále veřejně zobrazený jako součást historie chovu.',
    story:
      'Vrh A byl na webu aktivní během jara 2025. Po odchodu štěňat do nových domovů zůstal uložený v databázi jako archivovaný vrh s historií a aktualizacemi.',
    motherSlug: 'amelie-aureum',
    fatherSlug: 'bruno-golden-vale',
    birthDate: '2025-04-12T00:00:00.000Z',
    puppyCount: 2,
    availablePuppies: 0,
    puppySlugs: ['bella-aureum-vellum', 'ben-aureum-vellum'],
    published: true,
    updates: [
      {
        title: 'Štěňata se narodila',
        date: '2025-04-12T00:00:00.000Z',
        text: 'Jarní vrh dorazil na svět bez komplikací a první fotky byly přidané na web během prvního týdne.',
      },
      {
        title: 'První návštěvy rodin',
        date: '2025-05-03T00:00:00.000Z',
        text: 'Zájemci začali jezdit na první návštěvy a vrh se rychle zaplnil rezervacemi.',
      },
      {
        title: 'Odchod do nových domovů',
        date: '2025-06-08T00:00:00.000Z',
        text: 'Bella i Ben odešli do svých rodin a vrh byl přesunut do archivní sekce.',
      },
    ],
  },
  {
    name: 'Vrh B',
    slug: 'vrh-b-2025',
    status: 'archived',
    headline: 'Letní vrh Amelie a Arona',
    summary:
      'Druhý vrh roku 2025, vedený v archivu s historií odchovu a dvěma aktivně zobrazenými odchovanci.',
    story:
      'Letní vrh navázal na úspěšné jaro a během sezony přinesl další pravidelné aktualizace, galerii a nové profily odchovanců.',
    motherSlug: 'amelie-aureum',
    fatherSlug: 'aron-silver-brook',
    birthDate: '2025-08-02T00:00:00.000Z',
    puppyCount: 2,
    availablePuppies: 0,
    puppySlugs: ['cora-aureum-vellum', 'cyril-aureum-vellum'],
    published: true,
    updates: [
      {
        title: 'Porod proběhl v klidu',
        date: '2025-08-02T00:00:00.000Z',
        text: 'Amelie zvládla porod výborně a oba sourozenci prosperují od prvních dní.',
      },
      {
        title: 'Začínáme socializaci',
        date: '2025-08-26T00:00:00.000Z',
        text: 'Štěňata poznávají zahradu, běžný ruch domácnosti a první návštěvy.',
      },
      {
        title: 'Vržená sekce uzavřena',
        date: '2025-09-21T00:00:00.000Z',
        text: 'Po odchodu štěňat do rodin zůstal vrh dostupný jako archiv s odkazy na odchovance.',
      },
    ],
  },
  {
    name: 'Zimní vrh 2025',
    slug: 'zimni-vrh-2025',
    status: 'born',
    headline: 'Zimní vrh Clary a Bruna',
    summary:
      'Aktuálnější vrh z přelomu roku, který stále působí živě a tvoří hlavní obsah v sekci odchovů.',
    story:
      'Zimní vrh byl na webu intenzivně aktualizovaný od prosince do února. Má čerstvé záznamy, odchovance i aktivní stav v databázi.',
    motherSlug: 'clara-aureum',
    fatherSlug: 'bruno-golden-vale',
    birthDate: '2025-12-14T00:00:00.000Z',
    puppyCount: 2,
    availablePuppies: 1,
    puppySlugs: ['dita-aureum-vellum', 'dorian-aureum-vellum'],
    published: true,
    updates: [
      {
        title: 'Narodila se dvě štěňata',
        date: '2025-12-14T00:00:00.000Z',
        text: 'První vrh Clary proběhl bez komplikací a přinesl jednu fenku a jednoho psa.',
      },
      {
        title: 'První Vánoce ve vrhu',
        date: '2025-12-24T00:00:00.000Z',
        text: 'Na web byly přidané sváteční fotky a první krátká novinka pro rodiny i návštěvníky.',
      },
      {
        title: 'Jedno štěně je ještě volné',
        date: '2026-01-25T00:00:00.000Z',
        text: 'V administraci i na webu byl aktualizovaný počet volných štěňat na jedno.',
      },
    ],
  },
  {
    name: 'Jarní vrh 2026',
    slug: 'jarni-vrh-2026',
    status: 'expected',
    headline: 'Očekávaný jarní vrh Clary a Arona',
    summary:
      'Plánovaný vrh pro nadcházející sezonu, připravený v databázi včetně předběžných profilů a aktualit.',
    story:
      'Jarní vrh 2026 je v administraci připravený dopředu, aby web působil jako aktivně spravovaný i v období očekávání nových štěňat.',
    motherSlug: 'clara-aureum',
    fatherSlug: 'aron-silver-brook',
    expectedDate: '2026-05-30T00:00:00.000Z',
    puppyCount: 2,
    availablePuppies: 2,
    puppySlugs: ['ema-aureum-vellum', 'egon-aureum-vellum'],
    published: true,
    updates: [
      {
        title: 'Přijímáme předběžné rezervace',
        date: '2026-03-18T00:00:00.000Z',
        text: 'Na web byla přidaná možnost hlásit se s předběžným zájmem o očekávaný vrh.',
      },
      {
        title: 'Doplněné plánované profily štěňat',
        date: '2026-04-10T00:00:00.000Z',
        text: 'Do administrace byly připravené testovací profily budoucích štěňat pro ověření workflow.',
      },
    ],
  },
]

function mapTitles(titles: string[]) {
  return titles.map((title) => ({ title }))
}

function mapHealthTests(tests: HealthTestSeed[]) {
  return tests.map((test) => ({
    testName: test.testName,
    result: test.result,
    notes: test.notes,
  }))
}

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
    name: dog.name,
    slug: dog.slug,
    dogType: dog.dogType,
    status: dog.status,
    headline: dog.headline,
    summary: dog.summary,
    description: dog.description,
    dateOfBirth: dog.dateOfBirth,
    color: dog.color,
    healthTests: mapHealthTests(dog.healthTests),
    titlesAndAwards: mapTitles(dog.titlesAndAwards),
    published: dog.published,
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

async function updateDogParents(
  payload: Awaited<ReturnType<typeof getPayload>>,
  dog: DogSeed,
  dogIdsBySlug: Map<string, number>,
) {
  if (!dog.motherSlug && !dog.fatherSlug) {
    return
  }

  const dogId = dogIdsBySlug.get(dog.slug)
  if (typeof dogId !== 'number') {
    throw new Error(`Missing saved dog ${dog.slug}`)
  }

  await payload.update({
    collection: 'dogs',
    id: dogId,
    data: {
      mother: dog.motherSlug ? dogIdsBySlug.get(dog.motherSlug) : undefined,
      father: dog.fatherSlug ? dogIdsBySlug.get(dog.fatherSlug) : undefined,
    },
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
  const payload = await getPayload({ config })
  const dogIdsBySlug = new Map<string, number>()
  const desiredDogSlugs = new Set(dogs.map((dog) => dog.slug))
  const desiredLitterSlugs = new Set(litters.map((litter) => litter.slug))

  const existingDogs = await payload.find({
    collection: 'dogs',
    limit: 200,
    pagination: false,
  })

  for (const dog of existingDogs.docs) {
    if (!desiredDogSlugs.has(dog.slug)) {
      await payload.delete({
        collection: 'dogs',
        id: dog.id,
      })
    }
  }

  const existingLitters = await payload.find({
    collection: 'litters',
    limit: 200,
    pagination: false,
  })

  for (const litter of existingLitters.docs) {
    if (!desiredLitterSlugs.has(litter.slug)) {
      await payload.delete({
        collection: 'litters',
        id: litter.id,
      })
    }
  }

  for (const dog of dogs) {
    const saved = await upsertDog(payload, dog)
    dogIdsBySlug.set(dog.slug, saved.id)
  }

  for (const dog of dogs) {
    await updateDogParents(payload, dog, dogIdsBySlug)
  }

  for (const litter of litters) {
    await upsertLitter(payload, litter, dogIdsBySlug)
  }

  console.log(`Seeded ${dogs.length} psi and ${litters.length} vrhy to simulate one year of activity.`)
}

void main()
