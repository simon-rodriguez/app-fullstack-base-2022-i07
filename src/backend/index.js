//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

// Ejercicio 3
var devices = require('./datos.json');


//=======[ Main module code ]==================================================

// Ejercicio 4
app.get('/devices/', function(req, res) {
    setTimeout(()=>{ //Solo para simular el delay del servidor
        res.json(devices).status(200);
    },1500)
});

// Ejercicio 5 (usando parametros definidos en el path ../:param1/:param2/.../:paramN --> URL/value1/value2/.../valueN) o JSON
app.get('/devices/:id', function(req, res) {
    if (req.body.id != undefined) {
        console.log("JSON recibido correctamente.");
        let results = devices.filter((device) => device.id == req.body.id);
        res.json(results).status(200);
    }
    else if (req.params.id !=undefined) {
        console.log("Parametros recibidos correctamente.");
        let results = devices.filter((device) => device.id == req.params.id);
        res.json(results).status(200);
    }
    else {
        console.log("ERROR: Parametros/JSON incorrecto o no recibido.");
        res.sendStatus(400);
    }
});

// Ejercicio 6 (con query en el path ../ --> URL/key1=param1&key2=param2&...&keyN=paramN) o con un JSON
app.post('/changestate/', function(req,res) {
    if (req.body.id != undefined && req.body.state != undefined) {
        console.log("JSON recibido correctamente.");
        let results = devices.filter((device) => device.id == req.body.id);
        results[0].state = req.body.state;
        res.json(results);
    }
    else if (req.query.id !=undefined && req.query.state!=undefined) {
        console.log("Parametros recibidos correctamente.");
        let results = devices.filter((device) => device.id == req.query.id);
        results[0].state = req.query.state;
        res.json(results);
    }
    else {
        console.log("ERROR: Parametros/JSON incorrecto o no recibido.");
        res.sendStatus(400);
    }
});

// Recibe un JSON con el dispositivo nuevo
app.post('/addDevice/', function(req,res){
    console.log("Agregando nuevo dispositivo...");
    let idcheck = devices.filter((device)=> device.id == req.body.id);
    if(idcheck.length>0){
        console.log("ID ya existe");
        res.sendStatus(406);
    }
    else {
        devices.push({"id":req.body.id, "name":req.body.name, "description":req.body.description, "state":req.body.state, "type":req.body.type});
        console.log(`Dispositivo ${req.body.id} (${req.body.name}) agregado correctamente.`);
        res.sendStatus(201);
    }
});

// Recibe un JSON con las modificaciones para el dispositivo
app.put('/editdevice/', function(req,res) {
    console.log("Solicitud de cambios iniciada.");
    if (req.body.id != undefined) {
        let results = devices.filter((device) => device.id == req.body.id);
        if (results[0].name != req.body.name && results[0].name !=undefined){
            results[0].name = req.body.name;
            console.log("Nombre cambiado con éxito.");
        }
        else {console.log("No hay cambios en el nombre.")}
        if (results[0].description != req.body.description && results[0].description !=undefined){
            results[0].description = req.body.description;
            console.log("Descripción cambiada con éxito.");
        }
        else {console.log("No hay cambios en la descripción.")}
        if (results[0].type != req.body.type && results[0].type !=undefined){
            results[0].type = req.body.type;
            console.log("Tipo cambiado con éxito.");
        }
        else {console.log("No hay cambios en el tipo.")}
        console.log(`Dispositivo ${req.body.id} editado.`)
        res.json(devices).status(200);
    }
    else {
        res.sendStatus(400);
        console.log("ERROR: ID incorrecta o no recibida.");
    }
});

// Recibe un JSON con el dispositivo a eliminar
app.delete('/deletedevice/', function(req,res) {
    if (req.body.id != undefined) {
        let deleteIndex = devices.findIndex((device)=> device.id==req.body.id);
        console.log(deleteIndex);
        if(deleteIndex>=0){
            devices.splice(deleteIndex,1);
            console.log(`Dispositivo ${req.body.id} eliminado.`);
            res.json(devices).status(200);
        }
        else {
            res.sendStatus(406);
        }
        
    }
    else {
        res.sendStatus(400);
        console.log("ERROR: ID incorrecta o no recibida.");
    }
});


// Recibe JSON/Parametros para editar la configuración del dispositivo
app.put('/updatesettings/', function(req,res) {
    console.log(`Configuración del dispositivo ${req.body.id} actualizada.`);
    res.send("no-refresh").status(200);
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API funcionando correctamente.");
});

//=======[ End of file ]=======================================================
