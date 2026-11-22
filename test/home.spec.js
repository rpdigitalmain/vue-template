import { expect, test } from '@playwright/test'

test('renders the template homepage', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1, name: 'Vue Template' })).toBeVisible()
})
