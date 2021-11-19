const express = require("express");
const iconsCategory = require("./json/category.json");
const seed = require("./seed");
const app = express();

const DEFAULT_PNG_DIRNAME = "material-design-icons/png"

app.get('/',(req,res)=>{
    res.send("hello")
})

app.get('/iconsPng/:name/:dp/:size', (req,res)=>{
    try {
    const {name, dp, size} = req.params;
    const category = iconsCategory[name];
    const filename = `baseline_${name.replace(/\s/g, "_").toLowerCase()}_black_${dp}`
    const path = `/${DEFAULT_PNG_DIRNAME}/${category}/${name}/materialicons/${dp}/${size}/${filename}.png`;
    console.log(path);
    res.sendFile(__dirname + path);
    } catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

const PORT = process.env.PORT || '3000';
app.listen(PORT, ()=>{
    // await seed();
    console.log(`Listening at ${PORT}`);
})