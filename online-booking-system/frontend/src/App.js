// FRONTEND (REACT.JS)

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
 const [operators, setOperators] = useState([]);
 const [selectedOperator, setSelectedOperator] = useState('');
 const [startTime, setStartTime] = useState('');
 const [endTime, setEndTime] = useState('Select Start Date');
 const [date, setDate] = useState('');

 useEffect(() => {
    fetchBookedAppointments();
 }, []);

 const fetchOperators = async (e) => {
  e.preventDefault();
  axios
      .get(`http://localhost:5555/appointments/search?query=${selectedOperator}`)
      .then((response) => {
        console.log(response.data.message)
        console.log(typeof response)
        let temp = Object.entries(response.data.message);
        setOperators(temp)
        temp.map((ran)=>{
          console.log(ran[1].operator)
        })
        
      })
      .catch((error) => {
        console.log(error);
        
      });
 };

 const fetchBookedAppointments = async () => {
  axios
      .get(`http://localhost:5555/appointments/`)
      .then((response) => {
       
        console.log(typeof response)
        let temp = Object.entries(response.data.message);
        setOperators(temp)
        temp.map((ran)=>{
          console.log(ran)
        })
        
      })
      .catch((error) => {
        console.log(error);
        
      });
    //const res = await axios.get(`/api/appointments/${selectedOperator}`);
    //setBookedAppointments(res.data);
 };

 const bookAppointment = async () => {
  const data = {
    selectedOperator,
    date,
    startTime,
    endTime
  }
  console.log('inside frontend book appointment')
  console.log(data);
  axios
  .post('http://localhost:5555/appointments/', data)
  .then(() => {
    console.log('data added successfully')
    //setOperators(temp)
    // temp.map((ran)=>{
    //   console.log(ran[1].operator)
    // })
    
  })
  .catch((error) => {
    console.log(error);
    
  });
  fetchBookedAppointments();
    
 };

 const cancelAppointment = async (appointment) => {
    console.log(appointment[1])
    axios
    .delete(`http://localhost:5555/appointments/${appointment[1]._id}`)
    .then(()=>{

    })
    .catch((err)=>{
      console.log('Deeletion failed')
    })
    fetchBookedAppointments();
    
 };

 const rescheduleAppointment = async (id, updatedStart, updatedEnd) => {
    await axios.put(`/api/appointments/${id}`, { start: updatedStart, end: updatedEnd });
    fetchBookedAppointments();
    //fetchOpenSlots();
 };

 // RENDER FUNCTIONS HERE
 return(
  <div className='mx-8 p-8 flex flex-col  '>
    <div className='mx-24 my-4 px-24 py-4 flex flex-col items-center'>
      <div className='w-full flex justify-between'>
      <select
      value={selectedOperator}
      className='bg-sky-200 w-full my-4 py-4 font-bold text-center rounded '
      onChange={(e) => setSelectedOperator(e.target.value)}
      >
                <option value="">Select Service Operator</option>
                <option value="ServiceOperator0">ServiceOperator0</option>
                <option value="ServiceOperator1">ServiceOperator1</option>
                <option value="ServiceOperator2">ServiceOperator2</option>

      </select>   
      <button onClick={fetchOperators}
      className=' bg-blue-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 my-4 ml-8 rounded'
      >Go</button>
      </div>
      <br/>
      <label
      className='flex flex-col sm:w-full text-gray-700 text-sm font-bold p-2 border-solid border-2 border-blue-500 rounded'
      > Select Date
      <input
       className='block sm:w-full text-gray-700 text-sm font-bold border-none'
      type='date'
      value={date}
      placeholder='Select Date'
      onChange={(e) => setDate(e.target.value)}
      /></label>
      <br/>
      <select name="from" id="from" value={startTime}
                className="sm:w-full p-4 border-0 cursor-pointer drop-shadow-md bg-sky-200 w-72 duration-300 hover:bg-sky-400 focus:white-300 rounded font-bold"
                onChange={(e) => {
                  let val = e.target.value
                  setStartTime(e.target.value)
                  if(val == 23){
                    setEndTime(0);
                  }else{
                    setEndTime(parseInt(val)+1);
                  }
                }}>
                <option value="">Select Start Time</option>
                <option value="0">0:00</option>
                <option value="1">1:00</option>
                <option value="2">2:00</option>
                <option value="3">3:00</option>
                <option value="4">4:00</option>
                <option value="5">5:00</option>
                <option value="6">6:00</option>
                <option value="7">7:00</option>
                <option value="8">8:00</option>
                <option value="9">9:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
                

      </select>
      <select name="to" id="to" value={endTime}
                className='sm:w-full my-4 p-4 border-0 cursor-pointer drop-shadow-md bg-sky-200 w-72 duration-300 hover:bg-sky-400 focus:white-300 rounded font-bold'
                onChange={(e) => setEndTime(e.target.value)}>
                <option value="">Select End Time</option>
                <option value={parseInt(endTime)}>{parseInt(endTime)}:00</option>
                
      </select>
      
      <br/>
      <button 
      onClick={bookAppointment}
      className='p-4 mb-4 sm:w-full bg-blue-500 hover:bg-indigo-600 text-white font-bold rounded'
      >Book appointment</button>
    </div>


    <div className="flex flex-col">
 <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
        <table className="min-w-full divide-y divide-x divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Service Operator
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {operators.map((appointment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm text-gray-900">{appointment[1].operator}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm text-gray-900">{appointment[1].date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm text-gray-900">{appointment[1].start}:00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm text-gray-900">{appointment[1].end}:00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                 {/* <button onClick={() => rescheduleAppointment(appointment)} className="text-indigo-600 hover:text-indigo-900">Reschedule</button> */}
                 <button onClick={() => cancelAppointment(appointment)} className="text-red-600 hover:text-red-900">Cancel</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 </div>
</div>
  </div>
 )

};

export default App;