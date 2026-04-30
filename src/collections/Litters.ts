import type { CollectionConfig } from 'payload'

export const Litters: CollectionConfig = {
  slug: 'litters',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'birthDate', 'expectedDate', 'availablePuppies', 'updatedAt'],
    group: 'Chov',
  },
  labels: {
    singular: 'Vrh',
    plural: 'Vrhy',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Základ vrhu',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Název vrhu',
              admin: {
                description: 'Například Vrh A nebo Jarní vrh 2026.',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              label: 'Slug',
            },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          label: 'Stav',
          defaultValue: 'planned',
          options: [
            {
              label: 'Plánovaný',
              value: 'planned',
            },
            {
              label: 'Očekávaný',
              value: 'expected',
            },
            {
              label: 'Narozený',
              value: 'born',
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
        },
        {
          name: 'summary',
          type: 'textarea',
          label: 'Shrnutí',
        },
        {
          name: 'story',
          type: 'textarea',
          label: 'Příběh vrhu',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Rodiče a termíny',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'mother',
              type: 'relationship',
              relationTo: 'dogs',
              required: true,
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
              required: true,
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
          type: 'row',
          fields: [
            {
              name: 'birthDate',
              type: 'date',
              label: 'Datum narození',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'expectedDate',
              type: 'date',
              label: 'Očekávané datum',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'puppyCount',
              type: 'number',
              label: 'Počet štěňat',
              min: 0,
            },
            {
              name: 'availablePuppies',
              type: 'number',
              label: 'Volná štěňata',
              min: 0,
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Fotografie a štěňata',
      fields: [
        {
          name: 'featuredImage',
          type: 'relationship',
          relationTo: 'media',
          label: 'Hlavní fotografie',
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
        {
          name: 'puppies',
          type: 'relationship',
          relationTo: 'dogs',
          hasMany: true,
          label: 'Štěňata / odchovanci',
          filterOptions: {
            dogType: {
              equals: 'offspring',
            },
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Aktualizace',
      fields: [
        {
          name: 'updates',
          type: 'array',
          label: 'Aktualizace',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Nadpis',
            },
            {
              name: 'date',
              type: 'date',
              label: 'Datum',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'text',
              type: 'textarea',
              required: true,
              label: 'Text',
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
