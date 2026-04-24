import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cs } from 'payload/i18n/cs'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Dogs } from './collections/Dogs'
import { Litters } from './collections/Litters'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: ' | Aureum Vellum Admin',
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Dogs, Litters],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
    },
  }),
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: 'cs',
    supportedLanguages: {
      cs,
    },
  },
  secret: process.env.PAYLOAD_SECRET || 'local-dev-secret-change-before-deploy',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
