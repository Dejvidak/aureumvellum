import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['status', 'name', 'litter', 'email', 'createdAt'],
    group: 'Web',
  },
  labels: {
    singular: 'Poptávka',
    plural: 'Poptávky',
  },
  access: {
    create: () => true,
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      label: 'Stav',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Nová',
          value: 'new',
        },
        {
          label: 'Kontaktováno',
          value: 'contacted',
        },
        {
          label: 'Čeká na odpověď',
          value: 'waiting',
        },
        {
          label: 'Uzavřeno',
          value: 'closed',
        },
      ],
    },
    {
      name: 'contactedAt',
      type: 'date',
      label: 'Kontaktováno dne',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Zdroj',
      defaultValue: 'web',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Interní poznámky',
      admin: {
        description: 'Poznámky pro správce. Na webu se nezobrazují.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Jméno a příjmení',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mail',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefon',
    },
    {
      name: 'litter',
      type: 'text',
      label: 'Zájem o vrh',
    },
    {
      name: 'home',
      type: 'text',
      required: true,
      label: 'Bydlení',
    },
    {
      name: 'experience',
      type: 'textarea',
      required: true,
      label: 'Zkušenosti se psy',
    },
    {
      name: 'expectation',
      type: 'textarea',
      required: true,
      label: 'Očekávání od psa',
    },
    {
      name: 'consent',
      type: 'checkbox',
      required: true,
      label: 'Souhlas se zpracováním údajů',
    },
  ],
}
