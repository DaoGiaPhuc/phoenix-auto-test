const { test } = require('../fixtures')
const { expect } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType } = require('../../pages')

test('PH-T1357', async ({ openTestProject }) => {
    const projectHome = new ProjectHome(openTestProject)
    const projectEditor = new ProjectEditor(openTestProject)

    const objectType = ObjectType.Screen; // <-- Replace with the actual object type you want to click
    await projectHome.expandFolder('input_components')
    await projectHome.clickObject(objectType, 'qa_input_component') 
    await projectHome.clickContextMenu('Editor')

//S1: All three rows — "Edit_Text_tooltip", "Edit_Text_formatMsg", and "Edit_Text_emptyMsg" — are present in the translation table.
    const elementsToVerify = [
        'Edit_Text_tooltip', 
        'Edit_Text_formatMsg', 
        'Edit_Text_emptyMsg'   
    ]

    for (const elementName of elementsToVerify) {
        await test.step(`Step 1: Verify row "${elementName}" is present`, async () => {
            await projectEditor.otherAction.click()
            await projectEditor.clickMenuOther('Translation')
            await projectEditor.translationWindow.waitFor({ state: 'visible' })
            await expect.soft(
                projectEditor.translationRow.filter({ hasText: elementName }).first(),
                `Row "${elementName}" must be present`
            ).toBeVisible()
            await projectEditor.closeTranslationDialog()
        })
    }

//S2: The Default Language value for "Edit_Text7_formatMsg" is exactly "format is not clear !" (non-empty).
    await test.step('Step 2: Verify that the Default Language value for "Edit_Text7_formatMsg" is exactly "format is not clear !" (non-empty).', async () => {
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')  
        await projectEditor.translationWindow.waitFor({ state: 'visible' })

        const formatMsgValue = await projectEditor.translationRow
            .filter({ hasText: 'Edit_Text7_formatMsg' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        await expect.soft(formatMsgValue, 'Default Language value for "Edit_Text7_formatMsg" should be "format is not clear !"').toBe('format is not clear !')
        await projectEditor.closeTranslationDialog()
    })
    
})