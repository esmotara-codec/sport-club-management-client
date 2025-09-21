import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hook/asioxSecure';
import Swal from 'sweetalert2';
import useCourts from '../../../hook/useCourts';
import { Camera, Clock, DollarSign, MapPin, Plus, Upload, CheckCircle } from 'lucide-react';
import useAxiosPublic from '../../../hook/useAxiosPublic';

const CreateCourt = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [, , refetch] = useCourts();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const axiosPublic =  useAxiosPublic(); // Use the secure axios instance for public requests

  const onSubmit = async (data) => {
    setIsUploading(true);

    if (!imagePreview) {
        Swal.fire({
            icon: 'error',
            title: 'Image Not Found',
            text: 'Please select an image to upload.',
            confirmButtonColor: '#EF4444'
        });
        setIsUploading(false);
        return;
    }

    const base64Image = imagePreview.split(',')[1];
    const formData = new FormData();
    formData.append('image', base64Image);

    try {
        // Step 1: Upload image
        const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);

        // Step 2: Create court with the returned image URL
        const courtInfo = {
            courtType: data.courtType,
            slotTime: data.slotTime,
            pricePerSession: data.pricePerSession,
            courtImage: res.data.data.display_url
        };

        await axiosSecure.post('/create-court', courtInfo);

        // Step 3: Handle success
        reset();
        refetch();
        setImagePreview(null);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Court created successfully!',
            showConfirmButton: false,
            timer: 2000,
            background: '#10B981',
            color: 'white',
            toast: true
        });

    } catch (error) {
        console.error('Error during court creation process:', error);
        const errorMessage = error.response?.data?.error?.message || error.response?.data?.message || 'An unknown error occurred.';
        let title = 'Request Failed';

        if (error.response) {
            if (error.response.status === 403) {
                title = 'Authorization Error';
            } else if (error.config.url.includes('api.imgbb.com')) {
                title = 'Image Upload Failed';
            }
        } else if (!error.response) {
            title = 'Network Error';
        }

        Swal.fire({
            icon: 'error',
            title: title,
            text: errorMessage,
            confirmButtonColor: '#EF4444'
        });
    } finally {
        setIsUploading(false);
    }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file); // Add this line
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const courtTypes = [
    { value: 'Tennis', icon: '🎾' },
    { value: 'Badminton', icon: '🏸' },
    { value: 'Squash', icon: '🏓' },
    { value: 'Basketball', icon: '🏀' },
    { value: 'Volleyball', icon: '🏐' },
    { value: 'Football', icon: '⚽' },
    { value: 'Swimming', icon: '🏊‍♂️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
         
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Court</h1>
          <p className="text-gray-600 text-lg">Add a new sports court to your facility</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              Court Details
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <Camera className="w-5 h-5 mr-2 text-blue-600" />
                Court Image
              </label>
              
              <div className="relative">
                <input
                  type="file"
                  id="courtImage"
                  {...register('courtImage', { required: 'Court image is required' })}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="courtImage"
                  className="flex flex-col items-center justify-center w-full h-64 border-3 border-dashed border-blue-300 rounded-2xl cursor-pointer bg-gradient-to-b from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                      {/* <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-green-400" />
                      </div> */}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-blue-500 mb-4" />
                      <p className="text-xl font-medium text-gray-700 mb-2">Upload Court Image</p>
                      <p className="text-gray-500">Click to select or drag and drop</p>
                      <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
                {errors.courtImage && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.courtImage.message}
                  </p>
                )}
              </div>
            </div>

            {/* Court Type Section */}
            <div className="space-y-4">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Court Type
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {courtTypes.map((type) => (
                  <label key={type.value} className="relative cursor-pointer">
                    <input
                      type="radio"
                      value={type.value}
                      {...register('courtType', { required: 'Court type is required' })}
                      className="sr-only peer"
                    />
                    <div className="flex items-center justify-center p-4 bg-gray-50 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 peer-checked:bg-blue-100 peer-checked:border-blue-500 transition-all duration-200">
                      <span className="text-2xl mr-3">{type.icon}</span>
                      <span className="font-medium text-gray-700 peer-checked:text-blue-700">{type.value}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              {errors.courtType && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  {errors.courtType.message}
                </p>
              )}
            </div>

            {/* Slot Time Section */}
            <div className="space-y-4">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Available Time Slot
              </label>
              
              <div className="relative">
                <select
                  {...register('slotTime', { required: 'Slot time is required' })}
                  className="w-full p-4 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="">Select a time slot</option>
                  {slotTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              
              {errors.slotTime && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  {errors.slotTime.message}
                </p>
              )}
            </div>

            {/* Price Section */}
            <div className="space-y-4">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                Price Per Session
              </label>
              
              <div className="relative">
                <input
                  type="number"
                  {...register('pricePerSession', { 
                    required: 'Price per session is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Price must be a positive number' }
                  })}
                  placeholder="Enter session price"
                  className="w-full p-4 pl-12 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              
              {errors.pricePerSession && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  {errors.pricePerSession.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Court...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-3" />
                    Create Court
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-800 mb-2">Quick Setup</h3>
            <p className="text-gray-600 text-sm">Create courts in under 2 minutes with our streamlined process.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
            <h3 className="font-bold text-gray-800 mb-2">Auto Management</h3>
            <p className="text-gray-600 text-sm">Courts are automatically added to your booking system.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500">
            <h3 className="font-bold text-gray-800 mb-2">Instant Updates</h3>
            <p className="text-gray-600 text-sm">Changes reflect immediately across all platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourt;