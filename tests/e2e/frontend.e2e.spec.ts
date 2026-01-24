import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    await page.goto(baseURL)

    await expect(page).toHaveTitle(/Payload Website Template/)

    const heading = page.locator('h1').first()

    await expect(heading).toHaveText('Payload Website Template')
  })
})
