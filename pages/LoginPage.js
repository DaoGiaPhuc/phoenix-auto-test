class LoginPage {
    constructor(page) {
        this.page = page
    }

    // Method 1: Chọn ngôn ngữ
    async selectLanguage(locale) {
        await this.page.locator('#kc-current-locale-link').click()
        await this.page.locator('[role="menu"]').waitFor({ state: 'visible' })
        await this.page.getByRole('menuitem', { name: locale, exact: false }).click()
    }

    // Method 2: Đăng nhập
    async login(username, password) {
        await this.page.locator('#username').fill(username)
        await this.page.locator('#password').fill(password)
        await this.page.locator('#kc-login').click()
    }
}

module.exports = { LoginPage }

