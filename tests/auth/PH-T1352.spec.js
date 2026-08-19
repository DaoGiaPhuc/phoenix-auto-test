/*
0. TYPE
    - Navigation + UI verification + Dialog interaction

1. NAVIGATE
    s1: 
        /blueway/designer --> expand screen folder "common_attribut" --> click screen "qa_common_attribut" --> Editor --> Open Editor
    s2: 
        Screen editor --> click "Other actions" --> click "Translation"

2. FIND
    s1: 
        screen folder "common_attribut" trong project tree
        screen "qa_common_attribut" trong folder đó
        ribbon toolbar
        included "Other actions" button
    s2: 
        Translation dialog
        column header "Element name"
        column header "Default Language"
        data rows có attribute data-ri
        Close (X) button

3. CHECK
    s1: 
        ribbon toolbar visible
        "Other actions" button visible
    s2: 
        Translation dialog visible
        column "Element name" present
        column "Default Language" present
        count data rows > 0
        sau khi close → dialog không còn visible

4. ACT
    s1:
        - Login
        - Navigate /blueway/designer
        - Mở project chứa folder "common_attribut"
        - Expand folder "common_attribut"
        - Click screen "qa_common_attribut"
        - Click & open Editor 
        - Chờ ribbon toolbar xuất hiện
    s2: 
        - Click "Other actions"
        - Click "Translation"
        - Verify dialog + columns + rows
        - Click Close (X)
        - Verify dialog đã đóng

5. VERIFY
    s1: 
        ribbon toolbar visible
        "Other actions" button visible
    s2: 
        dialog visible
        "Element name" header present
        "Default Language" header present
        data rows count > 0
        dialog hidden sau khi close
*/

const { test, expect } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType } = require('../../pages')

test('PH-T1352', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const designerHome = new DesignerHome(page); 
    const projectHome = new ProjectHome(page);
    const projectEditor = new ProjectEditor(page);

    // Setup
    await page.goto('https://localhost:8443/blueway/designer/', { waitUntil: 'load' })
    await loginPage.selectLanguage('English')
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD)
    await expect(page).toHaveURL(/.*\/blueway\/designer/)
    await designerHome.openProject('AUTO_TEST')

    const objectType = ObjectType.Screen; // <-- Replace with the actual object type you want to click
    await projectHome.expandFolder('common_attribut')
    await projectHome.clickObject(objectType, 'qa_common_attribut') 
    await projectHome.clickContextMenu('Editor')
    await projectHome.page.waitForTimeout(1000)
    const takeOverButton = projectHome.page.getByRole('button', { name: 'Take over' })

    if (await takeOverButton.isVisible()) {
        await takeOverButton.click()
    }

//S1:  
    await test.step('Step 1: Verify that the ribbon toolbar and "Other actions" button are visible', async () => {
        await expect.soft(projectEditor.ribbonToolbar.locator(':visible').first()).toBeVisible()
        await expect.soft(projectEditor.otherAction).toBeVisible()
    })

//S2: 
    await test.step('Step 2: Verify Translation dialog functionality', async () => {
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')  
        await projectEditor.translationWindow.waitFor({ state: 'visible' })
        
        await expect(projectEditor.translationTable.getByText('Element name', { exact: true }).filter({ visible: true })).toBeVisible()        
        await expect(projectEditor.translationWindow.getByText('Default language', { exact: true })).toBeVisible() 
        await expect(projectEditor.translationWindow.locator('tr[data-ri]').first()).toBeVisible()
        await projectEditor.translationWindow.locator('.ui-dialog-titlebar-icon.ui-dialog-titlebar-close.ui-corner-all').click()
        await expect(projectEditor.translationWindow).toBeHidden()

    })

})