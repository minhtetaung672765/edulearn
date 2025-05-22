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

    // return (
    //     <div
    //         onClick={handleClick}
    //         className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300"
    //     >
    //         <img
    //             // src={course.course_image ? `http://127.0.0.1:8000${course.course_image}` : '/img_defaults/default_course.jpg'}
    //             src={course.course_image || '/img_defaults/default_course.jpg'}
    //             // src={course.id == 11 ? '/img_courses/dsa_course3.jpg' : '/img_defaults/default_course.jpg'}
    //             alt={course.title}
    //             className="w-full h-40 object-cover"
    //         />
    //         <div className="p-4">
    //             <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
    //             <p className="text-gray-600 text-sm mt-2 line-clamp-3">
    //                 {course.description}
    //             </p>
    //         </div>
    //     </div>
    // );

    return (() => {
        let imageSrc;

        switch (course.id) {
            case 11:
                imageSrc = '/img_courses/dsa_course3.png';
                break;
            case 10:
                imageSrc = '/img_courses/python_course.jpg';
                break;
            case 14:
                imageSrc = '/img_courses/django_course.jpg';
                break;
            default:
                imageSrc = '/img_defaults/default_course.jpg';
                break;
        }

        return (
            <div
                onClick={handleClick}
                className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
                <img
                    src={imageSrc}
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
    })();
}
