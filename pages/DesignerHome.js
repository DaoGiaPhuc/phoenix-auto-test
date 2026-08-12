class DesignerHome {
    constructor(page) {
        this.page = page
    
    }

    async openFirstProject() {
        await this.page.locator('.actionProject').first().click()
    }

    
}

module.exports = { DesignerHome } 