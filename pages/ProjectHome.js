class ProjectHome {
    constructor(page) {
        this.page = page
        this.tabActionMenu = this.page.locator('#tabscontent\\:tab-menu-action')
        this.contextLeftObject = this.page.locator('.contextleftObject')
        this.treeElement = this.page.locator('[id="tabscontent:widgetFavTreeProjectTree:treeLeft_project:0"]')
        this.objectTitlePanel = this.page.locator('#tabscontent\\:tabView\\:objectTitle_1')

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
    async waitForObjectPanel() {
        await this.objectTitlePanel.waitFor({ state: 'visible' })
    }

    async clickObject(iconClass) {
        await this.page.locator(`.ui-treenode-icon.${iconClass}`).first().locator('xpath=../..').click()
    }

//Fill function
    async fillName(name) {
        await this.page.locator('#tabscontent\\:tabView\\:edittext_0_0').pressSequentially(name, { delay: 68 })
    }

    async fillDescription(description) {
        await this.page.locator('#tabscontent\\:tabView\\:textarea_0_1').pressSequentially(description, { delay: 68 })
    }

    async clickSave() {
        await this.page.locator('.saveButton').click()
    }

//Delete function
    async clearName() {
        await this.page.locator('#tabscontent\\:tabView\\:edittext_0_0').clear()
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