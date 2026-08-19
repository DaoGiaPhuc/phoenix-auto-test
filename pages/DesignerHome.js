class DesignerHome {
    constructor(page) {
        this.page = page
    
    }

    async openFirstProject() {
        await this.page.locator('.actionProject').first().click()
        await this.page.waitForLoadState('networkidle')
    }

    async openProject(projectName) {
        await this.page.locator('li.projectItem').filter({ hasText: projectName }).locator('.actionProject').click()
        await this.page.waitForLoadState('networkidle')
    }

}

module.exports = { DesignerHome } 