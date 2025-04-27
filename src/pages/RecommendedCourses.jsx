import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

export default function RecommendedCourses() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [subscribedCourses, setSubscribedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalCourse, setModalCourse] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCourses = async () => {
            try {
                const recommended = await axios.get('http://127.0.0.1:8000/api/recommended-courses/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const subscribed = await axios.get('http://127.0.0.1:8000/api/my-courses/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setRecommendedCourses(recommended.data);
                setSubscribedCourses(subscribed.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recommended or subscribed courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, [user, navigate]);

    const subscribedCourseIds = subscribedCourses.map(c => c.id);

    const handleOpenModal = (course) => {
        setModalCourse(course);
    };

    const handleCloseModal = () => {
        setModalCourse(null);
    };

    if (loading) {
        return <div className="text-center text-gray-500 mt-20">Loading recommended courses...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Recommended Courses for You</h1>

            {recommendedCourses.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {recommendedCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isSubscribed={subscribedCourseIds.includes(course.id)}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 mt-20">
                    No course recommendations available yet. Subscribe to some courses to get personalized suggestions!
                </div>
            )}

            {/* Modal */}
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
                                    window.location.reload();
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
