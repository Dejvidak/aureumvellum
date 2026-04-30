import React from 'react'

export function AureumAdminLogo() {
  return (
    <div className="inline-flex items-center gap-3 text-[#2f2418]" aria-label="Aureum Vellum administrace">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2f4b3f] font-serif text-sm font-bold text-[#fffaf2] shadow-[0_10px_22px_rgba(47,75,63,0.22)]">
        AV
      </span>
      <span>
        <strong className="block font-serif text-xl font-semibold leading-none">Aureum Vellum</strong>
        <small className="mt-1 block text-xs font-bold uppercase text-[#735433]">Administrace chovu</small>
      </span>
    </div>
  )
}
