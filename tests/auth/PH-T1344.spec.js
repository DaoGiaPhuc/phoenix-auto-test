const { test, expect } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType } = require('../../pages')

test('PH-T1344', async ({ page }) => {
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

    await projectEditor.otherAction.click()
    await projectEditor.clickMenuOther('Translation')  
    await projectEditor.translationWindow.waitFor({ state: 'visible' })
//S1: Open the Translation dialog and verify that it is visible and contains data rows
    await test.step('Step 1: Open the Translation dialog and verify that it is visible and contains data rows', async () => {
        await expect(projectEditor.translationWindow,'Translation dialog must be visible').toBeVisible()
        await expect.soft(projectEditor.translationRow.nth(1),'Must add data rows first').toBeVisible()
    })

//S2: A row with the _placeholder suffix is present in the translation table for the edit-text element.
    await test.step('Step 2: A row with the _placeholder suffix is present in the translation table for the edit-text element.', async () => {
        await projectEditor.searchNameBox.click()
        await projectEditor.fillFilter('EditText_placeholder')
        await projectEditor.searchNameBox.press('Enter')

        await expect.soft(projectEditor.translationRow.filter({ hasText: /_placeholder$/ }).first(),'..._placeholder Value must be added first').toBeVisible()
        await projectEditor.closeTranslationDialog()

    })

    await projectEditor.page.waitForTimeout(2000)

//S3: A row with the _default Value suffix is present in the translation table for the edit-text element.
    await test.step('Step 3: A row with the _default Value suffix is present in the translation table for the edit-text element.', async () => {
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')  
        await projectEditor.translationWindow.waitFor({ state: 'visible' })

        await projectEditor.searchNameBox.click()
        await projectEditor.fillFilter('EditText_defaultValue')
        await projectEditor.searchNameBox.press('Enter')

        await expect.soft(projectEditor.translationRow.filter({ hasText: /_defaultValue$/ }).first(),'..._default Value must be added first').toBeVisible()
        await projectEditor.closeTranslationDialog()
    })

})