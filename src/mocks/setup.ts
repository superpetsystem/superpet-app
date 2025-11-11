import { enableMocking } from './mockApi'

// Initialize axios-based mocking. Keep this file lightweight so it can be lazily imported.
export async function startMocking() {
  enableMocking()
}
