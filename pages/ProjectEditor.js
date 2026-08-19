class ProjectEditor {
    constructor(page) {
        this.page = page;
        this.ribbonToolbar = this.page.locator('.ui-ribbon-groups')
        this.otherAction = this.page.locator('#tabscontent\\:tabView\\:menu-others-2')
        this.overlayPanel = this.page.locator('.menu-others')
        this.translationWindow = this.page.locator('#tabscontent\\:tabView\\:translationDialog_2')
        this.translationTable = this.translationWindow.locator('#tabscontent\\:tabView\\:mdmTranslationCode2')
    }

    async clickMenuOther(content) {
        await this.overlayPanel.waitFor({ state: 'visible' })
        await this.overlayPanel.getByText(content, { exact: true }).click()
    }

}

module.exports = { ProjectEditor } 