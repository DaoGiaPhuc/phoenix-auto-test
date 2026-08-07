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

test.describe('PH-T804 - Login page German translation', () => {
    test('should display German labels on login page', async ({ page }) => {

        await page.goto('https://localhost:8443/blueway/designer/')
        

        await page.locator('#kc-current-locale-link').click() 
        await page.getByRole('menuitem', { name: 'Deutsch' }).click()

        // PHẦN 1: Verify translation
        await expect(page.locator('label[for="username"]')).toHaveText('Benutzername')  
        await expect(page.locator('label[for="password"]')).toHaveText('Passwort') 
        await expect(page.locator('#kc-login')).toHaveAttribute('value', 'Anmelden') 

        // PHẦN 2: Thực hiện login
        await page.locator('#username').fill('admin')
        await page.locator('#password').fill('admin')
        await page.locator('#kc-login').click()

        // PHẦN 3: Verify login thành công 
        await expect(page).toHaveURL('https://localhost:8443/blueway/designer/')
    })
}) 