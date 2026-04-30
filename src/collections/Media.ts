import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mediaCategory', 'updatedAt'],
    group: 'Web',
  },
  labels: {
    singular: 'Médium',
    plural: 'Média',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alternativní text',
      admin: {
        description: 'Krátký popis fotografie pro přístupnost a vyhledávání.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Popisek',
    },
    {
      name: 'mediaCategory',
      type: 'select',
      label: 'Kategorie',
      defaultValue: 'general',
      options: [
        {
          label: 'Pes',
          value: 'dog',
        },
        {
          label: 'Vrh',
          value: 'litter',
        },
        {
          label: 'Web / značka',
          value: 'site',
        },
        {
          label: 'Obecné',
          value: 'general',
        },
      ],
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'card',
        width: 720,
        height: 540,
        fit: 'cover',
      },
      {
        name: 'hero',
        width: 1600,
        height: 1200,
        fit: 'cover',
      },
    ],
  },
}
