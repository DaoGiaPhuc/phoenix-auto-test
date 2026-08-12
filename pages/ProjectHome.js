class ProjectHome {
    constructor(page) {
        this.page = page
        this.tabActionMenu = this.page.locator('#tabscontent\\:tab-menu-action')
        this.contextLeftObject = this.page.locator('.contextleftObject')
    }

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
        await this.page.locator('.accordionParameter')
            .locator('.ui-accordion-content')
            .waitFor({ state: 'visible' })
    }

    async fillName(name) {
        await this.page.locator('#tabscontent\\:tabView\\:edittext_0_0').pressSequentially(name, { delay: 68 })
    }

    async fillDescription(description) {
        await this.page.locator('#tabscontent\\:tabView\\:textarea_0_1').pressSequentially(description, { delay: 68 })
    }

    async clickSave() {
        await this.page.locator('.saveButton').click()
    }



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
}

module.exports = { ProjectHome }