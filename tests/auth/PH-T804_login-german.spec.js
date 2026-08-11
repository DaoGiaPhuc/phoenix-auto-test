/* 
 1. NAVIGATE: mở trang...? 
    - Với case này là login, nên navigate tới trang login: localhost:8443/blueway/designer

 2. FIND: cần tìm element nào? bằng cách nào? 
    - Với case này là login, cần tìm 3 element: username, password (text hiển thị) và button login

 3. CHECK: kiểm tra placeholder hay text hay gì?
    - label username và pass word: kiểm tra text (nội dung)
    - button login: kiểm tra text (nội dung)
 4. ACT: fill + click
    - Kiểm tra có đúng đổi sang tiếng Đức chưa (3 expect)
    - fill username
    - fill password 
    - click button
 5. VERIFY: sau login, expect gì? 
    - Username -> Benutzername
    - Password -> Passwort
    - Sign in -> Anmelden
    Sau khi login:
    - URL thay đổi từ localhost:8843/auth (tự động redirect sang localhost:8443/blueway/designer
*/

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

const languages = {
    de: { 
        locale: 'Deutsch',
        username: 'Benutzername', 
        password: 'Passwort', 
        button: 'Anmelden' 
    },
    en: { 
        locale: 'English',
        username: 'Username', 
        password: 'Password', 
        button: 'Sign In' 
    },
    fr: { 
        locale: 'Français',
        username: 'Nom d\'utilisateur',
        password: 'Mot de passe',
        button: 'Connexion'
    }
}

const lang = languages.de  // <-- change language here

test(`PH-T804: Login page ${lang.locale} translation`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://localhost:8443/blueway/designer/', { waitUntil: 'load' })

    // Select language
    await loginPage.selectLanguage(lang.locale)

    // Verify translation
    await expect(page.locator('label[for="username"]')).toHaveText(lang.username)
    await expect(page.locator('label[for="password"]')).toHaveText(lang.password)
    await expect(page.locator('#kc-login')).toHaveAttribute('value', lang.button)

    // Login
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD)

    // Verify URL
    await expect(page).toHaveURL('https://localhost:8443/blueway/designer/')
})