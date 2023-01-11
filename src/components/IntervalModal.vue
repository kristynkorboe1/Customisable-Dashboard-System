<template>
  <div class="modalinline"> 
<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#IntervalModal" style="margin: 3px">
    Select Interval
</button>
<div class="modal fade" id="IntervalModal" tabindex="-1" aria-labelledby="IntervalModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="IntervalModalLabel">Choose Time Interval</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>From:</p>
                <b-form-input id="startDate1" v-model="startDate" type="date" style="margin-bottom: 3px"></b-form-input>
                <b-form-input id="startTime1" v-model="startTime" type="time" style="margin-bottom: 3px"></b-form-input>

                <p>To:</p>
                <b-form-input id="endDate1" v-model="endDate" type="date" style="margin-bottom: 3px"></b-form-input>
                <b-form-input id="endTime1" v-model="endTime" type="time" style="margin-bottom: 3px"></b-form-input>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" @click="handleSave()" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
        </div>
    </div>
</div>
</div> 
</template>
<script>

export default {
    props: {
        hideTime: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
        }
    },
    emits: ['startTimeEmit','endTimeEmit'],
    
    methods: {
        //Formats and emits the string containing the time interval
        handleSave() {
                    let startDateTime = this.startDate + ' ' + this.startTime;
                    let endDateTime = this.endDate + ' ' + this.endTime;
                    this.$emit("startTimeEmit", startDateTime)
                    this.$emit("endTimeEmit", endDateTime)
                }
    },
}
</script>

<style>
.modalinline {
  text-align: center;
  width:50%;
}
</style>