import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import { useState } from 'react';
import axios from 'axios';

export default function Landing() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to main if already logged in
        }

        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/courses/');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses for landing page:', error);
            }
        };

        fetchCourses();
    }, [user, navigate]);

    return (
        <div>
            {/* Hero Banner */}
            <div className="bg-blue-600 text-white py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to EduLearn</h1>
                <p className="text-xl">Empowering your learning journey with AI innovation.</p>
                {/* <img
                    src="/hero-image.jpg" // ✅ you can save image inside /public folder!
                    alt="EduLearn Hero"
                    className="mx-auto mt-8 w-2/3 rounded-lg shadow-lg"
                /> */}
            </div>

            {/* Course List */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Explore Courses</h2>
                {courses.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div key={course.id} onClick={() => navigate('/login')} className="cursor-pointer">
                                <CourseCard
                                    course={course}
                                    isLandingPage={true} // Add small prop to adjust CourseCard if needed
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 mt-20">
                        No courses available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}
