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
        res.status(200).send(await basalInsulinData.find({}).sort({"time": 1}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive basal insulin data'})
    }
});

//Get all bolus insulin data
router.get('/bolusInsulin', async (req, res) => {
    try {
        const bolusInsulinData = await loadBolusInsulinDataCollection();
        res.status(200).send(await bolusInsulinData.find({}).sort({"time": 1}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive bolus insulin data'})
    }
});

//Get all physical activity data
router.get('/physicalActivity', async (req, res) => {
    try {
        const physicalActivityData = await loadPhysicalActivityDataCollection();
        res.status(200).send(await physicalActivityData.find({}).sort({"time": 1}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive physical activity data'})
    }
});

//Get all carbohydrate data
router.get('/carbohydrate', async (req, res) => {
    try {
        const carbohydrateData = await loadCarbohydrateDataCollection();
        res.status(200).send(await carbohydrateData.find({}).sort({"time": 1}).toArray());
    }
    catch(err) {
        res.status(500).send({ error: 'Could not retrive carbohydrate data'})
    }
});

//Get all glucose data
router.get('/glucose', async (req, res) => {
    try {
        const glucoseData = await loadGlucoseDataCollection();
        res.status(200).send(await glucoseData.find({}).sort({"time": 1}).toArray());
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
            basalInsulin: req.body.basalInsulin
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
            bolusInsulin: req.body.bolusInsulin
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
            glucoseMeasurement: req.body.glucoseMeasurement
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
                .find({time: {$gte: lastWeekDate}}).sort({"time": 1}).toArray());
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
                .find({time: {$gte: lastWeekDate}}).sort({"time": 1}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive carbohydrate data for the past week'})
    }
});

//Get TIR data - two weeks of glucose data
router.get('/glucose/past2Weeks', async (req, res) => {
    try {
        const startDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        const glucoseData = await loadGlucoseDataCollection();
        res.status(200)
            .send(await glucoseData
                .find({time: {$gte: startDate}}).sort({"time": 1}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive glucose data for the past week'})
    }
});

//Get basal insulin data from past 24 hours
router.get('/basalInsulin/pastDay', async (req, res) => {
    try {
        const lastWeekDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const basalInsulinData = await loadBasalInsulinDataCollection();
        res.status(200)
            .send(await basalInsulinData
                .find({time: {$gte: lastWeekDate}}).sort({"time": 1}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive basalInsulin data for the past week'})
    }
});

//Get bolus insulin data from past 24 hours
router.get('/bolusInsulin/pastDay', async (req, res) => {
    try {
        const lastWeekDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const bolusInsulinData = await loadBolusInsulinDataCollection();
        res.status(200)
            .send(await bolusInsulinData
                .find({time: {$gte: lastWeekDate}}).sort({"time": 1}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive basalInsulin data for the past week'})
    }
});


//DASHBOARD CONFIGURATION
async function loadTabsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbuser:y2J4VJdzSu53eJUV@cluster0.luieljo.mongodb.net/test', {
        useNewUrlParser: true
    })

    return client.db('customisableDashboardSystem').collection('tabs')
}

//Get all tabs
router.get('/tabs', async (req, res) => {
    try {
        const tabs = await loadTabsCollection();
        res.status(200).send(await tabs.find({}).toArray());
    }
    catch(err) {
        res.status(500).json({ error: 'Could not retrive dashboard configuration data'})
    }
});

//Add tab
router.post('/tabs', async (req,res) => {
    try {
        const tabs = await loadTabsCollection();
        await tabs.insertOne({
            tabName: req.body.tabName,
            notes: req.body.notes,
            boards: req.body.boards,
            selected: req.body.selected
        });
        res.status(201).send()
    }   
    catch(err) {
        res.status(500).send({message: err})
    } 
});

//Update tab
router.patch('/tabs/:id', async (req, res) => {
    try{
        const updatedValue = req.body
        const tabs = await loadTabsCollection();
        await tabs.updateOne({_id: new mongodb.ObjectId(req.params.id)}, {$set: updatedValue})
        res.status(200).send();
    }
    catch(err){
        res.status(500).send({message: err})
    }
})

//Delete tab
router.delete('/tabs/:id', async (req, res) => {
    try{
        const tabs = await loadTabsCollection();
        await tabs.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
        res.status(204).send();
    }
    catch(err){
        res.send({message: err})
    }
});

module.exports = router;