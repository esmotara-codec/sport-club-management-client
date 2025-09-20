import React, { useState } from 'react';

const CreateCourt = () => {
  const [courtData, setCourtData] = useState({
    courtImage: null,
    courtType: '',
    slotTime: '',
    pricePerSession: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'courtImage') {
      setCourtData({ ...courtData, courtImage: files[0] });
    } else {
      setCourtData({ ...courtData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(courtData);
    // You would typically send this data to your backend here
  };

  const slotTimes = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Court</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="courtImage" className="block text-sm font-medium text-gray-700">
            Court Image
          </label>
          <div className="mt-1">
            <input
              type="file"
              name="courtImage"
              id="courtImage"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="courtType" className="block text-sm font-medium text-gray-700">
            Court Type
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="courtType"
              id="courtType"
              value={courtData.courtType}
              onChange={handleChange}
              placeholder="e.g., Tennis, Badminton, Squash"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label htmlFor="slotTime" className="block text-sm font-medium text-gray-700">
            Slot Time
          </label>
          <div className="mt-1">
            <select
              name="slotTime"
              id="slotTime"
              value={courtData.slotTime}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select a time slot</option>
              {slotTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="pricePerSession" className="block text-sm font-medium text-gray-700">
            Price Per Session
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="pricePerSession"
              id="pricePerSession"
              value={courtData.pricePerSession}
              onChange={handleChange}
              placeholder="Enter price"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Court
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourt;
