// pages/index.js
const { LoginPage } = require('./LoginPage')
const { DesignerHome } = require('./DesignerHome')
const { ProjectHome } = require('./ProjectHome')
const { ProjectEditor } = require('./ProjectEditor')
const { ObjectType } = require('./ObjectType')


module.exports = { LoginPage, DesignerHome, ProjectHome, ProjectEditor, ObjectType }

/*
    const fs = require('fs')
    const path = require('path')

    const modules = {}

    fs.readdirSync(__dirname)
        .filter(file => file.endsWith('.js') && file !== 'index.js')
        .forEach(file => {
            const mod = require(path.join(__dirname, file))
            Object.assign(modules, mod)
        })
    
    module.exports = modules
*/