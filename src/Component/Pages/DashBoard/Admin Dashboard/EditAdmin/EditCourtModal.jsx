import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hook/asioxSecure';
import useAxiosPublic from '../../../../hook/useAxiosPublic';
import Swal from 'sweetalert2';
import { Camera, Clock, DollarSign, MapPin, X, Upload } from 'lucide-react';

const EditCourtModal = ({ isOpen, onClose, court, refetch }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsUploading(true);
    let imageUrl = court.courtImage;

    // If a new image is selected (imagePreview will be a data URL)
    if (imagePreview && imagePreview.startsWith('data:')) {
      const base64Image = imagePreview.split(',')[1];
      const formData = new FormData();
      formData.append('image', base64Image);
      try {
        const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Image Upload Failed',
          text: 'Could not upload the new image. Please try again.',
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
        timer: 1500,
        toast: true,
      });
      refetch();
      onClose();
    } catch (error) {
      console.error('Error updating court:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong while updating the court.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Edit Court</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Image Section */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Court Image</label>
            <div className="relative">
              <input
                type="file"
                id="editCourtImage"
                {...register('courtImage')}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="editCourtImage"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Upload a new image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Court Type */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Court Type</label>
            <div className="grid grid-cols-3 gap-2">
              {courtTypes.map((type) => (
                <label key={type.value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    value={type.value}
                    {...register('courtType', { required: 'Court type is required' })}
                    className="sr-only peer"
                  />
                  <div className="flex items-center justify-center p-3 bg-gray-100 border-2 rounded-lg hover:bg-blue-50 peer-checked:bg-blue-100 peer-checked:border-blue-500 transition-all">
                    <span className="text-xl mr-2">{type.icon}</span>
                    <span className="font-medium text-sm">{type.value}</span>
                  </div>
                </label>
              ))}
            </div>
            {errors.courtType && <p className="text-red-500 text-sm mt-1">{errors.courtType.message}</p>}
          </div>

          {/* Slot Time & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="slotTime" className="font-semibold text-gray-700 mb-2 block">Time Slot</label>
              <select
                id="slotTime"
                {...register('slotTime', { required: 'Slot time is required' })}
                className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {slotTimes.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.slotTime && <p className="text-red-500 text-sm mt-1">{errors.slotTime.message}</p>}
            </div>
            <div>
              <label htmlFor="pricePerSession" className="font-semibold text-gray-700 mb-2 block">Price Per Session</label>
              <input
                type="number"
                id="pricePerSession"
                {...register('pricePerSession', { required: 'Price is required', valueAsNumber: true })}
                className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.pricePerSession && <p className="text-red-500 text-sm mt-1">{errors.pricePerSession.message}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={isUploading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
              {isUploading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourtModal;