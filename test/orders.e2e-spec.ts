import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-10', exact: true }),
  ).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-11', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-16', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-10', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-11', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-16', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-10', exact: true }),
  ).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByRole('button', { name: 'Filtrar resultado' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-11', exact: true }),
  ).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do client').fill('customer-11')
  await page.getByRole('button', { name: 'Filtrar resultado' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-11', exact: true }),
  ).toBeVisible()
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filtrar resultado' }).click()

  await expect(page.getByRole('cell', { name: 'Pendente' })).toHaveCount(4)
})
