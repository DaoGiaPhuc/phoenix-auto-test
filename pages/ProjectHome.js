class ProjectHome {
    constructor(page) {
        this.page = page
        this.tabActionMenu = this.page.locator('#tabscontent\\:tab-menu-action')
        this.contextLeftObject = this.page.locator('.contextleftObject')
        this.treeElement = this.page.locator('[id="tabscontent:widgetFavTreeProjectTree:treeLeft_project:0"]')

        this.objectTitlePanel = this.page.locator('#tabscontent\\:tabView\\:objectTitle_1')
        this.nameField = this.page.locator('input[class*="NOM_INTERFACE"]')
        this.desciptionField = this.page.locator('textarea[class*="DESCRIPTION"]')
        
    }

//Click Function
    async clickTabAction() {
        await this.page.locator('#tabscontent\\:tabAction').click()
        await this.tabActionMenu.waitFor({ state: 'visible' })
    }

    async addNewObject(objectType){
        await this.page.locator('#tabscontent\\:project-creation').click()

        await this.page.getByRole('textbox', { name: 'Filter...' }).pressSequentially(objectType, { delay: 68 })

        await this.page.locator('.ui-menuitem.found').first().waitFor({ state: 'visible' })
        await this.page.locator('.ui-menuitem.found').getByText(objectType, { exact: true }).click()
        await this.page.locator('.contextleftObject').waitFor({ state: 'visible' })
    }

    async expandAdvancedParameters(advancedParametersText) {
        await this.page.locator('.bw-accordion-title').filter({ hasText: advancedParametersText }).click()
        await this.page.locator('.accordionParameter').locator('.ui-accordion-content').waitFor({ state: 'visible' })
    }

    async clickObject(iconClass, name = null) {
        let locator = this.page.locator(`.ui-treenode-icon.${iconClass}`)

        if (name) {
            locator = locator.locator('xpath=..').filter({ hasText: name })
        } 
        else {
            locator = locator.locator('xpath=../..')
        }

        await locator.first().click()

        
    }

    async expandFolder(folderName) {
        await this.page
            .locator('.ui-treenode-label')
            .filter({ hasText: folderName })
            .locator('xpath=..')
            .locator('.ui-tree-toggler')
            .click()
    }

    async clickContextMenu(role) {
        await this.page
            .locator('.menuOncontext')
            .locator('a')
            .filter({ hasText: role })
            .click()

        await this.page.waitForTimeout(1000)
        const takeOverButton = this.page.getByRole('button', { name: 'Take over' })

        if (await takeOverButton.isVisible()) {
            await takeOverButton.click()
        }
    }

//Fill function
    async fillName(name) {
        await this.nameField.pressSequentially(name, { delay: 68 })
    }

    async fillDescription(description) {
        await this.page.locator('#tabscontent\\:tabView\\:textarea_0_1').pressSequentially(description, { delay: 68 })
    }

    async clickSave() {
        await this.page.locator('.saveButton').click()
    }

//Delete function
    async clearName() {
        await this.nameField.first().click()
        await this.nameField.clear()
    }

    async clearDescription() {
        await this.page.locator('#tabscontent\\:tabView\\:textarea_0_1').clear()
    }

//Mapping function
    locateCloseTitle() {
        return this.tabActionMenu.getByText('Schließen', { exact: true })
    }

    locateCloseAllOption() {
        return this.tabActionMenu.getByText('Alle schließen', { exact: true })
    }

    locateCloseAllExceptOption() {
        return this.tabActionMenu.getByText('Alle schließen (außer Projektobjekte)')
    }

    locateSaveButton() {
        return this.page.locator('.saveButton')
    }

    locateDeleteButton() {
        return this.page.locator('.deleteButton')
    }

    locateProtectLabel() {
        return this.page.locator('#tabscontent\\:tabView\\:protectedSwitchLabel')
    }

    locateObjectIcon(iconClass) {
        return this.page.locator(`.ui-icon-object.${iconClass}`)
    }
}

module.exports = { ProjectHome }