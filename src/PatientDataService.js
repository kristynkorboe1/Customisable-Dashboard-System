import axios from 'axios';

class patientDataService {
    static getBasalInsulinData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/basalInsulin');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static getBolusInsulinData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/bolusInsulin');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static getGlucoseData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/glucose');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static getPhysicalActivityData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/physicalActivity');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    } 
    
    static getCarbohydrateData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/carbohydrate');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    } 

    static getGlucoseData2Weeks() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/glucose/past2Weeks');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static getPhysicalActivityDataWeek() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/physicalActivity/pastWeek');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static getCarbohydrateDataWeek() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/carbohydrate/pastWeek');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static getBasalInsulinDataDay() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/basalInsulin/pastDay');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static getBolusInsulinDataDay() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('http://localhost:8080/api/patientData/bolusInsulin/pastDay');
                const data = res.data;
                resolve(data)
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static addBasalInsulinData(value) {
        return axios.post('http://localhost:8080/api/patientData/basalInsulin', {
            value
        })
    }

    static addBolusInsulinData(value) {
        return axios.post('http://localhost:8080/api/patientData/bolusInsulin', {
            value
        })
    }

    static addGlucoseData(value) {
        return axios.post('http://localhost:8080/api/patientData/glucose', {
            value
        })
    }

    static addPhysicalActivityData(value) {
        return axios.post('http://localhost:8080/api/patientData/physicalActivity', {
            value
        })
    }

    static addCarbohydrateData(value) {
        return axios.post('http://localhost:8080/api/patientData/carbohydrate', {
            value
        })
    }

    static setCarbohydrateDataToday(id, value) {
        return axios.patch(`http://localhost:8080/api/patientData/carbohydrate/${id}`, {
            value
        })
    }

    static setPhysicalActivityDataToday(id, value) {
        return axios.patch(`http://localhost:8080/api/patientData/physicalActivity/${id}`, {
            value
        })
    }
}

export default patientDataService;