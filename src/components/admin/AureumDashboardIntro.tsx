import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Inquiry, Litter } from '../../payload-types'

function formatDate(date: string | null | undefined) {
  if (!date) return 'Doplnit'

  return new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function inquiryStatusLabel(status: Inquiry['status'] | null | undefined) {
  switch (status) {
    case 'new':
      return 'Nová'
    case 'contacted':
      return 'Kontaktováno'
    case 'waiting':
      return 'Čeká'
    case 'closed':
      return 'Uzavřeno'
    default:
      return 'Nová'
  }
}

function litterStatusLabel(status: Litter['status'] | null | undefined) {
  switch (status) {
    case 'planned':
      return 'Plánováno'
    case 'expected':
      return 'Očekáváno'
    case 'born':
      return 'Narozeno'
    case 'archived':
      return 'Archiv'
    default:
      return 'Doplnit'
  }
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-[#eadcc9] bg-[#fffdf9] px-3 py-2 text-sm text-[#614427]">{children}</p>
}

export async function AureumDashboardIntro() {
  const payload = await getPayload({ config })

  const [dogs, litters, inquiries, newInquiries, media, recentInquiries, activeLitters] = await Promise.all([
    payload.find({ collection: 'dogs', depth: 0, limit: 1, pagination: true }),
    payload.find({ collection: 'litters', depth: 0, limit: 1, pagination: true }),
    payload.find({ collection: 'inquiries', depth: 0, limit: 1, pagination: true }),
    payload.find({
      collection: 'inquiries',
      depth: 0,
      limit: 1,
      pagination: true,
      where: { status: { not_equals: 'closed' } },
    }),
    payload.find({ collection: 'media', depth: 0, limit: 1, pagination: true }),
    payload.find({
      collection: 'inquiries',
      depth: 0,
      limit: 5,
      pagination: false,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'litters',
      depth: 0,
      limit: 5,
      pagination: false,
      sort: '-updatedAt',
      where: { status: { not_equals: 'archived' } },
    }),
  ])

  const stats = [
    { label: 'Otevřené poptávky', value: newInquiries.totalDocs, href: '/admin/collections/inquiries' },
    { label: 'Všechny poptávky', value: inquiries.totalDocs, href: '/admin/collections/inquiries' },
    { label: 'Psi', value: dogs.totalDocs, href: '/admin/collections/dogs' },
    { label: 'Vrhy', value: litters.totalDocs, href: '/admin/collections/litters' },
    { label: 'Média', value: media.totalDocs, href: '/admin/collections/media' },
  ]

  const actions = [
    { label: 'Přidat psa', href: '/admin/collections/dogs/create' },
    { label: 'Založit vrh', href: '/admin/collections/litters/create' },
    { label: 'Nahrát fotky', href: '/admin/collections/media/create' },
    { label: 'Otevřít web', href: '/', external: true },
  ]

  return (
    <section className="mb-5 grid gap-4">
      <div className="rounded-2xl border border-[#d7c4a7] bg-white/85 p-5 shadow-[0_14px_34px_rgba(61,41,25,0.07)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase text-[#8f6c45]">Aureum Vellum</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-[#2f2418]">Administrace chovu</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#614427]">
              Rychlý přehled poptávek, vrhů a obsahu, který se nejčastěji upravuje.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noreferrer' : undefined}
                className="rounded-lg border border-[#d7c4a7] bg-[#fffdf9] px-3 py-2 text-sm font-semibold text-[#2f2418] transition duration-200 hover:border-[#9aa879] hover:bg-white"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <a
              key={stat.label}
              href={stat.href}
              className="rounded-xl border border-[#eadcc9] bg-[#fffdf9] p-4 text-[#3d2919] transition duration-200 hover:-translate-y-0.5 hover:border-[#9aa879] hover:shadow-[0_10px_24px_rgba(61,41,25,0.07)]"
            >
              <span className="block text-sm font-semibold text-[#614427]">{stat.label}</span>
              <strong className="mt-2 block font-serif text-4xl font-semibold leading-none text-[#2f2418]">{stat.value}</strong>
            </a>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-[#d7c4a7] bg-white/85 p-5 shadow-[0_14px_34px_rgba(61,41,25,0.07)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold leading-tight text-[#2f2418]">Poslední poptávky</h2>
            <a className="text-sm font-semibold text-[#2f4b3f]" href="/admin/collections/inquiries">
              Zobrazit vše
            </a>
          </div>

          <div className="grid gap-2.5">
            {(recentInquiries.docs as Inquiry[]).length ? (
              (recentInquiries.docs as Inquiry[]).map((inquiry) => (
                <a
                  key={inquiry.id}
                  href={`/admin/collections/inquiries/${inquiry.id}`}
                  className="grid gap-1 rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm text-[#3d2919] transition duration-200 hover:border-[#9aa879] hover:bg-white"
                >
                  <span className="flex items-center justify-between gap-3">
                    <strong>{inquiry.name}</strong>
                    <span className="rounded-md bg-[#eef3ec] px-2 py-1 text-xs font-semibold text-[#2f4b3f]">
                      {inquiryStatusLabel(inquiry.status)}
                    </span>
                  </span>
                  <span className="text-[#614427]">{inquiry.litter || 'Bez vybraného vrhu'}</span>
                  <span className="text-xs text-[#8f6c45]">{formatDate(inquiry.createdAt)}</span>
                </a>
              ))
            ) : (
              <EmptyState>Žádné poptávky zatím nejsou uložené.</EmptyState>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-[#d7c4a7] bg-white/85 p-5 shadow-[0_14px_34px_rgba(61,41,25,0.07)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold leading-tight text-[#2f2418]">Aktivní vrhy</h2>
            <a className="text-sm font-semibold text-[#2f4b3f]" href="/admin/collections/litters">
              Zobrazit vše
            </a>
          </div>

          <div className="grid gap-2.5">
            {(activeLitters.docs as Litter[]).length ? (
              (activeLitters.docs as Litter[]).map((litter) => (
                <a
                  key={litter.id}
                  href={`/admin/collections/litters/${litter.id}`}
                  className="grid gap-1 rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm text-[#3d2919] transition duration-200 hover:border-[#9aa879] hover:bg-white"
                >
                  <span className="flex items-center justify-between gap-3">
                    <strong>{litter.name}</strong>
                    <span className="rounded-md bg-[#eef3ec] px-2 py-1 text-xs font-semibold text-[#2f4b3f]">
                      {litterStatusLabel(litter.status)}
                    </span>
                  </span>
                  <span className="text-[#614427]">
                    {formatDate(litter.birthDate || litter.expectedDate)} · {litter.availablePuppies ?? 0} volná
                  </span>
                </a>
              ))
            ) : (
              <EmptyState>Nejsou tu žádné aktivní vrhy.</EmptyState>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}
