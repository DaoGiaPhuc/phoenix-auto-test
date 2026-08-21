class ProjectEditor {
    constructor(page) {
        this.page = page;
        this.ribbonToolbar = this.page.locator('.ui-ribbon-groups')
        this.otherAction = this.page.locator('#tabscontent\\:tabView\\:menu-others-2')
        this.overlayPanel = this.page.locator('.menu-others')
        this.translationWindow = this.page.locator('#tabscontent\\:tabView\\:translationDialog_2')
        this.translationTable = this.translationWindow.locator('#tabscontent\\:tabView\\:mdmTranslationCode2')
        this.translationRow = this.translationTable.locator('tr[data-ri]')
        this.searchNameBox = this.page.locator('[aria-label*="Element name"]').locator('input.ui-inputfield')    }

    async clickMenuOther(content) {
        await this.overlayPanel.waitFor({ state: 'visible' })
        await this.overlayPanel.getByText(content, { exact: true }).click()
    }

    async fillFilter(filter) {
        await this.searchNameBox.pressSequentially(filter, { delay: 68 })
    }

    async closeTranslationDialog(){
        await this.translationWindow.locator('.ui-dialog-titlebar-icon.ui-dialog-titlebar-close.ui-corner-all').click()
    }

}

module.exports = { ProjectEditor } 