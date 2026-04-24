import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Administrace',
  },
  labels: {
    singular: 'Administrátor',
    plural: 'Administrátoři',
  },
  auth: true,
  fields: [],
}
