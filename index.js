const express = require("express");
const iconsCategory = require("./json/category.json");
const seed = require("./seed");
const app = express();
const path = require('path');

const DEFAULT_PNG_DIRNAME = "material-design-icons/png"
const DEFAULT_SVG_DIRNAME = "material-design-icons/src"

app.use(express.static(path.resolve('./material-design-icons/')));

const getURLSVG = (name, type="materialicons") => {

    return `/src/${iconsCategory[name]}/${name.replace(/\s/g, "_").toLowerCase()}/${type}/24px.svg`;
}

app.get('/',(req,res)=>{
    res.send("hello")
})


app.get('/getpng/:name/:dp/:size', (req,res)=>{
    try {
    const {name, dp, size} = req.params;
    const category = iconsCategory[name];
    const filename = `baseline_${name.replace(/\s/g, "_").toLowerCase()}_black_${dp}`
    const path = `/${DEFAULT_PNG_DIRNAME}/${category}/${name.replace(/\s/g, "_").toLowerCase()}/materialicons/${dp}/${size}/${filename}.png`;
    // console.log(path);
    res.sendFile(__dirname + path);
    } catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

app.get('/getsvg/:name', (req,res)=>{
    try {
    const {name} = req.params;
    const category = iconsCategory[name];
    const filename = `24px.svg`
    const path = `/${DEFAULT_SVG_DIRNAME}/${category}/${name.replace(/\s/g, "_").toLowerCase()}/materialicons/${filename}`;
    // console.log(__dirname + path);
    res.sendFile(__dirname + path);
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
    const path = `/${DEFAULT_SVG_DIRNAME}/${category}/${name.replace(/\s/g, "_").toLowerCase()}/${weight}/${filename}`;
    console.log(path);
    res.sendFile(__dirname + path);
    } catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

app.get('/searchIcons',(req,res)=>{
    const {s} = req.query;
    const fullUrl = req.protocol + '://' + req.get('host');
    const re = new RegExp(s, "i")
    const searchRes = Object.keys(iconsCategory).filter(key => re.test(key));
    const results = [];
    searchRes.forEach(icon => {
        results.push({name:icon, url: fullUrl+ getURLSVG(icon)});
    })
    res.json(results);
})


const PORT = process.env.PORT || '5000';
app.listen(PORT, ()=>{
    // await seed();
    console.log(`Listening at ${PORT}`);
})