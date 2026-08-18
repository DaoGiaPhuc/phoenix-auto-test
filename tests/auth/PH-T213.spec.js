/*
0. TYPE
    - liên hoàn
1. NAVIGATE
    s1: trang tạo Editic (nằm trong add to prj)
    s2: trang editic, field name
    s3: Save button
    s4: Save button click
    s5: Tree view bên trái

2. FIND
    s1: toàn bộ trang editic, field name
    s2: field name 
    s3: Save button
    s4: Save button click
    s5: Object Editic đang có sẵn, nếu chưa thì in ra logs "Need to create a new Editic first"

3. CHECK
    s1: Editic left context & field name visible
    s2: field name content
    s3: State of save button 
    s4: Save button click
    s5: Tree view bên trái, kiểm tra xem có Editic vừa tạo hay không

4. ACT
    - đăng nhập
    - mở 1 project bất kì
    - Chọn ngôn ngữ English
    - Click Add to Object

    s1:
        - chọn Editic
        - Kiểm tra Editic & Name field: visible? (veri)

    s2: 
        - Fill name field with string: "My Template"
    
    s3: 
        - Kiểm tra Save button: disable khi name field empty (veri)

    s4:
        - Click Save button
    s5:
        - Kiểm tra xem có Editic nào hay không
        - Click vào Object Editic (tạo function ClickObject(iconID) ở ProjectHome.js) iconID lần này: class="ui-treenode-icon ui-icon BWI IDOCUMENTATION"
5. VERIFY
    s1: The template creation form is displayed with the name field
    s2: An inline error message appears immediately: "Template names cannot contain space"
    s3: The Save/Confirm button is disabled
    s4: The button is not clickable; no template is created
    s5: The template opens normally with no error displayed

*/

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DesignerHome } = require('../../pages/DesignerHome');
const { ProjectHome } = require('../../pages/ProjectHome');
const { ObjectType } = require('../../pages/ObjectType')

test('PH-T213: Check translation for Editic creation form in English', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const designerHome = new DesignerHome(page);
    const projectHome = new ProjectHome(page);

    // Login
    await page.goto('https://localhost:8443/blueway/designer/', { waitUntil: 'load' })
    await loginPage.selectLanguage('English');
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
    
    await expect(page).toHaveURL(/.*\/blueway\/designer/)

    // Open a project (assuming the first project in the list)
    await designerHome.openFirstProject();

    // Click "Add to Object" and select "Editic"
    
    await projectHome.addNewObject('Editic');


// S1: Verify that the Editic creation form is displayed with the name field
    await test.step('Step 1: Verify that the Editic creation form is displayed with the name field', async () => {
        await expect(projectHome.contextLeftObject).toBeVisible();
        await expect(projectHome.page.locator('#tabscontent\\:tabView\\:edittext_0_0')).toBeVisible();
    });
    
// S2: Fill the name field with a string containing spaces
    await test.step('Step 2: Fill the name field with a string containing spaces', async () => {
        await projectHome.fillName('My Template');
        await expect.soft(projectHome.page.locator('.ui-growl-title')).toHaveText("Template names cannot contain spaces", { timeout: 2000 });
    });

// S3: Verify that the Save button is disabled
    await projectHome.clearName();
    await test.step('Step 3: Verify that the Save button is disabled', async () => {
        await expect.soft(projectHome.locateSaveButton(), 'This button must be disabled when the name field is empty').toBeDisabled({ timeout: 2000 });
    });

// S4: Attempt to click the Save button and verify that no template is created
    await test.step('Step 4: Attempt to click the Save button and verify that no template is created', async () => {
        const beforeTreeElement = await projectHome.treeElement.count() // Assuming the new template would appear in the tree if created
        await projectHome.clickSave();
        // verification logic here
        await expect(projectHome.treeElement).toHaveCount(beforeTreeElement)
    });

// S5: Click on the Editic object in the tree view and verify that it opens normally with no error displayed
    await test.step('Step 5...', async () => {
        const objectType = ObjectType.Editic; // <-- Replace with the actual object type you want to click
        await projectHome.clickObject(objectType)
        await projectHome.waitForObjectPanel()
        await expect(projectHome.locateObjectIcon(objectType)).toBeVisible()
    })


})