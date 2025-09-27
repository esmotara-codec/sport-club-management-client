import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../hook/useAxiosPublic';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await axiosPublic.get('/announcements');
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, [axiosPublic]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{announcement.title}</h2>
            <p className="text-gray-600">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
