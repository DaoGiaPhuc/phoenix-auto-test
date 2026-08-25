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

//S1: The Translation dialog opens and the column headers do not include "Translation - en"
    await test.step('Step 1: The Translation dialog opens and the column headers do not include "Translation - en"', async () => {
        const columnHeaders = await projectEditor.translationColumnHeader.allTextContents()
        expect.soft(columnHeaders, 'Column headers should not include "Translation - en"').not.toContain('Translation - en')

        console.log('If you choose another language, select translate English, the column header will change to "Translation - en" and still included when you switch back to default language.)')
    })

/*S2:   • After selecting "en" the table gains a new column whose header reads "Translation - en".
        • The column is visible and editable cells appear in data rows.
*/
    await test.step('Step 2: After selecting "en" the table gains a new column whose header reads "Translation - en". The column is visible and editable cells appear in data rows.', async () => {
        
        //READ THIS
        console.log('This will be sucess If you choose another language, select translate English, the column header will change to "Translation - en" and still included when you switch back to default language.)')
        /*
        await projectEditor.translationDefaultLanguageDropdown.click()
        await projectEditor.page.waitForTimeout(1000)
        await projectEditor.selectDefaultLanguage('Croatian')
        await projectEditor.page.waitForTimeout(1000)
        */

        await projectEditor.translationLanguageDropdown.click()
        await projectEditor.page.waitForTimeout(1000)
        await projectEditor.selectTranslationLanguage('English') // <-- It's will fail here if you dont change default language to another language first, then select English
        await projectEditor.page.waitForTimeout(1000)

        await expect.soft(projectEditor.translationColumnHeader,'Column headers should include "Translation - en"').toHaveText(/Translation - en/)
        
    })
})