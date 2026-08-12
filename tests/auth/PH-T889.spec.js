/*
0. TYPE: test case này là gì? (login, logout, create, update, delete, search, filter, export, import...)
    - Check translation for Designer Home page in German

1. NAVIGATE: mở trang...?
    - Trang trong Project khi ấn Add to Object -> Service 

2. FIND: cần tìm element nào? bằng cách nào?
    - 11 Text của 6 element, button save, button delete, protect Action

3. CHECK: kiểm tra placeholder hay text hay gì?
    - 11 Text
    - name của 2 Button
    - name của 1 button protect Action (sau khi ấn save mới hiện ra)

4. ACT: fill + click
    - Login với user admin, pass admin (.env)
    - Chọn ngôn ngữ là Deutsch
    - Mở 1 project bất kì, chưa có thì tạo mới
    - Click Add to Object 
    - Search chữ Service (id="tabscontent:tabView:j_idt5545:j_idt5549")
    - Click Service (<li class="ui-menuitem ui-widget ui-corner-all admin-parent-menu" role="menuitem">) -> Sử dụng get by role menu item có exact text là Service
    - Check 11 text của 6 element, button save, button delete (verify)
    - Fill 2 fill name và description (tạo ngẫu nhiên), click save
    <input id="tabscontent:tabView:edittext_0_0" type="text" />
    <textarea id="tabscontent:tabView:textarea_0_1"></textarea>

    - Check name của button protect Action (verify)
    - Xóa Service vừa tạo, click delete

5. VERIFY: sau login, expect gì?
    - 1: Title Object Service => Title in German:Objekt Service                             <label class="propertyValueTypeObject">Object Service</label>
    - 2: Name of the object => Title in German: Name des Objekts                            <label for="tabscontent:tabView:edittext_0_0">Name of the object :</label>
    - 3: Description => Title in German: Beschreibung                                       <label for="tabscontent:tabView:textarea_0_1">Description :</label>
    - 4: Version => Title in German: Version                                                <label for="tabscontent:tabView:edittext_0_2">Version :</label>
    - 5: Publish in multi-version => Title in German: In Multi-Version veröffentlichen      <span class="ui-chkbox-label">Publish in multi-version</span>
    - 6:    Advanced parameters => Title in German: Erweiterte Parameter                    <div class="bw-accordion-title">Advanced parameters</div>
            Functional manager => Title in German: Funktionaler Manager                     <input id="tabscontent:tabView:edittext_0_0" type="text" />
            Technical manager => Title in German: Technischer Manager
            Archived version => Title in German: Archivierte Version
            Criticality => Title in German: Kritikalität
            Available in the BPM screen gallery => Title in German: In der BPM-Screen-Galerie verfügbar

    - 7: Button Save => Title in German: Speichern <button id="tabscontent:tabView:j_idt1670" name="tabscontent:tabView:j_idt1670" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only  actionButton saveButton" onclick="PrimeFaces.ab({s:&quot;tabscontent:tabView:j_idt1670&quot;,p:&quot;tabscontent:tabView:j_idt1670 tabscontent:tabView:mainForm_0&quot;,u:&quot;@(.treeLeft_project) @(.bw-project-content) @(.treeLeftFavorite_project) @(.treeLeftArchived_project) @(.propertiesTabLabel)&quot;,onco:function(xhr,status,args){initDND();;}});return false;" title="Save" type="submit" role="button" aria-disabled="false"><span class="ui-button-icon-left ui-icon ui-c fas fa-save faBigButtonIcon"></span><span class="ui-button-text ui-c">Save</span></button>
    - 8: Button Delete => Title in German: Löschen <button id="tabscontent:tabView:j_idt1671" name="tabscontent:tabView:j_idt1671" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only  actionButton deleteButton" data-pfconfirmcommand="PrimeFaces.bcn(this,event,[function(event){PrimeFaces.BWConfirm({source:&quot;tabscontent:tabView:j_idt1671&quot;,header:&quot;Delete object or Data&quot;,message:&quot;Do you want to permanently delete the object from Designer ?&quot;,yesLabel:&quot;Delete&quot;,noLabel:&quot;Cancel&quot;,icon:&quot;ui-icon-alert&quot;,accept:function(){PrimeFaces.ab({s:&quot;tabscontent:tabView:j_idt1671&quot;,p:&quot;tabscontent:tabView:j_idt1671&quot;,u:&quot;@(.treeLeft_project),@(.bw-project-content), @(treeLeftFavorite_project)&quot;});}});return false;},function(event){PrimeFaces.ab({s:&quot;tabscontent:tabView:j_idt1671&quot;,p:&quot;tabscontent:tabView:j_idt1671&quot;,u:&quot;@(.treeLeft_project) @(.bw-project-content) @(treeLeftFavorite_project)&quot;});return false;}]);" onclick="PrimeFaces.BWConfirm({source:&quot;tabscontent:tabView:j_idt1671&quot;,header:&quot;Delete object or Data&quot;,message:&quot;Do you want to permanently delete the object from Designer ?&quot;,yesLabel:&quot;Delete&quot;,noLabel:&quot;Cancel&quot;,icon:&quot;ui-icon-alert&quot;,accept:function(){PrimeFaces.ab({s:&quot;tabscontent:tabView:j_idt1671&quot;,p:&quot;tabscontent:tabView:j_idt1671&quot;,u:&quot;@(.treeLeft_project),@(.bw-project-content), @(treeLeftFavorite_project)&quot;});}});return false;" title="Delete" type="submit" aria-disabled="true"><span class="ui-button-icon-left ui-icon ui-c fas fa-trash faBigButtonIcon"></span><span class="ui-button-text ui-c">Delete</span></button>
    - 9: Protect => Title in German: Schützen" (<label id="tabscontent:tabView:protectedSwitchLabel">Protect</label>)


    const propertyPanel = page.locator('.propertycontext')

    propertyPanel.getByText('Objekt Service', { exact: true })
    propertyPanel.getByText('Name des Objekts', { exact: false })
*/

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DesignerHome } = require('../../pages/DesignerHome');
const { ProjectHome } = require('../../pages/ProjectHome');


const languages = {
    de: {
        locale: 'Deutsch',
        titleObjectService: 'Objekt Service',
        nameOfTheObject: 'Name des Objekts :',
        description: 'Beschreibung :',
        version: 'Version :',
        publishInMultiVersion: 'In Multi-Version veröffentlichen',
        advancedParameters: 'Erweiterte Parameter',
        functionalManager: 'Funktionaler Manager :',
        technicalManager: 'Technischer Manager :',
        archivedVersion: 'Archivierte Version',
        criticality: 'Kritikalität :',
        
        buttonSave: 'Speichern',
        buttonDelete: 'Löschen',
        protect: 'Schützen'
    },
    en: {
        locale: 'English',
        titleObjectService: 'Object Service',
        nameOfTheObject: 'Name of the object :',
        description: 'Description :',
        version: 'Version :',
        publishInMultiVersion: 'Publish in multi-version',
        advancedParameters: 'Advanced parameters',
        functionalManager: 'Functional manager :',
        technicalManager: 'Technical manager :',
        archivedVersion: 'Archived version',
        criticality: 'Criticality :',
        
        buttonSave: 'Save',
        buttonDelete: 'Delete',
        protect: 'Protect'
    },
}

const lang = languages.de  // <-- Change language here

const textsToVerify = [
    lang.titleObjectService,
    lang.nameOfTheObject,
    lang.description,
    lang.version,
    lang.publishInMultiVersion,
    lang.advancedParameters,
    lang.functionalManager,
    lang.technicalManager,
    lang.archivedVersion,
    lang.criticality,
    
]

test('PH-T889: Verify Screen - Tab Properties',async ({ page }) => {
    //Log in 
    const loginPage = new LoginPage(page); 
    const designerHome = new DesignerHome(page);
    const projectHome = new ProjectHome(page);
    
    await page.goto('https://localhost:8443/blueway/designer/', { waitUntil: 'load' })
    
    // Login
    await loginPage.selectLanguage(lang.locale)
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD)

    // Wait for Designer Home to load
    await expect(page).toHaveURL(/.*\/blueway\/designer/)

    //Open a project (assuming the first project in the list)
    await designerHome.openFirstProject()

    //Add Object to Project
    await projectHome.addNewObject('Service')  // <-- Change object type here

    // Verify Text translations
    await projectHome.expandAdvancedParameters(lang.advancedParameters)
    for (const text of textsToVerify) {
    await expect(
            projectHome.contextLeftObject.getByText(text, { exact: false }).filter({ visible: true })
        ).toBeVisible()
    }

    // Verify button translations
    
    await projectHome.fillName('TestName')
    await projectHome.fillDescription('Test Description')
    await projectHome.clickSave()

    await expect(projectHome.locateSaveButton()).toHaveAttribute('title', lang.buttonSave)
    await expect(projectHome.locateDeleteButton()).toHaveAttribute('title', lang.buttonDelete)
    await expect(projectHome.locateProtectLabel()).toHaveText(lang.protect)
    

    // Verify Text translations again after saving 
    await projectHome.expandAdvancedParameters(lang.advancedParameters)
    for (const text of textsToVerify) {
    await expect(
            projectHome.contextLeftObject.getByText(text, { exact: false }).filter({ visible: true })
        ).toBeVisible()
    }

    
})

