import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course, isSubscribed, onOpenModal }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (isSubscribed) {
            navigate(`/course/${course.id}`);
        } else {
            onOpenModal(course);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300"
        >
            <img
                src={course.course_image || '/img_defaults/default_course.jpg'}
                alt={course.title}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {course.description}
                </p>
            </div>
        </div>
    );
}
