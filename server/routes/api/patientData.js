const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

async function loadBasalInsulinDataCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbuser:y2J4VJdzSu53eJUV@cluster0.luieljo.mongodb.net/test', {
        useNewUrlParser: true
    })

    return client.db('customisableDashboardSystem').collection('basalInsulin')
}

async function loadBolusInsulinDataCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbuser:y2J4VJdzSu53eJUV@cluster0.luieljo.mongodb.net/test', {
        useNewUrlParser: true
    })

    return client.db('customisableDashboardSystem').collection('bolusInsulin')
}

async function loadPhysicalActivityDataCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbuser:y2J4VJdzSu53eJUV@cluster0.luieljo.mongodb.net/test', {
        useNewUrlParser: true
    })

    return client.db('customisableDashboardSystem').collection('physicalActivity')
}

async function loadCarbohydrateDataCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbuser:y2J4VJdzSu53eJUV@cluster0.luieljo.mongodb.net/test', {
        useNewUrlParser: true
    })

    return client.db('customisableDashboardSystem').collection('carbohydrate')
}


//Get all basal insulin data
router.get('/basalInsulin', async (req, res) => {
    try {
        const basalInsulinData = await loadBasalInsulinDataCollection();
        res.send(await basalInsulinData.find({}).toArray());
    }
    catch(err) {
    res.send({ message: err})
    }
});

//Get all bolus insulin data
router.get('/bolusInsulin', async (req, res) => {
    try {
        const bolusInsulinData = await loadBolusInsulinDataCollection();
        res.send(await bolusInsulinData.find({}).toArray());
    }
    catch(err) {
    res.send({ message: err})
    }
});

//Get all physical activity data
router.get('/physicalActivity', async (req, res) => {
    try {
        const physicalActivityData = await loadPhysicalActivityDataCollection();
        res.send(await physicalActivityData.find({}).toArray());
    }
    catch(err) {
    res.send({ message: err})
    }
});

//Get all carbohydrate data
router.get('/carbohydrate', async (req, res) => {
    try {
        const carbohydrateData = await loadCarbohydrateDataCollection();
        res.send(await carbohydrateData.find({}).toArray());
    }
    catch(err) {
    res.send({ message: err})
    }
});

//Add basal insulin data
router.post('/basalInsulin', async (req,res) => {
    try {
        const basalInsulinData = await loadBasalInsulinDataCollection();
        const currentDate = new Date(); 
        const dateTime = 
            currentDate.getDate() + "/"
            + (currentDate.getMonth()+1)  + "/" 
            + currentDate.getFullYear() + " "  
            + currentDate.getHours() + ":"  
            + currentDate.getMinutes() + ":"

        await basalInsulinData.insertOne({
            time: dateTime,
            basalInsulinValue: req.body.basalInsulinValue
        });
        res.status(201).send()
    }   
    catch(err) {
        res.json({message: err})
    } 
});

//Add bolus insulin data
router.post('/bolusInsulin', async (req,res) => {
    try {
        const bolusInsulinData = await loadBolusInsulinDataCollection();
        const currentDate = new Date(); 
        const dateTime = 
            currentDate.getDate() + "/"
            + (currentDate.getMonth()+1)  + "/" 
            + currentDate.getFullYear() + " "  
            + currentDate.getHours() + ":"  
            + currentDate.getMinutes() + ":"

        await bolusInsulinData.insertOne({
            time: dateTime,
            bolusInsulinValue: req.body.bolusInsulinValue
        });
        res.status(201).send()
    }   
    catch(err) {
        res.json({message: err})
    } 
});

//Add physical activity data
router.post('/physicalActivity', async (req,res) => {
    try {
        const physicalActivityData = await loadPhysicalActivityDataCollection();
        const currentDate = new Date(); 
        const date = 
            currentDate.getDate() + "/"
            + (currentDate.getMonth()+1)  + "/" 
            + currentDate.getFullYear()

        await physicalActivityData.insertOne({
            time: date,
            physicalActivityMin: req.body.physicalActivityMin
        });
        res.status(201).send()
    }   
    catch(err) {
        res.json({message: err})
    } 
});

//Add carbohydrate data
router.post('/carbohydrate', async (req,res) => {
    try {
        const carbohydrateData = await loadCarbohydrateDataCollection();
        const currentDate = new Date(); 
        const date = 
            currentDate.getDate() + "/"
            + (currentDate.getMonth()+1)  + "/" 
            + currentDate.getFullYear()

        await carbohydrateData.insertOne({
            time: date,
            carbohydrateGrams: req.body.carbohydrateGrams
        });
        res.status(201).send()
    }   
    catch(err) {
        res.json({message: err})
    } 
});

//Delete insulin data
// router.delete('/:id', async (req, res) => {
//     try{
//         const insulinData = await loadInsulinDataCollection();
//         await insulinData.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
//         res.status(200).send();
//     }
//     catch(err){
//         res.json({message: err})
//     }
// });

module.exports = router;