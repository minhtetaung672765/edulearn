import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCourseModal({ onClose }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    // const [tags, setTags] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);


    // const handleCreateCourse = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axiosInstance.post('/courses/', {
    //             title,
    //             description,
    //             category,
    //             tags: tags.split(',').map(tag => tag.trim()),
    //             course_image: imageUrl
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });

    //         const courseId = response.data.id;
    //         navigate(`/courses/${courseId}`);
    //     } catch (err) {
    //         console.error('Error creating course:', err);
    //         alert('Failed to create course');
    //     }
    // };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags(prev => [...prev, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleCreateCourse = async () => {
        try {
            const token = localStorage.getItem('token');

            // Step 1: Create tags first and collect their IDs
            const tagIds = [];
            // for (const tag of tags) {
            //     const tagRes = await axios.post(
            //         'http://127.0.0.1:8000/api/tags/',
            //         { name: tag },
            //         {
            //             headers: {
            //                 Authorization: `Bearer ${token}`
            //             }
            //         }
            //     );
            //     tagIds.push(tagRes.data.id);
            // }

            for (const tag of tags) {
                const res = await axios.post(
                    'http://127.0.0.1:8000/api/tags/',
                    { name: tag },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
                tagIds.push(res.data.id);
            }


            // Step 2: Upload course with image
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('course_image', imageFile); // file object
            tagIds.forEach(id => formData.append('tags', id)); // for many-to-many

            const response = await axios.post(
                'http://127.0.0.1:8000/api/courses/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            alert('Course created successfully!');
            navigate(`/courses/${response.data.id}`); // redirect to course detail
        } catch (error) {
            console.error('Error creating course:', error);
            alert('Failed to create course');
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
                onSubmit={handleCreateCourse}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Add New Course</h2>

                <input
                    type="text"
                    placeholder="Course Title"
                    className="w-full mb-3 border px-4 py-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Course Description"
                    className="w-full mb-3 border px-4 py-2 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    className="w-full mb-3 border px-4 py-2 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                {/* <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    className="w-full mb-3 border px-4 py-2 rounded"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                /> */}
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                        }
                    }}
                    className="border px-2 py-1 rounded w-full"
                />
                <button
                    type="button"
                    onClick={handleAddTag}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                >
                    Add Tag
                </button>


                {/* <input
                    type="text"
                    placeholder="Course Image URL"
                    className="w-full mb-4 border px-4 py-2 rounded"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                /> */}
                <input
                    type="file"
                    accept="image/*"
                    className="w-full mb-4 border px-4 py-2 rounded"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />

                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="text-gray-600 hover:text-red-500">
                        Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Create Course
                    </button>
                </div>
            </form>
        </div>
    );
}
