const iconsMetaData = require('./json/material-icons-list-json.json');
const fs = require('fs');
const { log } = require('console');

const writeCategoryintoJSON = async () => {
    const iconsCategory = {};
    iconsMetaData.categories.forEach(category => {
        category.icons.forEach(icon => {
            iconsCategory[icon.name] = icon.group_id;
        })
    });


    // Writing object into json file.
    const jsonString = JSON.stringify(iconsCategory);

    try{
        await fs.promises.writeFile("./json/category.json", jsonString);
    } catch(err){
        log(err);
        process.exit()
    }
}
module.exports = writeCategoryintoJSON;