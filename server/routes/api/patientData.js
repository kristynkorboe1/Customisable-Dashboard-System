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

async function loadGlucoseDataCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbuser:y2J4VJdzSu53eJUV@cluster0.luieljo.mongodb.net/test', {
        useNewUrlParser: true
    })

    return client.db('customisableDashboardSystem').collection('glucose')
}


//Get all basal insulin data
router.get('/basalInsulin', async (req, res) => {
    try {
        const basalInsulinData = await loadBasalInsulinDataCollection();
        res.status(200).send(await basalInsulinData.find({}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive basal insulin data'})
    }
});

//Get all bolus insulin data
router.get('/bolusInsulin', async (req, res) => {
    try {
        const bolusInsulinData = await loadBolusInsulinDataCollection();
        res.status(200).send(await bolusInsulinData.find({}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive bolus insulin data'})
    }
});

//Get all physical activity data
router.get('/physicalActivity', async (req, res) => {
    try {
        const physicalActivityData = await loadPhysicalActivityDataCollection();
        res.status(200).send(await physicalActivityData.find({}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive physical activity data'})
    }
});

//Get all carbohydrate data
router.get('/carbohydrate', async (req, res) => {
    try {
        const carbohydrateData = await loadCarbohydrateDataCollection();
        res.status(200).send(await carbohydrateData.find({}).toArray());
    }
    catch(err) {
        res.status(500).send({ error: 'Could not retrive carbohydrate data'})
    }
});

//Get all glucose data
router.get('/glucose', async (req, res) => {
    try {
        const glucoseData = await loadGlucoseDataCollection();
        res.status(200).send(await glucoseData.find({}).toArray());
    }
    catch(err) {
        res.status(500).send({ error: 'Could not retrive glucose data'})
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
        res.status(500).send({message: err})
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
        res.status(500).send({message: err})
    } 
});

//Add physical activity data
router.post('/physicalActivity', async (req,res) => {
    try {
        const physicalActivityData = await loadPhysicalActivityDataCollection();
        const currentDate = new Date(); 
        // const date = 
        //     currentDate.getDate() + "/"
        //     + (currentDate.getMonth()+1)  + "/" 
        //     + currentDate.getFullYear()

        await physicalActivityData.insertOne({
            time: currentDate,
            physicalActivityMin: req.body.physicalActivityMin
        });
        res.status(201).send()
    }   
    catch(err) {
        res.status(500).send({message: err})
    } 
});

//Add carbohydrate data
router.post('/carbohydrate', async (req,res) => {
    try {
        const carbohydrateData = await loadCarbohydrateDataCollection();
        const currentDate = new Date(); 
        // const date = 
        //     currentDate.getDate() + "/"
        //     + (currentDate.getMonth()+1)  + "/" 
        //     + currentDate.getFullYear()

        await carbohydrateData.insertOne({
            time: currentDate,
            carbohydrateGrams: req.body.carbohydrateGrams
        });
        res.status(201).send()
    }   
    catch(err) {
        res.status(500).send({message: err})
    } 
});

//Add glucose data
router.post('/glucose', async (req,res) => {
    try {
        const glucoseData = await loadGlucoseDataCollection();
        const currentDate = new Date(); 
        const dateTime = 
            currentDate.getDate() + "/"
            + (currentDate.getMonth()+1)  + "/" 
            + currentDate.getFullYear() + " "  
            + currentDate.getHours() + ":"  
            + currentDate.getMinutes() + ":"

        await glucoseData.insertOne({
            time: dateTime,
            glucoseGrams: req.body.glucoseGrams
        });
        res.status(201).send()
    }   
    catch(err) {
        res.status(500).send({message: err})
    } 
});

//Update physical activity data
router.patch('/physicalActivity/:id', async (req, res) => {
    try{
        const updatedValue = req.body
        const physicalActivityData = await loadPhysicalActivityDataCollection();
        await physicalActivityData.updateOne({_id: new mongodb.ObjectId(req.params.id)}, {$set: updatedValue})
        res.status(200).send();
    }
    catch(err){
        res.status(500).send({message: err})
    }
})

//Update carbohydrate data
router.patch('/carbohydrate/:id', async (req, res) => {
    try{
        const updatedValue = req.body
        const carbohydrateData = await loadCarbohydrateDataCollection();
        await carbohydrateData.updateOne({_id: new mongodb.ObjectId(req.params.id)}, {$set: updatedValue})
        res.status(200).send();
    }
    catch(err){
        res.status(500).send({message: err})
    }
})

//Get physical activity data from past week
router.get('/physicalActivity/pastWeek', async (req, res) => {
    try {
        const lastWeekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const physicalActivityData = await loadPhysicalActivityDataCollection();
        res.status(200)
            .send(await physicalActivityData
                .find({time: {$gte: lastWeekDate}}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive physical activity data for the past week'})
    }
});

//Get carbohydrate data from past week
router.get('/carbohydrate/pastWeek', async (req, res) => {
    try {
        const lastWeekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const carbohydrateData = await loadCarbohydrateDataCollection();
        res.status(200)
            .send(await carbohydrateData
                .find({time: {$gte: lastWeekDate}}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive carbohydrate data for the past week'})
    }
});

//Get TIR data - two weeks of glucose data
router.get('/glucose/pastWeek', async (req, res) => {
    try {
        const lastWeekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const glucoseData = await loadGlucoseDataCollection();
        res.status(200)
            .send(await glucoseData
                .find({time: {$gte: lastWeekDate}}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive glucose data for the past week'})
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
//         res.send({message: err})
//     }
// });

module.exports = router;