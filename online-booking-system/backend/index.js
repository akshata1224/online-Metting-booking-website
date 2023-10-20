 import express from 'express';
 import { PORT, mongoURL } from './config.js'
 import { Meeting } from './models/meetingModels.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
// // const app = express();
//const express = require('express');
const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (res, req)=> {
    req.send('hello world')
})

app.get('/appointments/', async (req, res) => {
    const operators = await Meeting.find({});
    res.json({
        message: operators
    })
});

app.get('/appointments/search', async (req, res) => {
    const operators = await Meeting.find({ operator: req.query.query });
    console.log(req.params.operator)
    res.json({
        message: operators
    })
});

app.get('/slots/:operator', async (req, res) => {
    const appointments = await Appointment.find({ operator: req.params.operator });
    const bookedSlots = appointments.map(appointment => ({ start: appointment.start, end: appointment.end }));
    const allSlots = Array.from({ length: 24 }, (_, i) => i);
    const openSlots = allSlots.reduce((acc, hour) => {
        const slotStart = hour.toString().padStart(2, '0');
        const slotEnd = (hour + 1).toString().padStart(2, '0');
        if (!bookedSlots.some(slot => slot.start === slotStart && slot.end === slotEnd)) {
            acc.push({ start: slotStart, end: slotEnd });
        }
        return acc;
    }, []);
    res.send(openSlots);
});

app.post('/appointments', async (req, res) => {
    console.log('inside post')
   
    const newAppointment = {
        operator : req.body.selectedOperator,
        date : req.body.date,
        start: req.body.startTime,
        end: req.body.endTime
    }
    
   let checkMeeting = await Meeting.findOne({
        operator:req.body.selectedOperator,
        date: req.body.date,
        start: req.body.startTime,
    })
    if(checkMeeting | req.body.date ==null){
        console.log("can't book")
        
    }else{
        await Meeting.create(newAppointment);
        res.send(newAppointment);
    }
    
});

app.delete('/appointments/:id', async (req, res) => {
    console.log('under deleteion')
    const { id } = req.params;
    console.log(id);
    await Meeting.findByIdAndDelete(id);
    res.send({ message: 'Appointment cancelled successfully'});
});

app.put('/appointments/:id', async (req, res) => {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedAppointment);
});

mongoose
.connect(mongoURL)
.then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Server is running, on port ${PORT}`);  // eslint-disable-line no-console
    })
    console.log("app connected success")
})
.catch((err)=>{
    console.log(err)
})
