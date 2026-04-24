import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mediaCategory', 'updatedAt'],
    group: 'Obsah webu',
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
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Popisek',
    },
    {
      name: 'mediaCategory',
      type: 'select',
      label: 'Kategorie média',
      defaultValue: 'general',
      options: [
        {
          label: 'Fotka psa',
          value: 'dog',
        },
        {
          label: 'Fotka vrhu',
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
