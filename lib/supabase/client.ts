import { createBrowserClient } from '@supabase/ssr'

// Enforce a single browser client instance to avoid reconnects and
// duplicated websockets / listeners across hot reloads and components.
declare global {
  // Allow attaching to globalThis for HMR-safe singleton
  // eslint-disable-next-line no-var
  var __SUPABASE_BROWSER_CLIENT__: ReturnType<typeof createBrowserClient> | undefined
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!SUPABASE_URL || !SUPABASE_KEY) {
  // Keep runtime fail-fast to avoid silent misconfigurations.
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const client = globalThis.__SUPABASE_BROWSER_CLIENT__ ??= createBrowserClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

export default client

