
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function LessonDetail() {
    const { id } = useParams(); // lesson id
    const { user } = useAuth();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/lessons/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setLesson(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lesson:', error);
                setLoading(false);
            }
        };

        fetchLesson();
    }, [id, user, navigate]);

    if (loading) {
        return <div className="text-center text-gray-500 mt-20">Loading lesson...</div>;
    }

    if (!lesson) {
        return <div className="text-center text-gray-500 mt-20">Lesson not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">{lesson.title}</h1>
            <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                {lesson.content}
            </div>
        </div>
    );
}
