// tests/fixtures.js
const { test: base } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor } = require('../pages')

const test = base.extend({
    // Fixture: đã login sẵn
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await page.goto('https://localhost:8443/blueway/designer/', { waitUntil: 'load' })
        await loginPage.selectLanguage('English')
        await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD)
        await page.waitForURL(/.*\/blueway\/designer/)
        await use(page)  // ← test chạy ở đây
    },

    // Fixture: đã login + mở project
    openTestProject: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        const designerHome = new DesignerHome(page)
        await page.goto('https://localhost:8443/blueway/designer/', { waitUntil: 'load' })
        await loginPage.selectLanguage('English')
        await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD)
        await page.waitForURL(/.*\/blueway\/designer/)
        await designerHome.openProject('AUTO_TEST')
        await use(page)  // ← test chạy ở đây
    }
})

module.exports = { test }