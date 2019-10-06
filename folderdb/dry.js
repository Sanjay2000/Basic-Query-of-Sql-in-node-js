const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/data',(req,res)=>{
    let db = new sqlite3.Database('data',(err)=>{
        if (!err){
            db.all("select * from studets_detail",(err,data)=>{
                if (!err){
                    console.log("!fetched ")
                    res.send(data)

                }else{
                    console.log(err)
                }
            })
        }else{
            console.log(err)
        }
    })
})



app.post('/post',(req,res)=>{
    // let {body} = req;
    // let {name, classvar, details} = body;

    let name = req.body.name;
    let classvar = req.body.classvar;
    let details = req.body.details;
 
    let db = new sqlite3.Database('data', (err) => {
        if (!err){
            db.run('insert into studets_detail (name, class, Details) values ("'+name+'", "'+classvar+'", "'+details+'");', (err, data) => {
                if (err) {console.log(err);}
                else{
                    console.log('data inserted!')
                    res.send('data inserted');
                }
            })
        }else {
            console.log(err);
        }
    })
});


app.put('/putdata/:id',(req,res)=>{
    let name = req.body.name
    let classvar = req.body.classvar
    let details = req.body.details


    let db = new sqlite3.Database("data",(err)=>{
        if(!err){
            db.run("update studets_detail set name = '"+name+"' where id = '"+req.params.id+"';",(err,data)=>{
                if (err) {console.log(err)}
                else {
                    console.log("update the your data!")
                    res.send(data)
                }
            })
        }
    })
}
    
)

app.delete('/delete',(req,res)=>{
    let name = req.body.name
    let classvar = req.body.classvar
    let details = req.body.details

    let db = new sqlite3.Database("data",(err)=>{
        if (!err){
            db.run("delete from studets_detail where name = '"+name+"';",(err,data)=>{
                if (err) { console.log(err)}
                console.log("your data deleted!")
                res.send(err)
            })
        }
    })
})


var server = app.listen(4000,()=>{
    console.log(`your app is listening at ${server.address().port}`);
})