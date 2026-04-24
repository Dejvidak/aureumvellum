import type { CollectionConfig } from 'payload'

export const Dogs: CollectionConfig = {
  slug: 'dogs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'dogType', 'status', 'updatedAt'],
    group: 'Chov',
  },
  labels: {
    singular: 'Pes',
    plural: 'Psi',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Jméno',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL identifikátor, například amelie-aureum.',
      },
    },
    {
      name: 'dogType',
      type: 'select',
      required: true,
      label: 'Typ psa',
      defaultValue: 'female',
      options: [
        {
          label: 'Fena',
          value: 'female',
        },
        {
          label: 'Pes',
          value: 'male',
        },
        {
          label: 'Štěně / odchovanec',
          value: 'offspring',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Stav',
      defaultValue: 'active',
      options: [
        {
          label: 'Aktivní',
          value: 'active',
        },
        {
          label: 'Plánovaný',
          value: 'planned',
        },
        {
          label: 'Archivovaný',
          value: 'archived',
        },
      ],
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Krátký nadpis',
      admin: {
        description: 'Krátký text pro kartu nebo úvod profilu.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Shrnutí',
      admin: {
        description: 'Krátké shrnutí pro výpisy a náhledy.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Popis profilu',
      admin: {
        description: 'Delší text pro detailní profil psa.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'dateOfBirth',
          type: 'date',
          label: 'Datum narození',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'color',
          type: 'text',
          label: 'Barva',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mother',
          type: 'relationship',
          relationTo: 'dogs',
          label: 'Matka',
          filterOptions: {
            dogType: {
              equals: 'female',
            },
          },
        },
        {
          name: 'father',
          type: 'relationship',
          relationTo: 'dogs',
          label: 'Otec',
          filterOptions: {
            dogType: {
              equals: 'male',
            },
          },
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'Hlavní fotografie',
      admin: {
        description: 'Hlavní obrázek pro kartu, hero sekci a profil.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie',
      admin: {
        description: 'Další upravitelné fotografie tohoto psa.',
      },
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          label: 'Obrázek',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Popisek',
        },
      ],
    },
    {
      name: 'healthTests',
      type: 'array',
      label: 'Zdravotní testy',
      admin: {
        description: 'Strukturovaný přehled zdravotních a DNA testů.',
      },
      fields: [
        {
          name: 'testName',
          type: 'text',
          required: true,
          label: 'Název testu',
        },
        {
          name: 'result',
          type: 'text',
          required: true,
          label: 'Výsledek',
        },
        {
          name: 'notes',
          type: 'text',
          label: 'Poznámka',
        },
      ],
    },
    {
      name: 'titlesAndAwards',
      type: 'array',
      label: 'Tituly a ocenění',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titul nebo ocenění',
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Zveřejnit',
      defaultValue: true,
    },
  ],
}
