import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    const fetchDocInfo = () => {
      const foundDoctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoctor);
      console.log(foundDoctor);
    };
    if (doctors.length > 0) fetchDocInfo();
  }, [docId, doctors]);

  if (!docInfo) {
    return <p className="text-center py-10 text-gray-500">Loading doctor info...</p>;
  }

  return (
    <div className="p-6">
      {/* Doctor Detail */}
      <div className="flex gap-6 items-start max-w-3xl mx-auto border p-4 rounded shadow-sm bg-white">
        {/* Doctor Image */}
        <div className="w-40 h-40">
          <img src={docInfo.image} alt="doctor_img" className="w-full h-full object-contain" />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <p className="text-xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
          </p>
          <div className="mt-2 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="mt-2 bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
              {docInfo.experience}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
