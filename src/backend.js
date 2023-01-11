export default class Backend{
    constructor() {
        this.url = "http://localhost:8080/api/v1"
    }

    getUrlBasalInsulin(id){
        return this.url + "/basalinsulin/" + id
    }

    getUrlBasalInsulinBetweenDates(id, deviceId, startDate, endDate){
        return this.url + "/basalinsulin/" + id + "/" + deviceId + "/" + startDate + "/" + endDate
    }

}