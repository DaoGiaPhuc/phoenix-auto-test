/*
1. NAVIGATE: Cần mở trang nào? 
   - Precondition không có
   - Mở 1 project bất kì trong trang: https://localhost:8443/blueway/designer/

2. FIND: Cần tìm element nào?
   Có 3 element cần verify: list item: tittle text, option 1&2 text

3. CHECK: Kiểm tra gì ở mỗi element?
    tittle to have text
    opt 1: toHaveText('Alle schließen')
    option 2: toHaveText('Alle schließen (außer Projektobjekte)')

4. ACT: Cần làm gì trước khi verify?
    - Mở URL Designer, wait
    - Login USERNAME, PASSWORD (.env)
    - wait
    - Mở Project bất kì, chưa có thì tạo mới
    - wait
    - Click button tabAction
    - wait
    - Check List item: tittle, option 1&2

5. VERIFY: Kết quả mong đợi là gì?
   Expected result nói gì?
    - Title: Close => Title in German: Schließen
    - Option 1: Close all => Title in German: Alle schließen
    - Option 2: Close all (except project objects) => Title in German: Alle schließen (außer Projektobjekte)

*/
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DesignerHome } = require('../../pages/DesignerHome');
const { ProjectHome } = require('../../pages/ProjectHome');

const languages = {
    de: {
        locale: 'Deutsch',
        closeTitle: 'Schließen',
        closeAll: 'Alle schließen',
        closeAllExcept: 'Alle schließen (außer Projektobjekte)'
    },
    en: {
        locale: 'English',
        closeTitle: 'Close',
        closeAll: 'Close all',
        closeAllExcept: 'Close all (except project objects)'
    },
    fr: {
        locale: 'Français',
        closeTitle: 'Fermer',
        closeAll: 'Fermer tout',
        closeAllExcept: 'Fermer tout (sauf objets projet)'
    }
}

const lang = languages.de  // <-- change language here

test(`PH-T827: Verify Close button translation in ${lang.locale}`, async ({ page }) => {
   const loginPage = new LoginPage(page); 
   const designerHome = new DesignerHome(page);
   const projectHome = new ProjectHome(page);
   
   await page.goto('https://localhost:8443/blueway/designer/', { waitUntil: 'load' })
   
   // Login
   await loginPage.selectLanguage(lang.locale)
   await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD)

   // Wait for Designer Home to load
   await expect(page).toHaveURL(/.*\/blueway\/designer/)

   //Open a project (assuming the first project in the list)
   await designerHome.openFirstProject()

   //Click tabAction
   await projectHome.clickTabAction()
   
   // Verify translations
   await expect(projectHome.locateCloseTitle()).toHaveText(lang.closeTitle)
   await expect(projectHome.locateCloseAllOption()).toHaveText(lang.closeAll)
   await expect(projectHome.locateCloseAllExceptOption()).toHaveText(lang.closeAllExcept)

})

