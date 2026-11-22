import { defineConfig } from '@playwright/test'

const host = '127.0.0.1'
const port = 4174
const baseURL = `http://${host}:${port}`
const isCI = Boolean(process.env.CI)

export default defineConfig({
  testDir: './test',
  forbidOnly: isCI,
  use: {
    baseURL,
    browserName: 'chromium',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run ${isCI ? 'preview' : 'dev'} -- --host ${host} --port ${port} --strictPort`,
    url: baseURL,
  },
})
