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

//S1:A row with the _alt suffix is present in the translation table for the image element.
    await test.step('Step 1: A row with the _alt suffix is present in the translation table for the image element.', async () => {
        // Cannot test: Image Row dont have _alt, so cannot verify that the translation table contains rows for image-specific elements and at least one image translation key is present
        // Need confirmation from dev/QA lead about this
        const img_alt = await projectEditor.translationRow.filter({ hasText: /Image/i }).filter({ hasText: '_alt' }, 'Image row with _alt suffix should be present').count()
        expect.soft(img_alt, 'Image row with _alt suffix should be present').toBeGreaterThan(0)
        console.log('Image Row dont have _alt, so cannot verify translation table contents')
    })

//S2: No row with a _tooltip suffix exists for the image element in the translation table.
    await test.step('Step 2: No row with a _tooltip suffix exists for the image element in the translation table.', async () => {
        await projectEditor.closeTranslationDialog()
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')  
        await projectEditor.translationWindow.waitFor({ state: 'visible' })

        const tooltipRow = projectEditor.translationRow.filter({ hasText: /Image/i }).filter({ hasText: '_tooltip' })
        await expect.soft(tooltipRow, 'Tooltip row should not exist for the image element').toHaveCount(0)

    })
})