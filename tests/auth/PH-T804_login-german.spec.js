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

const languages = [
    { 
        locale: 'Deutsch',           // GERMAN
        username: 'Benutzername', 
        password: 'Passwort', 
        button: 'Anmelden' 
    },
    { 
        locale: 'English',           // ENGLISH
        username: 'Username', 
        password: 'Password', 
        button: 'Sign In' 
    },
    {
        locale: 'Français',           // FRENCH
        username: 'Nom d\'utilisateur',
        password: 'Mot de passe',
        button: 'Connexion'
    }
]

for (const { locale, username, password, button } of languages) {
    test(`PH-T804: Login page ${locale} translation`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('https://localhost:8443/blueway/designer/', { waitUntil: 'load' })

        // Chọn ngôn ngữ
        await loginPage.selectLanguage(locale)

        // Verify translation
        await expect(page.locator('label[for="username"]')).toHaveText(username)
        await expect(page.locator('label[for="password"]')).toHaveText(password)
        await expect(page.locator('#kc-login')).toHaveAttribute('value', button)

        // Login
        await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD)

        // Verify URL
        await expect(page).toHaveURL('https://localhost:8443/blueway/designer/')
    })
}