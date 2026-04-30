import React from 'react'

const highlights = [
  'Profily psů a rodokmenové vazby',
  'Vrhy, štěňata a aktuality',
  'Média a obsah veřejného webu',
]

export function AureumLoginIntro() {
  return (
    <section className="[grid-area:intro] rounded-2xl border border-[#d7c4a7] bg-white/85 p-7 shadow-[0_18px_50px_rgba(61,41,25,0.10)] backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-[#eadcc9] pb-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#2f4b3f] font-serif text-sm font-bold text-[#fffaf2] shadow-[0_10px_22px_rgba(47,75,63,0.22)]">
          AV
        </span>
        <span>
          <strong className="block font-serif text-2xl font-semibold leading-none text-[#2f2418]">Aureum Vellum</strong>
          <small className="mt-1 block text-xs font-bold uppercase text-[#735433]">Administrace chovu</small>
        </span>
      </div>

      <div className="pt-7">
        <p className="mb-3 text-xs font-bold uppercase text-[#8f6c45]">Interní pracovní prostor</p>
        <h1 className="max-w-sm font-serif text-5xl font-semibold leading-none text-[#2f2418]">
          Správa chovatelské stanice
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-[#614427]">
          Klidné místo pro správu psů, vrhů, fotografií a kontaktních poptávek z webu.
        </p>
      </div>

      <ul className="mt-7 grid gap-2.5">
        {highlights.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm font-semibold text-[#3d2919]"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#2f4b3f]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
