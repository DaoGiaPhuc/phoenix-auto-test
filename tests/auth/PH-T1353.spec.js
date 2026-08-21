/*
0. TYPE
1. NAVIGATE
    s1: 
        Screen editor --> click "Other actions" --> click "Translation"
    s2:
        Translation dialog --> click search box --> type "Check_Box59" --> press Enter
2. FIND
    s1:
        Translation dialog
        data rows có attribute data-ri
    s2:
        Translation dialog
        search results for "Check_Box59"
3. CHECK
    s1:
        Translation dialog visible
        count data rows > 0
    s2:
        Translation dialog visible
        count search results > 0
4. ACT
        - Login
        - Navigate /blueway/designer
        - Mở project chứa folder "common_attribut"
        - Expand folder "common_attribut"
        - Click screen "qa_common_attribut"
        - Click & open Editor 
    s1:
        - Click "Other actions"
        - Click "Translation"
        - Verify dialog + columns + rows
        - Click Close (X)
        - Verify dialog đã đóng
    s2:
        - Click search box
        - Type "Check_Box59"
        - Press Enter
        - Wait for the table to refresh
        - Count visible data rows 
    s3:
        - Clear the Element name filter input
        - Wait for the table to refresh.
        - Count the visible data rows and compare with the total recorded in step 1.
        - Then close the dialog.

5. VERIFY
    s1:
        • The Translation dialog opens and the data row count is greater than 1.
    s2:
        • The number of visible data rows is greater than zero and is strictly less than the total row count recorded in step 1.
    s3:
        • The visible data row count is equal to the total row count from step 1 — all rows are restored after clearing the filter.

*/

const { test, expect } = require('@playwright/test')
const { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType } = require('../../pages')

test('PH-T1353', async ({ page }) => {
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

    const totalRows = await projectEditor.translationRow.count()

//S1: Open the Translation dialog and verify that it is visible and contains data rows
    await test.step('Step 1: Open the Translation dialog and verify that it is visible and contains data rows', async () => {

        await expect(projectEditor.translationWindow).toBeVisible()
        await expect.soft(totalRows).toBeGreaterThan(1)
    })

//S2: Search for "Check_Box59" in the Translation dialog and verify that the number of visible data rows is greater than zero and less than the total row count
    await test.step('Step 2: Search for "Check_Box59" in the Translation dialog and verify that the number of visible data rows is greater than zero and less than the total row count', async () => {
        await projectEditor.searchNameBox.click()
        await projectEditor.fillFilter('Check_Box59')
        await projectEditor.searchNameBox.press('Enter')
        const filteredRows = await projectEditor.translationWindow.locator('tr[data-ri]').count()
        expect.soft(filteredRows).toBeGreaterThan(0)
        expect.soft(filteredRows).toBeLessThan(totalRows)
    })

//S3: Clear the search filter and verify that the number of visible data rows is equal to the total row count from step 1
    await test.step('Step 3: Clear the search filter and verify that the number of visible data rows is equal to the total row count from step 1', async () => {
        await projectEditor.searchNameBox.clear()
        const restoredRows = await projectEditor.translationWindow.locator('tr[data-ri]').count()
        await projectEditor.searchNameBox.press('Enter')
        await page.waitForTimeout(2000) // Wait for the table to refresh
        await expect.soft(restoredRows).toBe(totalRows)
    })
})
