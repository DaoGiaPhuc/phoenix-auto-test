const { test } = require('../fixtures')
const { expect } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType } = require('../../pages')

test('PH-T1358', async ({ openTestProject }) => {
    const projectHome = new ProjectHome(openTestProject)
    const projectEditor = new ProjectEditor(openTestProject)

    const objectType = ObjectType.Screen; // <-- Replace with the actual object type you want to click
    await projectHome.expandFolder('list_view')
    await projectHome.clickObject(objectType, 'qa_listview_component') 
    await projectHome.clickContextMenu('Editor')

//S1: A row with element name "ListViewMultiBlock_emptyMsg" is present in the translation table.
    await test.step('Step 1: Verify that a row with element name "ListViewMultiBlock_emptyMsg" is present in the translation table.', async () => {
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')
        await projectEditor.translationWindow.waitFor({ state: 'visible' })
        await expect.soft(
            projectEditor.translationRow.filter({ hasText: 'ListViewMultiBlock_emptyMsg' }).first(),
            `Row "ListViewMultiBlock_emptyMsg" must be present`
        ).toBeVisible()
        await projectEditor.closeTranslationDialog()
    })

//S2: A row with element name "name" is present in the translation table
    await test.step('Step 2: Verify that a row with element name "name" is present in the translation table.', async () => {
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')
        await projectEditor.translationWindow.waitFor({ state: 'visible' })
        await expect.soft(
            projectEditor.translationRow.filter({ hasText: 'name' }).first(),
            `Row "name" must be present`
        ).toBeVisible()
        await projectEditor.closeTranslationDialog()
    })

//S3: A row with element name "age" is present in the translation table
    await test.step('Step 3: Verify that a row with element name "age" is present in the translation table.', async () => {
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')
        await projectEditor.translationWindow.waitFor({ state: 'visible' })
        await expect.soft(
            projectEditor.translationRow.filter({ hasText: 'age' }).first(),
            `Row "age" must be present`
        ).toBeVisible()
        await projectEditor.closeTranslationDialog()
    })

//S4: The Default Language value for "name" and the Default Language value for "age" are not equal — they are distinct strings
    await test.step('Step 4: Verify that the Default Language value for "name" and the Default Language value for "age" are not equal — they are distinct strings.', async () => {
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')  
        await projectEditor.translationWindow.waitFor({ state: 'visible' })

        const nameValue = await projectEditor.translationRow
            .filter({ hasText: 'name' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        const ageValue = await projectEditor.translationRow
            .filter({ hasText: 'age' })
            .locator('td')
            .nth(1)
            .locator('label')
            .textContent()

        expect(nameValue).not.toBe(ageValue)
        await projectEditor.closeTranslationDialog()
    })
})