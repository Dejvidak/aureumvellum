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
const INSTAGRAM_URL = process.env.SITE_INSTAGRAM_URL?.trim() || ''
const FACEBOOK_URL = process.env.SITE_FACEBOOK_URL?.trim() || ''
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
  if (!date) return 'Doplníme'

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

function getLitterStatusLabel(status: PopulatedLitter['status'] | null | undefined): string {
  switch (status) {
    case 'planned':
      return 'Plánováno'
    case 'expected':
      return 'Očekávaný'
    case 'born':
      return 'Narozený'
    case 'archived':
      return 'Archivovaný'
    default:
      return 'Doplníme'
  }
}

function joinClasses(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}

function renderSocialLinks(className = ''): string {
  const iconLinkClass =
    'grid h-10 w-10 place-items-center rounded-full border border-brand-gold/30 text-brand-goldDark transition duration-200 hover:-translate-y-0.5 hover:bg-brand-gold hover:text-white'
  const iconClass = 'h-[18px] w-[18px] fill-current'
  const links = [
    INSTAGRAM_URL
      ? `<a class="${iconLinkClass}" href="${escapeHtml(INSTAGRAM_URL)}" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg class="${iconClass}" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm5-2.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"/></svg>
        </a>`
      : '',
    FACEBOOK_URL
      ? `<a class="${iconLinkClass}" href="${escapeHtml(FACEBOOK_URL)}" target="_blank" rel="noreferrer" aria-label="Facebook">
          <svg class="${iconClass}" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.2V6.7c0-.7.5-.9 1-.9h2.1V2.2L14.4 2C11.2 2 9.5 3.9 9.5 6.4v1.8H7v3.9h2.5V22h4.1v-9.9h3.1l.6-3.9h-3.7Z"/></svg>
        </a>`
      : '',
  ].filter(Boolean)

  if (!links.length) {
    return ''
  }

  return `<div class="${joinClasses('flex items-center gap-2', className)}" aria-label="Sociální sítě">
      ${links.join('')}
    </div>`
}

function buttonClass(variant: 'primary' | 'ghost' = 'primary'): string {
  return joinClasses(
    'inline-flex min-h-12 items-center justify-center rounded-xl border px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[0.12em] transition duration-200',
    'hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none',
    variant === 'primary'
      ? 'border-brand-gold bg-brand-gold text-white hover:border-brand-goldDark hover:bg-brand-goldDark'
      : 'border-brand-gold/40 bg-white/70 text-brand-goldDark hover:bg-white',
  )
}

function eyebrowClass(): string {
  return 'mb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-brand-goldDark'
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
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body class="bg-brand-white text-brand-ink">
    ${body}
    <script type="module" src="/script.js"></script>
  </body>
</html>`
}

function siteHeader(): string {
  const navLinkClass =
    'relative py-2 text-sm font-semibold text-stone-700 transition after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-200 hover:text-stone-900 hover:after:scale-x-100'

  return `<header class="fixed inset-x-0 top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur-xl transition duration-200" data-header>
    <div class="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
      <a class="inline-flex min-w-0 items-center gap-3" href="/#domu" aria-label="${SITE_NAME} domů">
        <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-gold/40 bg-white text-[20px] font-serif font-bold text-brand-goldDark">AV</span>
        <span class="min-w-0">
          <strong class="block truncate font-serif text-[26px] leading-none text-[#2e2a25]">${SITE_NAME}</strong>
          <small class="mt-1 block truncate text-[11px] font-bold uppercase tracking-[0.12em] text-brand-muted">${SITE_TAGLINE}</small>
        </span>
      </a>

      <div class="ml-auto flex items-center gap-3 md:hidden">
        ${renderSocialLinks('hidden sm:flex')}
        <button class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/30 bg-white/80 text-brand-goldDark" type="button" aria-label="Otevřít menu" aria-expanded="false" data-nav-toggle>
          <span class="flex flex-col gap-1.5">
            <span class="block h-0.5 w-5 rounded-full bg-current"></span>
            <span class="block h-0.5 w-5 rounded-full bg-current"></span>
          </span>
        </button>
      </div>

      <nav class="absolute left-4 right-4 top-[calc(100%+0.75rem)] hidden flex-col gap-3 rounded-[28px] border border-black/5 bg-white/95 p-5 shadow-card md:static md:ml-auto md:flex md:flex-row md:items-center md:justify-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none" data-nav>
        <a class="${navLinkClass}" href="/#o-nas">O nás</a>
        <a class="${navLinkClass}" href="/#psi">Naši psi</a>
        <a class="${navLinkClass}" href="/#stenata">Štěňata</a>
        <a class="${navLinkClass}" href="/#zdravi">Zdraví</a>
        <a class="${navLinkClass}" href="/#kontakt">Kontakt</a>
      </nav>

      <div class="ml-4 hidden md:flex">
        ${renderSocialLinks()}
      </div>
    </div>
  </header>`
}

function siteFooter(): string {
  return `<footer class="border-t border-black/8 bg-[#f6f1e8] px-4 py-10 sm:px-6 lg:px-10">
    <div class="mx-auto flex max-w-[1440px] flex-col gap-6 text-sm text-brand-muted md:flex-row md:items-end md:justify-between">
      <div>
        <strong class="block font-serif text-[28px] leading-none text-[#2e2a25]">${SITE_NAME}</strong>
        <span class="mt-2 block text-[11px] font-bold uppercase tracking-[0.12em]">${SITE_TAGLINE}</span>
      </div>
      <p class="max-w-xl text-[15px]">© 2026 Chovatelská stanice Aureum Vellum. Zlatý začátek života.</p>
      ${renderSocialLinks('md:self-center')}
    </div>
  </footer>`
}

function renderMetaList(
  items: Array<{ label: string; value: string }>,
  columns: 'compact' | 'wide' = 'wide',
): string {
  return `<dl class="${joinClasses(
    'grid gap-4 text-sm text-brand-muted',
    columns === 'wide' ? 'sm:grid-cols-2' : 'sm:grid-cols-1',
  )}">
      ${items
        .map(
          ({ label, value }) => `<div class="border-t border-black/10 pt-3">
            <dt class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-goldDark">${escapeHtml(label)}</dt>
            <dd class="mt-2 text-[18px] text-[#2f2a24]">${escapeHtml(value)}</dd>
          </div>`,
        )
        .join('')}
    </dl>`
}

function renderSectionHeading(eyebrow: string, title: string, text?: string): string {
  return `<div class="mx-auto mb-12 max-w-[840px] text-center">
      <p class="${eyebrowClass()}">${escapeHtml(eyebrow)}</p>
      <h2 class="text-[#2e2a25]">${escapeHtml(title)}</h2>
      ${text ? `<p class="mx-auto mt-5 max-w-[680px] text-[18px] text-brand-muted">${escapeHtml(text)}</p>` : ''}
    </div>`
}

function dogCard(dog: PopulatedDog, fallback: string, chip: string): string {
  return `<a class="group overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover" href="/${escapeHtml(dog.slug)}.html">
    <img class="h-[320px] w-full object-cover" src="${escapeHtml(getDogImage(dog, fallback))}" alt="${escapeHtml(dog.name)}" loading="lazy">
    <div class="grid gap-4 p-6">
      <div>
        <p class="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-goldDark">${escapeHtml(chip)}</p>
        <h3 class="text-[#2e2a25] transition group-hover:text-brand-goldDark">${escapeHtml(dog.name)}</h3>
      </div>
      <p class="text-[16px] text-brand-muted">${escapeHtml(dog.summary || dog.headline || 'Profil psa připravujeme.')}</p>
      <span class="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-brand-goldDark">Zobrazit profil <span aria-hidden="true">→</span></span>
    </div>
  </a>`
}

function emptyCard(title: string, text: string): string {
  return `<article class="rounded-[28px] border border-black/8 bg-white p-8 shadow-card">
    <h3 class="text-[#2e2a25]">${escapeHtml(title)}</h3>
    <p class="mt-4 text-[16px] text-brand-muted">${escapeHtml(text)}</p>
  </article>`
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
        and: [{ published: { equals: true } }, { dogType: { equals: 'female' } }],
      },
    }),
    payload.find({
      collection: 'dogs',
      depth: 2,
      limit: 20,
      pagination: false,
      sort: 'name',
      where: {
        and: [{ published: { equals: true } }, { dogType: { equals: 'male' } }],
      },
    }),
    payload.find({
      collection: 'dogs',
      depth: 2,
      limit: 50,
      pagination: false,
      sort: 'name',
      where: {
        and: [{ published: { equals: true } }, { dogType: { equals: 'offspring' } }],
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
        <section class="relative isolate grid min-h-screen items-end overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-10 lg:pb-20 lg:pt-40" id="domu">
          <picture class="absolute inset-0 -z-20">
            <source media="(max-width: 760px)" srcset="/assets/enhanced/sana-orchard-smile.webp">
            <img class="h-full w-full object-cover" src="/assets/enhanced/sana-orchard-smile.webp" alt="Světlý retrívr v sadu" fetchpriority="high">
          </picture>
          <div class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.82)_42%,rgba(255,255,255,0.16)_74%),linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.88)_100%)]"></div>
          <div class="mx-auto w-full max-w-[1440px]">
            <div class="max-w-[760px]">
              <p class="${eyebrowClass()}">Zlatý začátek života</p>
              <h1 class="max-w-[10ch] text-[#2e2a25]">${SITE_NAME}</h1>
              <p class="mt-6 max-w-[620px] text-[19px] leading-8 text-[#4f4940] sm:text-[22px]">Chovatelská stanice retrívrů vzniklá z lásky k jejich laskavé povaze, inteligenci a oddanosti rodině.</p>
              <div class="mt-8 flex flex-wrap gap-3">
                <a class="${buttonClass('primary')}" href="#stenata">Aktuální vrh</a>
                <a class="${buttonClass('ghost')}" href="#kontakt">Mám zájem o štěně</a>
              </div>
            </div>
          </div>
        </section>

        <section class="grid border-y border-black/10 bg-[#efe7da] md:grid-cols-3">
          <div class="bg-white px-6 py-8 lg:px-10">
            <strong class="block font-serif text-[32px] leading-[1.05] text-[#2e2a25]">Domácí odchov</strong>
            <span class="mt-3 block text-[15px] text-brand-muted">Štěňata vyrůstají v rodinném prostředí</span>
          </div>
          <div class="border-y border-black/10 bg-white px-6 py-8 md:border-x md:border-y-0 lg:px-10">
            <strong class="block font-serif text-[32px] leading-[1.05] text-[#2e2a25]">Zdraví a povaha</strong>
            <span class="mt-3 block text-[15px] text-brand-muted">Pečlivý výběr spojení a vyšetření</span>
          </div>
          <div class="bg-white px-6 py-8 lg:px-10">
            <strong class="block font-serif text-[32px] leading-[1.05] text-[#2e2a25]">Dlouhodobý kontakt</strong>
            <span class="mt-3 block text-[15px] text-brand-muted">Podpora rodin nekončí odběrem</span>
          </div>
        </section>

        <section class="px-4 py-20 sm:px-6 lg:px-10 lg:py-28" id="o-nas">
          <div class="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,1.1fr)] lg:gap-20">
            <div class="max-w-[680px]">
              <p class="${eyebrowClass()}">O nás</p>
              <h2 class="text-[#2e2a25]">Tady psi žijí jako členové rodiny.</h2>
              <p class="mt-6 text-[18px] text-brand-muted">Aureum Vellum stojí na klidném domácím zázemí, každodenním kontaktu s lidmi a respektu k povaze retrívra.</p>
              <p class="mt-4 text-[18px] text-brand-muted">Každý vrh plánujeme s rozvahou. Zajímá nás zdraví rodičů, jejich temperament, typický exteriér i to, aby se štěňata dostala do zodpovědných rodin.</p>
              <a class="mt-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-brand-goldDark" href="#psi">Poznat naše psy <span aria-hidden="true">→</span></a>
            </div>
            <div class="relative min-h-[520px]">
              <img class="ml-auto h-[520px] w-[82%] rounded-[30px] object-cover shadow-soft" src="/assets/enhanced/sana-profile-close.webp" alt="Profil světlého retrívra" loading="lazy">
              <div class="absolute bottom-0 left-0 w-[min(360px,72%)] rounded-[28px] border border-brand-gold/20 bg-white p-7 shadow-soft">
                <span class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-goldDark">Filozofie chovu</span>
                <strong class="mt-3 block font-serif text-[34px] leading-[1.02] text-[#2e2a25]">Zdraví, povaha, socializace a laskavý začátek.</strong>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-brand-soft px-4 py-20 sm:px-6 lg:px-10 lg:py-28" id="psi">
          <div class="mx-auto max-w-[1440px]">
            ${renderSectionHeading(
              'Naši psi',
              'Základ chovu Aureum Vellum',
              'Při výběru chovných psů klademe důraz na zdraví, vyrovnanou povahu a typický výraz retrívra.',
            )}
            <div class="grid gap-6 md:grid-cols-3">
              <a class="group overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover" href="/feny.html">
                <img class="h-[280px] w-full object-cover" src="/assets/enhanced/sana-orchard-front.webp" alt="Chovná fena retrívra v sadu" loading="lazy">
                <div class="grid gap-3 p-6">
                  <span class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-goldDark">Feny</span>
                  <strong class="font-serif text-[34px] leading-[1.02] text-[#2e2a25] transition group-hover:text-brand-goldDark">Naše chovné feny</strong>
                </div>
              </a>
              <a class="group overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover" href="/kryci-psi.html">
                <img class="h-[280px] w-full object-cover" src="/assets/enhanced/sana-orchard-sitting.webp" alt="Krycí pes retrívra" loading="lazy">
                <div class="grid gap-3 p-6">
                  <span class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-goldDark">Psi</span>
                  <strong class="font-serif text-[34px] leading-[1.02] text-[#2e2a25] transition group-hover:text-brand-goldDark">Krycí psi</strong>
                </div>
              </a>
              <a class="group overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover" href="/odchovy.html">
                <img class="h-[280px] w-full object-cover" src="/assets/enhanced/puppy-porch-flowers.webp" alt="Mladý pes z odchovu" loading="lazy">
                <div class="grid gap-3 p-6">
                  <span class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-goldDark">Odchovy</span>
                  <strong class="font-serif text-[34px] leading-[1.02] text-[#2e2a25] transition group-hover:text-brand-goldDark">Naši odchovanci</strong>
                </div>
              </a>
            </div>
            <div class="mt-10 grid gap-6 md:grid-cols-2">${dogCards}</div>
          </div>
        </section>

        <section class="px-4 py-20 sm:px-6 lg:px-10 lg:py-28" id="stenata">
          <div class="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            <div class="overflow-hidden rounded-[34px] shadow-soft">
              <img class="h-full w-full object-cover" src="${escapeHtml(litterImage)}" alt="${escapeHtml(litterTitle)}" loading="lazy">
            </div>
            <div class="rounded-[34px] border border-black/8 bg-white p-8 shadow-soft sm:p-10">
              <p class="${eyebrowClass()}">Štěňata</p>
              <h2 class="text-[#2e2a25]">${escapeHtml(litterTitle)}</h2>
              <p class="mt-5 text-[18px] text-brand-muted">${escapeHtml(litterText)}</p>
              <div class="mt-8">
                ${renderMetaList([
                  { label: 'Stav', value: getLitterStatusLabel(featuredLitter?.status) },
                  { label: 'Datum', value: formatDate(featuredLitter?.birthDate || featuredLitter?.expectedDate) },
                  { label: 'Štěňata', value: String(featuredLitter?.puppyCount ?? 0) },
                ])}
              </div>
              <a class="${joinClasses(buttonClass('primary'), 'mt-8')}" href="#kontakt">Mám zájem o štěně</a>
            </div>
          </div>
        </section>

        <section class="bg-brand-soft px-4 py-20 sm:px-6 lg:px-10 lg:py-28" id="zdravi">
          <div class="mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-[minmax(0,0.94fr)_minmax(320px,1.06fr)] lg:gap-20">
            <div class="max-w-[680px]">
              <p class="${eyebrowClass()}">Zdraví a dokumentace</p>
              <h2 class="text-[#2e2a25]">Zodpovědný chov je pro nás samozřejmost.</h2>
              <p class="mt-6 text-[18px] text-brand-muted">Naši psi splňují chovné podmínky a absolvují zdravotní i genetická vyšetření. Detailní výsledky patří do profilů jednotlivých psů.</p>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              ${[
                ['DKK / DLK', 'Vyšetření kyčlí a loktů'],
                ['Oči a srdce', 'Kontrola důležitých oblastí zdraví'],
                ['DNA testy', 'PRA, ICT a další dle plemene'],
                ['PP a osvědčení', 'Náhledy dokumentů a výsledků'],
              ]
                .map(
                  ([title, text]) => `<article class="rounded-[24px] border border-black/8 bg-white p-6 shadow-card">
                    <strong class="block font-serif text-[28px] leading-[1.05] text-[#2e2a25]">${escapeHtml(title)}</strong>
                    <span class="mt-3 block text-[15px] text-brand-muted">${escapeHtml(text)}</span>
                  </article>`,
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="px-4 py-20 sm:px-6 lg:px-10 lg:py-28" id="kontakt">
          <div class="mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,1.1fr)] lg:gap-20">
            <div class="max-w-[680px]">
              <p class="${eyebrowClass()}">Kontakt</p>
              <h2 class="text-[#2e2a25]">Máte zájem o štěně nebo se chcete zeptat?</h2>
              <p class="mt-6 text-[18px] text-brand-muted">Budeme rádi, když nám napíšete něco o sobě, svých zkušenostech a představě o společném životě se psem.</p>
              <div class="mt-8 grid gap-3 text-[17px] text-brand-goldDark">
                <a class="font-semibold hover:text-brand-gold" href="mailto:info@aureumvellum.cz">info@aureumvellum.cz</a>
                <a class="font-semibold hover:text-brand-gold" href="tel:+420777000000">+420 777 000 000</a>
                <span>Česká republika</span>
              </div>
            </div>
            <form class="rounded-[34px] border border-black/8 bg-white p-8 shadow-soft sm:p-10" data-contact-form action="/api/contact" method="post">
              <h3 class="text-[#2e2a25]">Formulář pro zájemce o štěně</h3>
              <div class="mt-6 grid gap-5 md:grid-cols-2">
                <label>Jméno a příjmení<input name="name" autocomplete="name" required></label>
                <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
              </div>
              <div class="mt-5 grid gap-5 md:grid-cols-2">
                <label>Telefon<input name="phone" autocomplete="tel" required></label>
                <label>O jaký vrh máte zájem?
                  <select name="litter" required>
                    <option value="">Vyberte</option>
                    ${litters.map((litter) => `<option>${escapeHtml(litter.name)}</option>`).join('')}
                    <option>Jen předběžný zájem</option>
                  </select>
                </label>
              </div>
              <div class="mt-5 grid gap-5">
                <label>Kde bydlíte?<input name="home" placeholder="Město + typ bydlení" required></label>
                <label>Zkušenosti se psy<textarea name="experience" rows="4" required></textarea></label>
                <label>Co od psa očekáváte?<textarea name="expectation" rows="4" required></textarea></label>
              </div>
              <label class="mt-5 flex items-start gap-3 text-[14px] font-semibold text-brand-muted">
                <input class="mt-1 h-4 w-4 min-h-0 rounded border-black/20" type="checkbox" required>
                <span>Souhlasím se zpracováním osobních údajů za účelem odpovědi na poptávku.</span>
              </label>
              <button class="${joinClasses(buttonClass('primary'), 'mt-6 w-full sm:w-auto')}" type="submit">Odeslat zprávu</button>
              <p class="mt-4 text-[14px] text-brand-muted" role="status" data-form-message></p>
            </form>
          </div>
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
        <section class="bg-brand-paper px-4 pb-16 pt-36 sm:px-6 lg:px-10 lg:pb-20 lg:pt-44">
          <div class="mx-auto max-w-[1440px]">
            <a class="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-brand-goldDark" href="/#psi">Zpět na naše psy <span aria-hidden="true">→</span></a>
            <div class="mt-8 max-w-[920px]">
              <p class="${eyebrowClass()}">${escapeHtml(typeLabel)}</p>
              <h1 class="mt-3 text-[#2e2a25]">${escapeHtml(title)}</h1>
              <p class="mt-6 max-w-[700px] text-[19px] text-brand-muted">${escapeHtml(description)}</p>
            </div>
          </div>
        </section>
        <section class="bg-brand-soft px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div class="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-2 xl:grid-cols-3">${cards}</div>
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
      return `<a class="group rounded-[28px] border border-black/8 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover" href="/vrhy/${escapeHtml(litter.slug)}">
        <p class="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-goldDark">${escapeHtml(litter.name)}</p>
        <h3 class="text-[#2e2a25] transition group-hover:text-brand-goldDark">${escapeHtml(litter.headline || litter.name)}</h3>
        <p class="mt-4 text-[16px] text-brand-muted">${escapeHtml(litter.summary || 'Podrobnosti k vrhu doplníme.')}</p>
        <div class="mt-6">
          ${renderMetaList(
            [
              { label: 'Stav', value: getLitterStatusLabel(litter.status) },
              { label: 'Datum', value: formatDate(litter.birthDate || litter.expectedDate) },
              { label: 'Štěňata', value: String(litter.puppyCount ?? puppies) },
            ],
            'compact',
          )}
        </div>
        <span class="mt-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-brand-goldDark">Otevřít vrh <span aria-hidden="true">→</span></span>
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
        <section class="bg-brand-paper px-4 pb-16 pt-36 sm:px-6 lg:px-10 lg:pb-20 lg:pt-44">
          <div class="mx-auto max-w-[1440px]">
            <a class="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-brand-goldDark" href="/#psi">Zpět na naše psy <span aria-hidden="true">→</span></a>
            <div class="mt-8 max-w-[920px]">
              <p class="${eyebrowClass()}">Odchovy</p>
              <h1 class="mt-3 text-[#2e2a25]">Naši odchovanci</h1>
              <p class="mt-6 max-w-[700px] text-[19px] text-brand-muted">Prostor pro štěňata z našich vrhů, jejich nové domovy a pozdější zprávy o tom, jak rostou.</p>
            </div>
          </div>
        </section>

        <section class="bg-brand-soft px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div class="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-2">${litterCards}</div>
        </section>

        <section class="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div class="mx-auto max-w-[1440px]">
            ${renderSectionHeading('Odchovanci', 'Štěňata a mladí psi z našich vrhů')}
            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">${offspringCards}</div>
          </div>
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
    dog.healthTests?.length
      ? `<ul class="grid gap-3 text-[16px] text-brand-muted">${dog.healthTests
          .map(
            (test) =>
              `<li class="rounded-2xl border border-black/8 bg-brand-soft px-4 py-3"><strong class="text-[#2e2a25]">${escapeHtml(test.testName)}:</strong> ${escapeHtml(test.result)}</li>`,
          )
          .join('')}</ul>`
      : '<p class="text-[16px] text-brand-muted">Podrobnosti doplníme.</p>'

  const awards =
    dog.titlesAndAwards?.length
      ? `<ul class="grid gap-3 text-[16px] text-brand-muted">${dog.titlesAndAwards
          .map((award) => `<li class="rounded-2xl border border-black/8 bg-brand-soft px-4 py-3">${escapeHtml(award.title)}</li>`)
          .join('')}</ul>`
      : '<p class="text-[16px] text-brand-muted">Výsledky a dokumentaci doplníme.</p>'

  return pageShell({
    title: `${dog.name} | ${SITE_NAME}`,
    description: dog.summary || dog.headline || `Profil psa ${dog.name}.`,
    socialImage: image,
    body: `${siteHeader()}
      <main>
        <section class="bg-brand-paper px-4 pb-16 pt-36 sm:px-6 lg:px-10 lg:pb-20 lg:pt-44">
          <div class="mx-auto max-w-[1440px]">
            <a class="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-brand-goldDark" href="/#psi">Zpět na naše psy <span aria-hidden="true">→</span></a>
            <div class="mt-8 max-w-[920px]">
              <p class="${eyebrowClass()}">${escapeHtml(
                dog.dogType === 'female' ? 'Chovná fena' : dog.dogType === 'male' ? 'Krycí pes' : 'Odchovanec',
              )}</p>
              <h1 class="mt-3 text-[#2e2a25]">${escapeHtml(dog.name)}</h1>
              <p class="mt-6 max-w-[700px] text-[19px] text-brand-muted">${escapeHtml(dog.headline || dog.summary || 'Profil psa.')}</p>
            </div>
          </div>
        </section>

        <section class="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div class="mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div class="overflow-hidden rounded-[34px] shadow-soft">
              <img class="h-full w-full object-cover" src="${escapeHtml(image)}" alt="${escapeHtml(dog.name)}">
            </div>
            <div class="rounded-[34px] border border-black/8 bg-white p-8 shadow-soft sm:p-10">
              <p class="${eyebrowClass()}">Profil psa</p>
              <h2 class="text-[#2e2a25]">${escapeHtml(dog.headline || dog.name)}</h2>
              <p class="mt-5 text-[18px] text-brand-muted">${escapeHtml(dog.description || dog.summary || 'Detailní profil tohoto psa připravujeme.')}</p>
              <div class="mt-8">
                ${renderMetaList([
                  { label: 'Datum narození', value: formatDate(dog.dateOfBirth) },
                  { label: 'Barva', value: dog.color || 'Doplníme' },
                  {
                    label: 'Matka',
                    value: (dog.mother && typeof dog.mother === 'object' ? dog.mother.name : null) || 'Doplníme',
                  },
                  {
                    label: 'Otec',
                    value: (dog.father && typeof dog.father === 'object' ? dog.father.name : null) || 'Doplníme',
                  },
                ])}
              </div>
            </div>
          </div>
        </section>

        <section class="bg-brand-soft px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div class="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-2">
            <article class="rounded-[28px] border border-black/8 bg-white p-8 shadow-card">
              <h3 class="text-[#2e2a25]">Zdraví</h3>
              <div class="mt-5">${healthTests}</div>
            </article>
            <article class="rounded-[28px] border border-black/8 bg-white p-8 shadow-card">
              <h3 class="text-[#2e2a25]">Povaha a shrnutí</h3>
              <p class="mt-5 text-[16px] text-brand-muted">${escapeHtml(dog.summary || dog.description || 'Profil a povahu doplníme.')}</p>
            </article>
            <article class="rounded-[28px] border border-black/8 bg-white p-8 shadow-card">
              <h3 class="text-[#2e2a25]">Rodokmen</h3>
              <div class="mt-5">
                ${renderMetaList(
                  [
                    {
                      label: 'Otec',
                      value: (dog.father && typeof dog.father === 'object' ? dog.father.name : null) || 'Doplníme',
                    },
                    {
                      label: 'Matka',
                      value: (dog.mother && typeof dog.mother === 'object' ? dog.mother.name : null) || 'Doplníme',
                    },
                  ],
                  'compact',
                )}
              </div>
            </article>
            <article class="rounded-[28px] border border-black/8 bg-white p-8 shadow-card">
              <h3 class="text-[#2e2a25]">Tituly a ocenění</h3>
              <div class="mt-5">${awards}</div>
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
    : emptyCard('Profily připravujeme', 'U tohoto vrhu zatím nejsou zveřejněné jednotlivé profily štěňat.')

  const updates =
    litter.updates?.length
      ? litter.updates
          .map(
            (update) => `<article class="rounded-[28px] border border-black/8 bg-white p-8 shadow-card">
              <p class="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-goldDark">${escapeHtml(formatDate(update.date))}</p>
              <h3 class="text-[#2e2a25]">${escapeHtml(update.title)}</h3>
              <p class="mt-4 text-[16px] text-brand-muted">${escapeHtml(update.text || 'Další podrobnosti doplníme.')}</p>
            </article>`,
          )
          .join('')
      : emptyCard('Aktuality doplníme', 'Jakmile budou k vrhu nové informace, objeví se právě tady.')

  const motherName = litter.mother && typeof litter.mother === 'object' ? litter.mother.name : null
  const fatherName = litter.father && typeof litter.father === 'object' ? litter.father.name : null

  return pageShell({
    title: `${litter.name} | ${SITE_NAME}`,
    description: litter.summary || litter.headline || `Detail vrhu ${litter.name}.`,
    socialImage: image,
    body: `${siteHeader()}
      <main>
        <section class="bg-brand-paper px-4 pb-16 pt-36 sm:px-6 lg:px-10 lg:pb-20 lg:pt-44">
          <div class="mx-auto max-w-[1440px]">
            <a class="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-brand-goldDark" href="/odchovy.html">Zpět na odchovy <span aria-hidden="true">→</span></a>
            <div class="mt-8 max-w-[920px]">
              <p class="${eyebrowClass()}">Vrh</p>
              <h1 class="mt-3 text-[#2e2a25]">${escapeHtml(litter.headline || litter.name)}</h1>
              <p class="mt-6 max-w-[700px] text-[19px] text-brand-muted">${escapeHtml(litter.summary || 'Přehled vrhu a štěňat z tohoto období.')}</p>
            </div>
          </div>
        </section>

        <section class="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div class="mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div class="overflow-hidden rounded-[34px] shadow-soft">
              <img class="h-full w-full object-cover" src="${escapeHtml(image)}" alt="${escapeHtml(litter.name)}">
            </div>
            <div class="rounded-[34px] border border-black/8 bg-white p-8 shadow-soft sm:p-10">
              <p class="${eyebrowClass()}">${escapeHtml(litter.name)}</p>
              <h2 class="text-[#2e2a25]">${escapeHtml(litter.headline || 'Přehled celého vrhu')}</h2>
              <p class="mt-5 text-[18px] text-brand-muted">${escapeHtml(litter.story || litter.summary || 'Detailní popis vrhu doplníme.')}</p>
              <div class="mt-8">
                ${renderMetaList([
                  { label: 'Stav', value: getLitterStatusLabel(litter.status) },
                  { label: 'Datum', value: formatDate(litter.birthDate || litter.expectedDate) },
                  { label: 'Matka', value: motherName || 'Doplníme' },
                  { label: 'Otec', value: fatherName || 'Doplníme' },
                  { label: 'Štěňata', value: String(litter.puppyCount ?? puppies.length) },
                  { label: 'Volná', value: String(litter.availablePuppies ?? 0) },
                ])}
              </div>
            </div>
          </div>
        </section>

        <section class="bg-brand-soft px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div class="mx-auto max-w-[1440px]">
            ${renderSectionHeading(
              'Štěňata z vrhu',
              litter.name,
              'Tady jsou zobrazená pouze štěňata přiřazená k tomuto konkrétnímu vrhu.',
            )}
            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">${puppyCards}</div>
          </div>
        </section>

        <section class="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div class="mx-auto max-w-[1440px]">
            ${renderSectionHeading('Aktuality', 'Historie a důležité momenty vrhu')}
            <div class="grid gap-6 lg:grid-cols-2">${updates}</div>
          </div>
        </section>
      </main>
      ${siteFooter()}`,
  })
}
