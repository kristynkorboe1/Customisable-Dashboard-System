import { test, expect } from '@playwright/test'

test("Add and delete tab", async ({ page }) => {
    await page.goto("http://127.0.0.1:5173/")
    page.pause()

    // Expand and hide sidebar
    await page.click(".toggle-menu")
    await page.click(".toggle-menu")

    // Add new tab
    // Invalid tab name
    await page.type("#tabName", "")
    await page.click("#newTab")
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual("Tab name cannot be empty")
        await dialog.accept()
    })

    await page.type("#tabName", " ")
    await page.click("#newTab")
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual("Tab name cannot be empty")
        await dialog.accept()
    })

    // Valid tab name
    await page.type("#tabName", "Glucose board")
    await page.click("#newTab")
    const tabs = await page.locator(".tabButtons")
    await expect(tabs).toContainText("Glucose board")
    const tabName = await page.locator("h2")
    await expect(tabName).toContainText("Glucose board")
    const tabsList = await page.locator("#tabsList")
    await expect(tabsList).toContainText("Glucose board")

    // Delete tab
    await page.click("#tabsSelect")
    await page.click("option text='Glucose board'")
    await page.click(".removeTab")
})