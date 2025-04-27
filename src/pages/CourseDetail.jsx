import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function CourseDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/courses/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCourse(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course detail:', error);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id, user, navigate]);

    if (loading) {
        return <div className="text-center text-gray-500 mt-20">Loading course details...</div>;
    }

    if (!course) {
        return <div className="text-center text-gray-500 mt-20">Course not found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">{course.title}</h1>
            <p className="text-gray-700 mb-8">{course.description}</p>

            <h2 className="text-2xl font-semibold mb-4">Lessons</h2>

            {course.lessons && course.lessons.length > 0 ? (
                <ul className="space-y-4">
                    {course.lessons.map((lesson) => (
                        <li key={lesson.id} className="p-4 bg-gray-100 rounded-lg">
                            <Link to={`/lesson/${lesson.id}`} className="font-semibold text-blue-600 hover:underline">
                                Lesson {lesson.lesson_number}: {lesson.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-gray-600">No lessons available for this course yet.</div>
            )}
        </div>
    );
}
