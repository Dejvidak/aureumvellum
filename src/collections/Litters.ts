import type { CollectionConfig } from 'payload'

export const Litters: CollectionConfig = {
  slug: 'litters',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'birthDate', 'updatedAt'],
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
      admin: {
        description: 'Krátký úvod pro kartu, přehled nebo sekci na webu.',
      },
    },
    {
      name: 'story',
      type: 'textarea',
      label: 'Příběh vrhu',
      admin: {
        description: 'Delší text a poznámky k vrhu.',
      },
    },
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
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'Hlavní fotografie',
      admin: {
        description: 'Hlavní fotografie používaná u tohoto vrhu.',
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
    {
      name: 'puppies',
      type: 'relationship',
      relationTo: 'dogs',
      hasMany: true,
      label: 'Štěňata / odchovanci',
      admin: {
        description: 'Propojení na štěňata nebo odchovance patřící k tomuto vrhu.',
      },
      filterOptions: {
        dogType: {
          equals: 'offspring',
        },
      },
    },
    {
      name: 'updates',
      type: 'array',
      label: 'Aktualizace',
      admin: {
        description: 'Krátké novinky a milníky pro rodiny i návštěvníky webu.',
      },
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
    {
      name: 'published',
      type: 'checkbox',
      label: 'Zveřejnit',
      defaultValue: true,
    },
  ],
}
