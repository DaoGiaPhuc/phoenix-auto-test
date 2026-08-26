const { test } = require('../fixtures')
const { expect } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType } = require('../../pages')

test('PH-T1356', async ({ openTestProject }) => {
    const projectHome = new ProjectHome(openTestProject)
    const projectEditor = new ProjectEditor(openTestProject)

    const objectType = ObjectType.Screen; // <-- Replace with the actual object type you want to click
    await projectHome.expandFolder('common_attribut')
    await projectHome.clickObject(objectType, 'qa_common_attribut') 
    await projectHome.clickContextMenu('Editor')

//S1-S7: Verify that the following elements are present in the Translation dialog:
    const elementsToVerify = [
        'Check_Box59', 'Check_Box59_tooltip', 'Check_Box59_emptyMsg',
        'Hyperlink', 'Hyperlink_tooltip', 
        'Radio_Grp63', 'Radio_Grp63_emptyMsg'
    ]

    for (const elementName of elementsToVerify) {
        await test.step(`Verify row "${elementName}" is present`, async () => {
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
    
//S8: The _tooltip translation value is different from the base label translation value.
    await projectEditor.otherAction.click()
    await projectEditor.clickMenuOther('Translation')  
    await projectEditor.translationWindow.waitFor({ state: 'visible' })
    
    await test.step('Step 2: Verify that the _tooltip translation value is different from the base label translation value', async () => {
        
        const labelValue = await projectEditor.translationRow
            .filter({ hasText: 'Check_Box59' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        const tooltipValue = await projectEditor.translationRow
            .filter({ hasText: 'Check_Box59_tooltip' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        expect(labelValue).not.toBe(tooltipValue)
        await projectEditor.closeTranslationDialog()
    })

})