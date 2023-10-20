import mongoose from "mongoose";

// const operatorSchema = new mongoose.Schema({
//     name: String,
//     department: String,
//     position: String,
// });

// const appointmentSchema = new mongoose.Schema({
//     start: String,
//     end: String,
//     operator: { type: mongoose.Schema.Types.ObjectId, ref: 'Operator' },
// });

// export const Operator = mongoose.model('Operator', operatorSchema);
// export const Appointment = mongoose.model('Appointment', appointmentSchema);

// module.exports = { Operator, Appointment };
 const Schema = mongoose.Schema;

const meetingSchema = new Schema(
    {
        operator:{
            type: String,
        },
        date : {
            type:Date
        },
        start : {
            type : String,
        },
        end : {
            type: String,
        },
    },
    {
        timestamps : true
    }
);


export const Meeting = mongoose.model('Meeting', meetingSchema)