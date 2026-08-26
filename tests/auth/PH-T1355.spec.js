/*

0. TYPE: Edit + Save data

1. NAVIGATE
   - Mở Translation dialog
   - Chọn language picker → "en"

2. FIND
   - Language picker
   - Column "Translation - en"
   - Row "Check_Box59_tooltip"
   - Editable cell trong row đó
   - Save button
   - Loader (loading indicator)

3. CHECK
   - Column "Translation - en" tồn tại
   - Cell hiển thị đúng text sau khi nhập + Tab
   - Save hoàn tất không lỗi
   - Dialog đóng sau khi save

4. ACT
   - Setup: login, mở project, expand folder, mở screen, mở Translation dialog
   - Chọn language "en" từ picker
   - Click vào editable cell của row "Check_Box59_tooltip"
   - Nhập "Automated test tooltip translation"
   - Press Tab
   - Verify cell hiển thị đúng text (verify)
   - Click Save
   - Chờ loader biến mất
   - Đóng dialog

5. VERIFY
   - Cell hiển thị đúng text sau Tab
   - Save không lỗi, dialog đóng thành công

*/

const { test } = require('../fixtures')
const { expect } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType } = require('../../pages')

test('PH-T1355', async ({ openTestProject }) => {
    const projectHome = new ProjectHome(openTestProject)
    const projectEditor = new ProjectEditor(openTestProject)

    const objectType = ObjectType.Screen; // <-- Replace with the actual object type you want to click
    await projectHome.expandFolder('common_attribut')
    await projectHome.clickObject(objectType, 'qa_common_attribut') 
    await projectHome.clickContextMenu('Editor')

//S1: The Translation dialog is open and a "Translation - en" editable column is present in the table.
    await test.step('Step 1: The Translation dialog is open and a "Translation - en" editable column is present in the table.', async () => {
        await projectEditor.otherAction.click()
        await projectEditor.clickMenuOther('Translation')  
        await projectEditor.translationWindow.waitFor({ state: 'visible' })

        //READ THIS
        console.log('This will be sucess If you choose another language, select translate English, the column header will change to "Translation - en" and still included when you switch back to default language.)')
        
        await projectEditor.translationDefaultLanguageDropdown.click()
        await projectEditor.page.waitForTimeout(1000)
        await projectEditor.selectDefaultLanguage('Croatian')
        await projectEditor.page.waitForTimeout(1000)
        
        await projectEditor.translationLanguageDropdown.click()
        await projectEditor.page.waitForTimeout(1000)
        await projectEditor.selectTranslationLanguage('English') // <-- It's will fail here if you dont change default language to another language first, then select English
        await projectEditor.page.waitForTimeout(1000)

        await expect.soft(projectEditor.translationColumnHeader,'Column headers should include "Translation - en"').toHaveText(/Translation - en/)
    })

/*S2:   • The cell output label displays "Automated test tooltip translation" immediately after Tab is pressed.
        • The Save button completes without error and the dialog closes successfully.
*/
    await test.step('Step 2: The cell output label displays "Automated test tooltip translation" immediately after Tab is pressed. The Save button completes without error and the dialog closes successfully.', async () => {
        const editableCell = projectEditor.translationRow
            .filter({ hasText: 'Check_Box59_tooltip' })
            .locator('td')
            .nth(3)

        await editableCell.click()
        await editableCell.pressSequentially('Automated test tooltip translation', { delay: 68 })
        await editableCell.press('Tab')
        await expect.soft(editableCell, 'Editable cell should display the correct translation').toHaveText('Automated test tooltip translation')

        await projectEditor.page.waitForTimeout(1000) 
        await expect.soft(projectEditor.translationRow
            .filter({ hasText: 'Check_Box59_tooltip' })
            .locator('td').nth(3), 'Translation should be saved correctly')
            .toHaveText('Automated test tooltip translation')
        
        await projectEditor.clickTranslationSave()
        await projectEditor.translationWindow.waitFor({ state: 'hidden' })
        await expect.soft(projectEditor.translationWindow, 'Translation window should be hidden').toBeHidden()
    })
})