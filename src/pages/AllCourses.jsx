import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import axios from 'axios';

export default function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [subscribedCourses, setSubscribedCourses] = useState([]);
    const [modalCourse, setModalCourse] = useState(null);

    useEffect(() => {
        // Fetch all courses
        axios.get('http://127.0.0.1:8000/api/courses/')
            .then(response => setCourses(response.data))
            .catch(error => console.error(error));

        // Fetch subscribed courses
        axios.get('http://127.0.0.1:8000/api/my-courses/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // if you store token
            }
        })
            .then(response => setSubscribedCourses(response.data))
            .catch(error => console.error(error));
    }, []);

    const subscribedCourseIds = subscribedCourses.map(c => c.id);

    const handleOpenModal = (course) => {
        setModalCourse(course);
    };

    const handleCloseModal = () => {
        setModalCourse(null);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6 text-center">All Courses</h1>

            {/* Display Courses */}
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {courses.map(course => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        isSubscribed={subscribedCourseIds.includes(course.id)}
                        onOpenModal={handleOpenModal}
                    />
                ))}
            </div>

            {/* Modal for Non-Subscribed Course */}
            {/* {modalCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">{modalCourse.title}</h2>
                        <p className="text-gray-700 mb-4">{modalCourse.description}</p>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )} */}

            {modalCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{modalCourse.title}</h2>
                        <p className="text-gray-700 mb-4">{modalCourse.description}</p>

                        <h3 className="text-lg font-semibold mb-2">Lessons:</h3>
                        <ul className="list-disc list-inside text-gray-600 mb-4">
                            {modalCourse.lessons && modalCourse.lessons.length > 0 ? (
                                modalCourse.lessons.map((lesson) => (
                                    <li key={lesson.id}>{lesson.title}</li>
                                ))
                            ) : (
                                <li>No lessons available.</li>
                            )}
                        </ul>

                        {/* <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full mb-3"
                            onClick={() => {
                                // Subscribe logic here
                                alert('Subscribe logic here!');
                                handleCloseModal();
                            }}
                        >
                            Subscribe Now
                        </button> */}

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full mb-3"
                            onClick={async () => {
                                try {
                                    await axios.post(`http://127.0.0.1:8000/api/subscribe/${modalCourse.id}/`, {}, {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem('token')}`
                                        }
                                    });
                                    alert('Subscribed successfully!');
                                    handleCloseModal();
                                    window.location.reload(); // reload to show updated courses
                                } catch (error) {
                                    console.error('Error subscribing to course:', error);
                                    alert('Subscription failed. Please try again.');
                                }
                            }}
                        >
                            Subscribe Now
                        </button>

                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded w-full"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
