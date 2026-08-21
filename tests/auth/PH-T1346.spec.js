const { test, expect } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType } = require('../../pages')

test('PH-T1346', async ({ page }) => {
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

//S1: The _tooltip translation value is different from the base label translation value.
    await test.step('Step 1: Verify that the _tooltip translation value is different from the base label translation value', async () => {
        const labelValue = await projectEditor.translationRow
            .filter({ hasText: 'Autocomplete' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        const tooltipValue = await projectEditor.translationRow
            .filter({ hasText: 'Autocomplete_tooltip' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        await expect.soft(labelValue).not.toBe(tooltipValue)
        await projectEditor.closeTranslationDialog()
    })

//S2: The _emptyMsg translation value is different from the base label translation value.
    await projectEditor.otherAction.click()
    await projectEditor.clickMenuOther('Translation')  
    await projectEditor.translationWindow.waitFor({ state: 'visible' })
    
    await test.step('Step 2: Verify that the _emptyMsg translation value is different from the base label translation value', async () => {
        const labelValue = await projectEditor.translationRow
            .filter({ hasText: 'Autocomplete' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        const emptyMsgValue = await projectEditor.translationRow
            .filter({ hasText: 'Autocomplete_emptyMsg' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        await expect.soft(labelValue).not.toBe(emptyMsgValue)
        await projectEditor.closeTranslationDialog()
    })
})