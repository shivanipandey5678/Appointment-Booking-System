import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors ,currencySymbol} = useContext(AppContext);
  const daysOfWeek=['SUN','MON','TUE','WED','THUS','FRI','SAT']
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots,setDocSlots]=useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState("")

  const getAvailableSlot = async () => {
    let today = new Date();
    let allSlots = [];
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
  
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: '2-digit' });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      allSlots.push(timeSlots);
    }
  
    setDocSlots(allSlots);
  };
  







  useEffect(() => {
    const fetchDocInfo = () => {
      const foundDoctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoctor);
      console.log(foundDoctor);
    };
    if (doctors.length > 0) fetchDocInfo();
  }, [docId, doctors]);
  

  useEffect(()=>{
    getAvailableSlot()
  },[docInfo])


  useEffect(() => {
    console.log(docSlots);  // Should now contain 7 arrays with time slot objects
  }, [docSlots]);
  
 
  
  return (
    docInfo &&  <div className="p-6">
      {/* ----------------------Doctor Details-------------------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div >
          
          <img src={docInfo.image} alt="" className='bg-primary rounded-lg sm:max-w-72' />
        </div>
        <div className='flex-1 border  border-gray-400 rounded-lg p-8 py-7 bg-white  mx-3 sm:mx-0  '>
          {/* ------------------Doc Info: name,  degree , experience-------------- */}
          <p className='flex gap-2 font-medium items-center text-gray-900 text-2xl'>
            {docInfo.name}
            <img src={assets.verified_icon} alt="verified_icon" className='w-5'/>
             
          </p>
          <div  className='flex gap-4 items-center text-gray-600 text-sm mt-1'>
            <p>{docInfo.degree}  - {docInfo.speciality}</p>
            <button className='border-1 borger-indigo-100 px-2 py-0.5 text-xs  rounded-full'>{docInfo.experience}</button>
          </div>
          {/* --------------Doctor About----------------- */}
          <div >
             <p  className='flex gap-1 items-center text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
       {/* ---------------Booking slot--------------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700' >
         <p>Booking slots</p>
         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item,index)=>(
                <div onClick={()=>setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white':""}`}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>

                </div>
            ))
          }
         </div>
         <div className='flex flex-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item,index)=>(
                <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time==slotTime?'bg-primary text-white':'text-gray-400 border border-gray-300'}`}>
                  {item.time.toLowerCase()}
                </p>
            ))
          }
         </div>
         <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-4'>Book an appointment</button>
        
      </div>
    {/* listing related doctors */}
    <RelatedDoctors  docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;
