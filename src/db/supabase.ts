/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Mock Supabase client for demonstration
export const supabase = {
  from: (table: string) => ({
    select: (query: string) => ({
      order: (col: string, opt: any) => ({
        limit: (n: number) => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: { value: { auto_failover: true, latency_threshold: 300, pulse_interval: 1000 } }, error: null }),
        then: (cb: any) => cb({ data: [], error: null })
      }),
      eq: (key: string, val: any) => ({
        single: () => Promise.resolve({ data: { value: { auto_failover: true, latency_threshold: 300, pulse_interval: 1000 } }, error: null })
      })
    }),
    update: (val: any) => ({
      eq: (key: string, id: any) => Promise.resolve({ error: null })
    })
  }),
  channel: (name: string) => ({
    on: (event: string, config: any, cb: any) => ({
      on: (e: string, c: any, callback: any) => ({
        subscribe: () => ({ unsubscribe: () => {} })
      }),
      subscribe: () => ({ unsubscribe: () => {} })
    }),
    subscribe: () => ({ unsubscribe: () => {} })
  }),
  functions: {
    invoke: (name: string) => Promise.resolve({ data: { message: 'Success' }, error: null })
  }
};
