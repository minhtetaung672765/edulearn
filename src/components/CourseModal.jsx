import { XMarkIcon } from '@heroicons/react/24/solid'; // Install Heroicons if needed

export default function CourseModal({ course, onClose, onSubscribe }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-8 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
                <p className="text-gray-700 mb-6">{course.description}</p>

                <h3 className="text-lg font-semibold mb-3">Lessons:</h3>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                    {course.lessons && course.lessons.length > 0 ? (
                        course.lessons.map((lesson) => (
                            <li key={lesson.id}>{lesson.title}</li>
                        ))
                    ) : (
                        <li>No lessons available.</li>
                    )}
                </ul>

                <button
                    onClick={onSubscribe}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
                >
                    Subscribe Now
                </button>
            </div>
        </div>
    );
}
