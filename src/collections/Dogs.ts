import type { CollectionConfig } from 'payload'

export const Dogs: CollectionConfig = {
  slug: 'dogs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'dogType', 'status', 'published', 'updatedAt'],
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
      type: 'collapsible',
      label: 'Základ profilu',
      fields: [
        {
          type: 'row',
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
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'dogType',
              type: 'select',
              required: true,
              label: 'Typ',
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
          ],
        },
        {
          name: 'headline',
          type: 'text',
          label: 'Krátký nadpis',
        },
        {
          name: 'summary',
          type: 'textarea',
          label: 'Shrnutí',
          admin: {
            description: 'Krátký text pro karty, přehledy a úvod profilu.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Popis profilu',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Rodokmen a údaje',
      fields: [
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
      ],
    },
    {
      type: 'collapsible',
      label: 'Fotografie',
      fields: [
        {
          name: 'featuredImage',
          type: 'relationship',
          relationTo: 'media',
          label: 'Hlavní fotografie',
          admin: {
            description: 'Používá se na kartách, hero sekcích a detailu profilu.',
          },
        },
        {
          name: 'gallery',
          type: 'array',
          label: 'Galerie',
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
      ],
    },
    {
      type: 'collapsible',
      label: 'Zdraví a ocenění',
      fields: [
        {
          name: 'healthTests',
          type: 'array',
          label: 'Zdravotní testy',
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
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Zveřejnit na webu',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
