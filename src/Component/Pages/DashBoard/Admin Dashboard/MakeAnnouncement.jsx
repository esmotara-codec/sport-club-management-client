import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/asioxSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [announcementId, setAnnouncementId] = useState(null);

    const { data: announcements = [], isLoading, error } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data;
        }
    });

    const addMutation = useMutation({
        mutationFn: async (newAnnouncement) => {
            const res = await axiosSecure.post('/announcements', newAnnouncement);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('announcements');
            toast.success('Announcement added successfully');
            setTitle('');
            setDescription('');
        },
        onError: () => {
            toast.error('Failed to add announcement');
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedAnnouncement) => {
            const res = await axiosSecure.put(`/announcements/${announcementId}`, updatedAnnouncement);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('announcements');
            toast.success('Announcement updated successfully');
            setTitle('');
            setDescription('');
            setIsUpdating(false);
            setAnnouncementId(null);
        },
        onError: () => {
            toast.error('Failed to update announcement');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/announcements/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('announcements');
            toast.success('Announcement deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete announcement');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdating) {
            updateMutation.mutate({ title, description });
        } else {
            addMutation.mutate({ title, description });
        }
    };

    const handleEdit = (announcement) => {
        setIsUpdating(true);
        setAnnouncementId(announcement._id);
        setTitle(announcement.title);
        setDescription(announcement.description);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading announcements</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>
            <div className="mb-8">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">{isUpdating ? 'Update Announcement' : 'Add New Announcement'}</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            className="textarea textarea-bordered w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">
                        {isUpdating ? 'Update Announcement' : 'Add Announcement'}
                    </button>
                    {isUpdating && (
                        <button
                            type="button"
                            className="btn btn-ghost mt-4 ml-2"
                            onClick={() => {
                                setIsUpdating(false);
                                setAnnouncementId(null);
                                setTitle('');
                                setDescription('');
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-4">All Announcements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {announcements.map((announcement) => (
                        <div key={announcement._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{announcement.title}</h2>
                                <p>{announcement.description}</p>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => handleEdit(announcement)}
                                        className="btn btn-info btn-xs mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(announcement._id)}
                                        className="btn btn-error btn-xs"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MakeAnnouncement;
