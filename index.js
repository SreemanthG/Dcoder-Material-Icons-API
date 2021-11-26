const express = require("express");
const iconsCategory = require("./json/category.json");
const seed = require("./seed");
const app = express();
const path = require('path');


//To run on local
// app.use(express.static(path.resolve('./material-design-icons/')));
// const DEFAULT_SVG_DIRNAME = "material-design-icons/src"

const DEFAULT_SVG_DIRNAME = "https://static-content.dcoder.tech/material-icons"

const getURLSVG = (name, type="materialicons") => {

    return `/${iconsCategory[name]}/${name.replace(/\s/g, "_").toLowerCase()}/${type}/24px.svg`;
}

app.get('/',(req,res)=>{
    res.send("hello")
})


app.get('/getsvg/:name', (req,res)=>{
    try {
    const {name} = req.params;
    const category = iconsCategory[name];
    const filename = `24px.svg`
    const path = `${DEFAULT_SVG_DIRNAME}/${category}/${name.replace(/\s/g, "_").toLowerCase()}/materialicons/${filename}`;
    // console.log(__dirname + path);
    res.json({url:path});
    } catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

app.get('/getsvg/:name/:type', (req,res)=>{
    // 1. default
    // 2. outlined
    // 3. round
    // 4. sharp
    // 5. twotone
    try {
    const {name, type} = req.params;
    let weight;
    switch(type) {
        case "default":
            weight='materialicons'
            break;
        case "outlined":
            weight='materialiconsoutlined'
            break;
        case "round":
            weight='materialiconsround'
            break;
        case "sharp":
            weight='materialiconssharp'
            break;
        case "twotone":
            weight='materialiconstwotone'
            break;
    }
    const category = iconsCategory[name];
    const filename = `24px.svg`
    const path = `${DEFAULT_SVG_DIRNAME}/${category}/${name.replace(/\s/g, "_").toLowerCase()}/${weight}/${filename}`;
    res.json({url:path});
    } catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

app.get('/searchIcons',(req,res)=>{
    const {search_icon} = req.query;
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    if(isNaN(page)) page=1;
    if(isNaN(limit)) limit=10;
    const re = new RegExp(search_icon, "i")
    const searchRes = Object.keys(iconsCategory).filter(key => re.test(key));
    const results = [];
    let offset = limit*(page-1);
    for( i=offset ; i<offset+limit && i<searchRes.length ; i++ ){
        results.push({name:searchRes[i], url: DEFAULT_SVG_DIRNAME+ getURLSVG(searchRes[i])});
    }
    
    res.json({
        page: page,
        limit: limit,
        total_pages: parseInt((searchRes.length-1)/limit + 1),
        total_icons:parseInt(searchRes.length),
        data:results
    });
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    // await seed();
    console.log(`Listening at ${PORT}`);
})