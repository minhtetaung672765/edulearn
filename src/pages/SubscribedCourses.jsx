import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SubscribedCourses() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [subscribedCourses, setSubscribedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchSubscribedCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/my-courses/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSubscribedCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching subscribed courses:', error);
                setLoading(false);
            }
        };

        fetchSubscribedCourses();
    }, [user, navigate]);

    if (loading) {
        return <div className="text-center text-gray-500 mt-20">Loading subscribed courses...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6 text-center">My Subscribed Courses</h1>

            {subscribedCourses.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    {subscribedCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isSubscribed={true}
                            onOpenModal={() => { }} // no modal needed for subscribed courses
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 mt-20">
                    You have not subscribed to any courses yet.
                </div>
            )}
        </div>
    );
}
