class ProjectHome {
    constructor(page) {
        this.page = page
        this.tabActionMenu = this.page.locator('#tabscontent\\:tab-menu-action')
    }

    async clickTabAction() {
        await this.page.locator('#tabscontent\\:tabAction').click()
        await this.tabActionMenu.waitFor({ state: 'visible' })
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
}

module.exports = { ProjectHome }