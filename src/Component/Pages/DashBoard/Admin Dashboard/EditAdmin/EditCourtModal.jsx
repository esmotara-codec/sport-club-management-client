import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hook/asioxSecure';
import useAxiosPublic from '../../../../hook/useAxiosPublic';
import Swal from 'sweetalert2';
import { Camera, Clock, DollarSign, MapPin, X, Upload, CheckCircle } from 'lucide-react';

const EditCourtModal = ({ isOpen, onClose, court, refetch }) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const fileInputRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (court) {
      setValue('courtType', court.courtType);
      setValue('slotTime', court.slotTime);
      setValue('pricePerSession', court.pricePerSession);
      setImagePreview(court.courtImage);
    }
  }, [court, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setIsUploading(true);
    let imageUrl = court.courtImage;

    const file = fileInputRef.current?.files[0];
    // If a new image is selected
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await axiosPublic.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        
        if (res.data.secure_url) {
          imageUrl = res.data.secure_url;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Image upload error:', error);
        const errorMessage = error.response?.data?.error?.message || 'Could not upload the new image. Please try again.';
        
        Swal.fire({
          icon: 'error',
          title: 'Image Upload Failed',
          text: errorMessage,
          confirmButtonColor: '#EF4444',
        });
        setIsUploading(false);
        return;
      }
    }

    const updatedCourtInfo = {
      courtType: data.courtType,
      slotTime: data.slotTime,
      pricePerSession: data.pricePerSession,
      courtImage: imageUrl,
    };

    try {
      await axiosSecure.put(`/update-court/${court._id}`, updatedCourtInfo);
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Court updated successfully!',
        showConfirmButton: false,
        timer: 2000,
        background: '#10B981',
        color: 'white',
        toast: true,
      });
      
      refetch();
      onClose();
      // Reset form when modal closes
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error updating court:', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong while updating the court.';
      
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: errorMessage,
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    reset();
    setImagePreview(court?.courtImage || null);
    onClose();
  };

  if (!isOpen) return null;

  const slotTimes = [
    '09:00 AM - 05:00 PM',
    '10:00 AM - 06:00 PM',
    '07:00 AM - 06:00 PM',
    '08:00 PM - 06:00 PM',
    '08:00 PM - 04:00 PM',
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
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              Edit Court Details
            </h2>
            <button 
              onClick={handleClose} 
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
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
                id="editCourtImage"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="editCourtImage"
                className="flex flex-col items-center justify-center w-full h-64 border-3 border-dashed border-blue-300 rounded-2xl cursor-pointer bg-gradient-to-b from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-2xl flex items-center justify-center transition-all duration-300">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Upload className="w-12 h-12 text-white mb-2" />
                        <p className="text-white font-medium">Click to change image</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-blue-500 mb-4" />
                    <p className="text-xl font-medium text-gray-700 mb-2">
                      Upload New Court Image
                    </p>
                    <p className="text-gray-500">Click to select or drag and drop</p>
                    <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </label>
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
                    {...register('courtType', {
                      required: 'Court type is required',
                    })}
                    className="sr-only peer"
                  />
                  <div className="flex items-center justify-center p-4 bg-gray-50 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 peer-checked:bg-blue-100 peer-checked:border-blue-500 transition-all duration-200">
                    <span className="text-2xl mr-3">{type.icon}</span>
                    <span className="font-medium text-gray-700 peer-checked:text-blue-700">
                      {type.value}
                    </span>
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
                {...register('slotTime', {
                  required: 'Slot time is required',
                })}
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
                  min: {
                    value: 0,
                    message: 'Price must be a positive number',
                  },
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Updating Court...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourtModal;