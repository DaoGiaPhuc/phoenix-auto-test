class ProjectEditor {
    constructor(page) {
        this.page = page;
        this.ribbonToolbar = this.page.locator('.ui-ribbon-groups')
        this.otherAction = this.page.locator('#tabscontent\\:tabView\\:menu-others-2')
        this.overlayPanel = this.page.locator('.menu-others')
        this.translationWindow = this.page.locator('#tabscontent\\:tabView\\:translationDialog_2')
        this.translationTable = this.translationWindow.locator('#tabscontent\\:tabView\\:mdmTranslationCode2')
        this.translationRow = this.translationTable.locator('tr[data-ri]')
        this.searchNameBox = this.page.locator('[aria-label*="Element name"]').locator('input.ui-inputfield')
        this.searchValueBox = this.page.locator('[aria-label*="Default value"]').locator('input.ui-inputfield')
        this.translationColumnHeader = this.translationTable.locator('.ui-datatable-scrollable-header-box')
        this.translationLanguageDropdown = this.page.locator('.ui-selectcheckboxmenu-multiple-container.ui-widget.ui-inputfield.ui-state-default.ui-corner-all')
        this.translationDefaultLanguageDropdown = this.page.locator('.ui-selectonemenu.ui-widget.ui-state-default.ui-corner-all.admin-translation-lang')
    }

    async clickMenuOther(content) {
        await this.overlayPanel.waitFor({ state: 'visible' })
        await this.overlayPanel.getByText(content, { exact: true }).click()
    }

    async fillFilter(filter) {
        await this.searchNameBox.pressSequentially(filter, { delay: 68 })
    }

    async fillValueFilter(filter){
        await this.searchValueBox.pressSequentially(filter, { delay: 68 })
    }

    async closeTranslationDialog(){
        await this.translationWindow.locator('.ui-dialog-titlebar-icon.ui-dialog-titlebar-close.ui-corner-all').click()
    }
    
    async selectTranslationLanguage(language) {
        await this.page
            .locator('[role="group"].ui-selectcheckboxmenu-items li')
            .filter({ hasText: language })
            .locator('.ui-chkbox-box')
            .click()
    }

    async selectDefaultLanguage(language) {
        await this.page
            .locator('[role="listbox"].ui-selectonemenu-items')
            .getByRole('option', { name: language, exact: true })
            .click()
    }

}

module.exports = { ProjectEditor } 