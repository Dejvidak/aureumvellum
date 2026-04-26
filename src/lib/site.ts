import config from '@payload-config'
import { getPayload } from 'payload'

import type { Dog, Litter, Media } from '../payload-types'

type PopulatedDog = Dog & {
  father?: Dog | null
  featuredImage?: Media | null
  mother?: Dog | null
}

type PopulatedLitter = Litter & {
  father?: Dog | null
  featuredImage?: Media | null
  mother?: Dog | null
  puppies?: Dog[] | null
}

const SITE_NAME = 'Aureum Vellum'
const SITE_TAGLINE = 'Chovatelská stanice retrívrů'
const DEFAULT_SOCIAL_IMAGE = '/assets/enhanced/sana-orchard-smile.webp'

function escapeHtml(value: string | null | undefined): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatDate(date: string | null | undefined): string {
  if (!date) return 'doplníme'

  return new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function getMediaUrl(media: number | Media | null | undefined, fallback: string): string {
  if (media && typeof media === 'object' && media.url) {
    return media.url
  }

  return fallback
}

function getDogImage(dog: Partial<PopulatedDog>, fallback: string): string {
  return getMediaUrl(dog.featuredImage, fallback)
}

function getLitterImage(litter: Partial<PopulatedLitter>, fallback: string): string {
  return getMediaUrl(litter.featuredImage, fallback)
}

function pageShell({
  title,
  description,
  body,
  socialImage = DEFAULT_SOCIAL_IMAGE,
}: {
  body: string
  description: string
  socialImage?: string
  title: string
}): string {
  return `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${escapeHtml(socialImage)}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    ${body}
    <script type="module" src="/script.js"></script>
  </body>
</html>`
}

function siteHeader(): string {
  return `<header class="site-header" data-header>
    <a class="brand" href="/#domu" aria-label="${SITE_NAME} domů">
      <span class="brand-mark">AV</span>
      <span>
        <strong>${SITE_NAME}</strong>
        <small>${SITE_TAGLINE}</small>
      </span>
    </a>

    <button class="nav-toggle" type="button" aria-label="Otevřít menu" aria-expanded="false" data-nav-toggle>
      <span></span>
      <span></span>
    </button>

    <nav class="main-nav" data-nav>
      <a href="/#o-nas">O nás</a>
      <a href="/#psi">Naši psi</a>
      <a href="/#stenata">Štěňata</a>
      <a href="/#zdravi">Zdraví</a>
      <a href="/#kontakt">Kontakt</a>
    </nav>

    <div class="social-links header-social" aria-label="Sociální sítě">
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm5-2.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"/></svg>
      </a>
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.2V6.7c0-.7.5-.9 1-.9h2.1V2.2L14.4 2C11.2 2 9.5 3.9 9.5 6.4v1.8H7v3.9h2.5V22h4.1v-9.9h3.1l.6-3.9h-3.7Z"/></svg>
      </a>
    </div>
  </header>`
}

function siteFooter(): string {
  return `<footer class="site-footer">
    <div>
      <strong>${SITE_NAME}</strong>
      <span>${SITE_TAGLINE}</span>
    </div>
    <p>© 2026 Chovatelská stanice Aureum Vellum. Zlatý začátek života.</p>
    <div class="social-links">
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm5-2.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"/></svg>
      </a>
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.2V6.7c0-.7.5-.9 1-.9h2.1V2.2L14.4 2C11.2 2 9.5 3.9 9.5 6.4v1.8H7v3.9h2.5V22h4.1v-9.9h3.1l.6-3.9h-3.7Z"/></svg>
      </a>
    </div>
  </footer>`
}

function dogCard(dog: PopulatedDog, fallback: string, chip: string): string {
  return `<a class="dog-card" href="/${escapeHtml(dog.slug)}.html">
    <img src="${escapeHtml(getDogImage(dog, fallback))}" alt="${escapeHtml(dog.name)}" loading="lazy">
    <div>
      <p class="chip">${escapeHtml(chip)}</p>
      <h3>${escapeHtml(dog.name)}</h3>
      <p>${escapeHtml(dog.summary || dog.headline || 'Profil psa připravujeme.')}</p>
      <span class="card-link">Zobrazit profil</span>
    </div>
  </a>`
}

async function getPayloadClient() {
  return getPayload({ config })
}

export async function getSiteData() {
  const payload = await getPayloadClient()

  const [femaleDogsResult, maleDogsResult, offspringDogsResult, littersResult] = await Promise.all([
    payload.find({
      collection: 'dogs',
      depth: 2,
      limit: 20,
      pagination: false,
      sort: 'name',
      where: {
        and: [
          { published: { equals: true } },
          { dogType: { equals: 'female' } },
        ],
      },
    }),
    payload.find({
      collection: 'dogs',
      depth: 2,
      limit: 20,
      pagination: false,
      sort: 'name',
      where: {
        and: [
          { published: { equals: true } },
          { dogType: { equals: 'male' } },
        ],
      },
    }),
    payload.find({
      collection: 'dogs',
      depth: 2,
      limit: 50,
      pagination: false,
      sort: 'name',
      where: {
        and: [
          { published: { equals: true } },
          { dogType: { equals: 'offspring' } },
        ],
      },
    }),
    payload.find({
      collection: 'litters',
      depth: 2,
      limit: 20,
      pagination: false,
      sort: '-updatedAt',
      where: {
        published: {
          equals: true,
        },
      },
    }),
  ])

  return {
    femaleDogs: femaleDogsResult.docs as PopulatedDog[],
    maleDogs: maleDogsResult.docs as PopulatedDog[],
    offspringDogs: offspringDogsResult.docs as PopulatedDog[],
    litters: littersResult.docs as PopulatedLitter[],
  }
}

export async function renderHomePage(): Promise<string> {
  const { femaleDogs, maleDogs, litters } = await getSiteData()
  const featuredFemale = femaleDogs[0]
  const featuredMale = maleDogs[0]
  const featuredLitter = litters[0]

  const dogCards = [featuredFemale, featuredMale]
    .filter(Boolean)
    .map((dog) =>
      dogCard(
        dog as PopulatedDog,
        dog?.dogType === 'female'
          ? '/assets/enhanced/sana-orchard-smile.webp'
          : '/assets/enhanced/sana-orchard-portrait.webp',
        dog?.dogType === 'female' ? 'Doporučujeme' : 'Profil psa',
      ),
    )
    .join('')

  const litterImage = featuredLitter
    ? getLitterImage(featuredLitter, '/assets/enhanced/puppy-porch-flowers.webp')
    : '/assets/enhanced/puppy-porch-flowers.webp'

  const litterTitle = featuredLitter?.name || 'Aktuální vrh připravujeme'
  const litterText =
    featuredLitter?.summary ||
    'Každý vrh plánujeme s důrazem na zdraví, povahu a vhodnost spojení.'

  return pageShell({
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      'Aureum Vellum je chovatelská stanice retrívrů zaměřená na zdraví, vyrovnanou povahu a laskavý rodinný odchov.',
    body: `${siteHeader()}
      <main>
        <section class="hero" id="domu">
          <picture>
            <source media="(max-width: 760px)" srcset="/assets/enhanced/sana-orchard-smile.webp">
            <img src="/assets/enhanced/sana-orchard-smile.webp" alt="Světlý retrívr v sadu" fetchpriority="high">
          </picture>
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <p class="eyebrow">Zlatý začátek života</p>
            <h1>${SITE_NAME}</h1>
            <p>Chovatelská stanice retrívrů vzniklá z lásky k jejich laskavé povaze, inteligenci a oddanosti rodině.</p>
            <div class="hero-actions">
              <a class="button primary" href="#stenata">Aktuální vrh</a>
              <a class="button ghost" href="#kontakt">Mám zájem o štěně</a>
            </div>
          </div>
        </section>

        <section class="intro-band">
          <div class="metric">
            <strong>Domácí odchov</strong>
            <span>štěňata vyrůstají v rodinném prostředí</span>
          </div>
          <div class="metric">
            <strong>Zdraví a povaha</strong>
            <span>pečlivý výběr spojení a vyšetření</span>
          </div>
          <div class="metric">
            <strong>Dlouhodobý kontakt</strong>
            <span>podpora rodin nekončí odběrem</span>
          </div>
        </section>

        <section class="section two-column" id="o-nas">
          <div class="section-copy">
            <p class="eyebrow">O nás</p>
            <h2>Tady psi žijí jako členové rodiny.</h2>
            <p>Aureum Vellum stojí na klidném domácím zázemí, každodenním kontaktu s lidmi a respektu k povaze retrívra.</p>
            <p>Každý vrh plánujeme s rozvahou. Zajímá nás zdraví rodičů, jejich temperament, typický exteriér i to, aby se štěňata dostala do zodpovědných rodin.</p>
            <a class="text-link" href="#psi">Poznat naše psy</a>
          </div>
          <div class="image-stack">
            <img src="/assets/enhanced/sana-profile-close.webp" alt="Profil světlého retrívra" loading="lazy">
            <div class="quote-card">
              <span>Filozofie chovu</span>
              <strong>Zdraví, povaha, socializace a laskavý začátek.</strong>
            </div>
          </div>
        </section>

        <section class="section soft" id="psi">
          <div class="section-heading">
            <p class="eyebrow">Naši psi</p>
            <h2>Základ chovu Aureum Vellum</h2>
            <p>Při výběru chovných psů klademe důraz na zdraví, vyrovnanou povahu a typický výraz retrívra.</p>
          </div>
          <div class="category-grid">
            <a class="category-card" href="/feny.html">
              <img src="/assets/enhanced/sana-orchard-front.webp" alt="Chovná fena retrívra v sadu" loading="lazy">
              <span>Feny</span>
              <strong>Naše chovné feny</strong>
            </a>
            <a class="category-card" href="/kryci-psi.html">
              <img src="/assets/enhanced/sana-orchard-sitting.webp" alt="Krycí pes retrívra" loading="lazy">
              <span>Psi</span>
              <strong>Krycí psi</strong>
            </a>
            <a class="category-card" href="/odchovy.html">
              <img src="/assets/enhanced/puppy-porch-flowers.webp" alt="Mladý pes z odchovu" loading="lazy">
              <span>Odchovy</span>
              <strong>Naši odchovanci</strong>
            </a>
          </div>
          <div class="dog-grid">${dogCards}</div>
        </section>

        <section class="section litter-section" id="stenata">
          <div class="litter-visual">
            <img src="${escapeHtml(litterImage)}" alt="${escapeHtml(litterTitle)}" loading="lazy">
          </div>
          <div class="litter-panel">
            <p class="eyebrow">Štěňata</p>
            <h2>${escapeHtml(litterTitle)}</h2>
            <p>${escapeHtml(litterText)}</p>
            <dl class="info-list">
              <div><dt>Stav</dt><dd>${escapeHtml(featuredLitter?.status || 'plánováno')}</dd></div>
              <div><dt>Datum</dt><dd>${escapeHtml(formatDate(featuredLitter?.birthDate || featuredLitter?.expectedDate))}</dd></div>
              <div><dt>Štěňata</dt><dd>${escapeHtml(String(featuredLitter?.puppyCount ?? 0))}</dd></div>
            </dl>
            <a class="button primary" href="#kontakt">Mám zájem o štěně</a>
          </div>
        </section>

        <section class="section health" id="zdravi">
          <div class="section-copy">
            <p class="eyebrow">Zdraví a dokumentace</p>
            <h2>Zodpovědný chov je pro nás samozřejmost.</h2>
            <p>Naši psi splňují chovné podmínky a absolvují zdravotní i genetická vyšetření. Detailní výsledky patří do profilů jednotlivých psů.</p>
          </div>
          <div class="health-grid">
            <article><strong>DKK / DLK</strong><span>vyšetření kyčlí a loktů</span></article>
            <article><strong>Oči a srdce</strong><span>kontrola důležitých oblastí zdraví</span></article>
            <article><strong>DNA testy</strong><span>PRA, ICT a další dle plemene</span></article>
            <article><strong>PP a osvědčení</strong><span>náhledy dokumentů a výsledků</span></article>
          </div>
        </section>

        <section class="section contact" id="kontakt">
          <div class="contact-info">
            <p class="eyebrow">Kontakt</p>
            <h2>Máte zájem o štěně nebo se chcete zeptat?</h2>
            <p>Budeme rádi, když nám napíšete něco o sobě, svých zkušenostech a představě o společném životě se psem.</p>
            <div class="contact-lines">
              <a href="mailto:info@aureumvellum.cz">info@aureumvellum.cz</a>
              <a href="tel:+420777000000">+420 777 000 000</a>
              <span>Česká republika</span>
            </div>
          </div>
          <form class="contact-form" data-contact-form>
            <h3>Formulář pro zájemce o štěně</h3>
            <div class="form-row">
              <label>Jméno a příjmení<input name="name" autocomplete="name" required></label>
              <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
            </div>
            <div class="form-row">
              <label>Telefon<input name="phone" autocomplete="tel" required></label>
              <label>O jaký vrh máte zájem?
                <select name="litter" required>
                  <option value="">Vyberte</option>
                  ${litters
                    .map((litter) => `<option>${escapeHtml(litter.name)}</option>`)
                    .join('')}
                  <option>Jen předběžný zájem</option>
                </select>
              </label>
            </div>
            <label>Kde bydlíte?<input name="home" placeholder="Město + typ bydlení" required></label>
            <label>Zkušenosti se psy<textarea name="experience" rows="4" required></textarea></label>
            <label>Co od psa očekáváte?<textarea name="expectation" rows="4" required></textarea></label>
            <label class="checkbox">
              <input type="checkbox" required>
              <span>Souhlasím se zpracováním osobních údajů za účelem odpovědi na poptávku.</span>
            </label>
            <button class="button primary" type="submit">Odeslat zprávu</button>
            <p class="form-message" role="status" data-form-message></p>
          </form>
        </section>
      </main>
      ${siteFooter()}`,
  })
}

export async function renderDogListPage({
  description,
  dogs,
  title,
  typeLabel,
}: {
  description: string
  dogs: PopulatedDog[]
  title: string
  typeLabel: string
}): Promise<string> {
  const fallback =
    typeLabel === 'Feny'
      ? '/assets/enhanced/sana-orchard-front.webp'
      : '/assets/enhanced/sana-orchard-sitting.webp'

  const cards = dogs
    .map((dog) => dogCard(dog, fallback, dog.dogType === 'female' ? 'Chovná fena' : 'Krycí pes'))
    .join('')

  return pageShell({
    title: `${title} | ${SITE_NAME}`,
    description,
    body: `${siteHeader()}
      <main>
        <section class="page-hero">
          <div>
            <a class="text-link back-link" href="/#psi">Zpět na naše psy</a>
            <p class="eyebrow">${escapeHtml(typeLabel)}</p>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(description)}</p>
          </div>
        </section>
        <section class="section soft">
          <div class="dog-grid listing-grid">${cards}</div>
        </section>
      </main>
      ${siteFooter()}`,
  })
}

export async function renderLittersPage(): Promise<string> {
  const { litters, offspringDogs } = await getSiteData()

  const litterCards = litters
    .map((litter) => {
      const puppies = (litter.puppies as Dog[] | null | undefined)?.length ?? 0
      return `<a class="profile-card litter-card" href="/vrhy/${escapeHtml(litter.slug)}">
        <p class="chip">${escapeHtml(litter.name)}</p>
        <h3>${escapeHtml(litter.headline || litter.name)}</h3>
        <p>${escapeHtml(litter.summary || 'Podrobnosti k vrhu doplníme.')}</p>
        <dl class="profile-meta compact">
          <div><dt>Stav</dt><dd>${escapeHtml(litter.status)}</dd></div>
          <div><dt>Datum</dt><dd>${escapeHtml(formatDate(litter.birthDate || litter.expectedDate))}</dd></div>
          <div><dt>Štěňata</dt><dd>${escapeHtml(String(litter.puppyCount ?? puppies))}</dd></div>
        </dl>
        <span class="card-link">Otevřít vrh</span>
      </a>`
    })
    .join('')

  const offspringCards = offspringDogs
    .map((dog) => dogCard(dog, '/assets/enhanced/puppy-porch-flowers.webp', 'Odchovanec'))
    .join('')

  return pageShell({
    title: `Naši odchovanci | ${SITE_NAME}`,
    description: 'Přehled vrhů a odchovanců chovatelské stanice Aureum Vellum.',
    body: `${siteHeader()}
      <main>
        <section class="page-hero">
          <div>
            <a class="text-link back-link" href="/#psi">Zpět na naše psy</a>
            <p class="eyebrow">Odchovy</p>
            <h1>Naši odchovanci</h1>
            <p>Prostor pro štěňata z našich vrhů, jejich nové domovy a pozdější zprávy o tom, jak rostou.</p>
          </div>
        </section>

        <section class="section soft">
          <div class="profile-grid">${litterCards}</div>
        </section>

        <section class="section">
          <div class="section-heading">
            <p class="eyebrow">Odchovanci</p>
            <h2>Štěňata a mladí psi z našich vrhů</h2>
          </div>
          <div class="dog-grid">${offspringCards}</div>
        </section>
      </main>
      ${siteFooter()}`,
  })
}

export async function findDogBySlug(slug: string): Promise<PopulatedDog | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'dogs',
    depth: 2,
    limit: 1,
    pagination: false,
    where: {
      and: [{ published: { equals: true } }, { slug: { equals: slug } }],
    },
  })

  return (result.docs[0] as PopulatedDog | undefined) ?? null
}

export async function findLitterBySlug(slug: string): Promise<PopulatedLitter | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'litters',
    depth: 2,
    limit: 1,
    pagination: false,
    where: {
      and: [{ published: { equals: true } }, { slug: { equals: slug } }],
    },
  })

  return (result.docs[0] as PopulatedLitter | undefined) ?? null
}

export async function renderDogPage(dog: PopulatedDog): Promise<string> {
  const image = getDogImage(
    dog,
    dog.dogType === 'female'
      ? '/assets/enhanced/sana-orchard-front.webp'
      : '/assets/enhanced/sana-orchard-sitting.webp',
  )

  const healthTests =
    dog.healthTests?.map((test) => `<li>${escapeHtml(test.testName)}: ${escapeHtml(test.result)}</li>`).join('') ||
    '<li>Podrobnosti doplníme</li>'

  const awards =
    dog.titlesAndAwards?.map((award) => `<li>${escapeHtml(award.title)}</li>`).join('') ||
    'Výsledky a dokumentaci doplníme.'

  return pageShell({
    title: `${dog.name} | ${SITE_NAME}`,
    description: dog.summary || dog.headline || `Profil psa ${dog.name}.`,
    socialImage: image,
    body: `${siteHeader()}
      <main>
        <section class="page-hero">
          <div>
            <a class="text-link back-link" href="/#psi">Zpět na naše psy</a>
            <p class="eyebrow">${escapeHtml(dog.dogType === 'female' ? 'Chovná fena' : dog.dogType === 'male' ? 'Krycí pes' : 'Odchovanec')}</p>
            <h1>${escapeHtml(dog.name)}</h1>
            <p>${escapeHtml(dog.headline || dog.summary || 'Profil psa.')}</p>
          </div>
        </section>

        <section class="section profile-layout">
          <div class="profile-photo">
            <img src="${escapeHtml(image)}" alt="${escapeHtml(dog.name)}">
          </div>
          <div class="profile-summary">
            <p class="eyebrow">Profil psa</p>
            <h2>${escapeHtml(dog.headline || dog.name)}</h2>
            <p>${escapeHtml(dog.description || dog.summary || 'Detailní profil tohoto psa připravujeme.')}</p>
            <dl class="profile-meta">
              <div><dt>Datum narození</dt><dd>${escapeHtml(formatDate(dog.dateOfBirth))}</dd></div>
              <div><dt>Barva</dt><dd>${escapeHtml(dog.color || 'doplníme')}</dd></div>
              <div><dt>Matka</dt><dd>${escapeHtml((dog.mother && typeof dog.mother === 'object' ? dog.mother.name : null) || 'doplníme')}</dd></div>
              <div><dt>Otec</dt><dd>${escapeHtml((dog.father && typeof dog.father === 'object' ? dog.father.name : null) || 'doplníme')}</dd></div>
            </dl>
          </div>
        </section>

        <section class="section soft">
          <div class="profile-grid">
            <article class="profile-card">
              <h3>Zdraví</h3>
              <ul class="profile-list">${healthTests}</ul>
            </article>
            <article class="profile-card">
              <h3>Povaha a shrnutí</h3>
              <p>${escapeHtml(dog.summary || dog.description || 'Profil a povahu doplníme.')}</p>
            </article>
            <article class="profile-card">
              <h3>Rodokmen</h3>
              <dl class="profile-meta compact">
                <div><dt>Otec</dt><dd>${escapeHtml((dog.father && typeof dog.father === 'object' ? dog.father.name : null) || 'doplníme')}</dd></div>
                <div><dt>Matka</dt><dd>${escapeHtml((dog.mother && typeof dog.mother === 'object' ? dog.mother.name : null) || 'doplníme')}</dd></div>
              </dl>
            </article>
            <article class="profile-card">
              <h3>Tituly a ocenění</h3>
              <p>${awards}</p>
            </article>
          </div>
        </section>
      </main>
      ${siteFooter()}`,
  })
}

export async function renderLitterPage(litter: PopulatedLitter): Promise<string> {
  const image = getLitterImage(litter, '/assets/enhanced/puppy-porch-flowers.webp')
  const puppies = ((litter.puppies as Dog[] | null | undefined) ?? []) as PopulatedDog[]
  const puppyCards = puppies.length
    ? puppies.map((dog) => dogCard(dog, '/assets/enhanced/puppy-porch-flowers.webp', 'Odchovanec z vrhu')).join('')
    : '<article class="profile-card"><h3>Profily připravujeme</h3><p>U tohoto vrhu zatím nejsou zveřejněné jednotlivé profily štěňat.</p></article>'

  const updates =
    litter.updates?.length
      ? litter.updates
          .map(
            (update) => `<article class="profile-card">
              <p class="chip">${escapeHtml(formatDate(update.date))}</p>
              <h3>${escapeHtml(update.title)}</h3>
              <p>${escapeHtml(update.text || 'Další podrobnosti doplníme.')}</p>
            </article>`,
          )
          .join('')
      : '<article class="profile-card"><h3>Aktuality doplníme</h3><p>Jakmile budou k vrhu nové informace, objeví se právě tady.</p></article>'

  const motherName = litter.mother && typeof litter.mother === 'object' ? litter.mother.name : null
  const fatherName = litter.father && typeof litter.father === 'object' ? litter.father.name : null

  return pageShell({
    title: `${litter.name} | ${SITE_NAME}`,
    description: litter.summary || litter.headline || `Detail vrhu ${litter.name}.`,
    socialImage: image,
    body: `${siteHeader()}
      <main>
        <section class="page-hero">
          <div>
            <a class="text-link back-link" href="/odchovy.html">Zpět na odchovy</a>
            <p class="eyebrow">Vrh</p>
            <h1>${escapeHtml(litter.headline || litter.name)}</h1>
            <p>${escapeHtml(litter.summary || 'Přehled vrhu a štěňat z tohoto období.')}</p>
          </div>
        </section>

        <section class="section profile-layout">
          <div class="profile-photo">
            <img src="${escapeHtml(image)}" alt="${escapeHtml(litter.name)}">
          </div>
          <div class="profile-summary">
            <p class="eyebrow">${escapeHtml(litter.name)}</p>
            <h2>${escapeHtml(litter.headline || 'Přehled celého vrhu')}</h2>
            <p>${escapeHtml(litter.story || litter.summary || 'Detailní popis vrhu doplníme.')}</p>
            <dl class="profile-meta">
              <div><dt>Stav</dt><dd>${escapeHtml(litter.status)}</dd></div>
              <div><dt>Datum</dt><dd>${escapeHtml(formatDate(litter.birthDate || litter.expectedDate))}</dd></div>
              <div><dt>Matka</dt><dd>${escapeHtml(motherName || 'doplníme')}</dd></div>
              <div><dt>Otec</dt><dd>${escapeHtml(fatherName || 'doplníme')}</dd></div>
              <div><dt>Štěňata</dt><dd>${escapeHtml(String(litter.puppyCount ?? puppies.length))}</dd></div>
              <div><dt>Volná</dt><dd>${escapeHtml(String(litter.availablePuppies ?? 0))}</dd></div>
            </dl>
          </div>
        </section>

        <section class="section soft">
          <div class="section-heading">
            <p class="eyebrow">Štěňata z vrhu</p>
            <h2>${escapeHtml(litter.name)}</h2>
            <p>Tady jsou zobrazená pouze štěňata přiřazená k tomuto konkrétnímu vrhu.</p>
          </div>
          <div class="dog-grid">${puppyCards}</div>
        </section>

        <section class="section">
          <div class="section-heading">
            <p class="eyebrow">Aktuality</p>
            <h2>Historie a důležité momenty vrhu</h2>
          </div>
          <div class="profile-grid">${updates}</div>
        </section>
      </main>
      ${siteFooter()}`,
  })
}
