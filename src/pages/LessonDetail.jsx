import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

export default function LessonDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showQuestions, setShowQuestions] = useState(false);
    const [generatedData, setGeneratedData] = useState(null);
    const [mcqAnswers, setMcqAnswers] = useState({});
    const [mcqSubmitted, setMcqSubmitted] = useState({});
    const [showAnswers, setShowAnswers] = useState({});

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchLesson = async () => {
            try {
                const response = await axiosInstance.get(`/lessons/${id}/`, {
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

    const handleGenerateQuestions = async () => {
        try {
            const response = await axiosInstance.post(
                '/generate-questions/',
                { lesson_content: lesson.content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setGeneratedData(response.data);
            setShowQuestions(true);
            // 🔁 Reset all interactive states for fresh attempt
            setShowAnswers({});
            setMcqAnswers({});
            setMcqSubmitted({});
        } catch (error) {
            console.error('Error generating questions:', error);
        }
    };

    const handleToggleAnswer = (index) => {
        setShowAnswers(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleOptionSelect = (index, option) => {
        if (!mcqSubmitted[index]) {
            setMcqAnswers(prev => ({ ...prev, [index]: String(option).trim() }));
        }
    };


    const handleSubmitAnswer = (index) => {
        setMcqSubmitted(prev => ({ ...prev, [index]: true }));
    };

    if (loading) {
        return <div className="text-center text-gray-500 mt-20">Loading lesson...</div>;
    }

    if (!lesson) {
        return <div className="text-center text-gray-500 mt-20">Lesson not found.</div>;
    }

    return (
        <div className="relative max-w-4xl mx-auto px-4 py-8">
            {!showQuestions ? (
                <>
                    <h1 className="text-3xl font-bold mb-6 text-blue-600">{lesson.title}</h1>
                    <div className="text-gray-800 whitespace-pre-line leading-relaxed mb-16">
                        {lesson.content}
                    </div>
                    <button
                        onClick={handleGenerateQuestions}
                        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg"
                    >
                        Generate Questions & MCQs
                    </button>
                </>
            ) : (
                <div className="bg-white p-6 rounded shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-blue-700">Generated Questions</h2>
                        <button onClick={() => setShowQuestions(false)}>
                            <FaTimes className="text-xl text-gray-600 hover:text-red-500" />
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Short Answer Questions</h3>
                        {generatedData?.questions?.map((q, i) => (
                            <div key={i} className="mb-4">
                                <p className="text-gray-700 font-medium">Q{i + 1}. {q.question}</p>
                                <button
                                    onClick={() => handleToggleAnswer(i)}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    {showAnswers[i] ? 'Hide Answer' : 'Show Answer'}
                                </button>
                                {showAnswers[i] && (
                                    <p className="text-green-700 mt-1">Answer: {q.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Multiple Choice Questions</h3>
                        {generatedData?.mcqs?.map((mcq, i) => (
                            <div key={i} className="mb-6 border rounded p-4">
                                <p className="font-medium text-gray-800">{i + 1}. {mcq.question}</p>
                                <div className="mt-2 space-y-2">

                                    {mcq.options.map((opt, idx) => {
                                        const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
                                        return (
                                            <button
                                                key={idx}
                                                disabled={mcqSubmitted[i]}
                                                onClick={() => handleOptionSelect(i, optionLetter)}
                                                className={`block w-full text-left px-4 py-2 rounded border ${mcqSubmitted[i]
                                                    ? (optionLetter === mcq.answer
                                                        ? 'bg-green-100 border-green-500'
                                                        : optionLetter === mcqAnswers[i]
                                                            ? 'bg-red-100 border-red-500'
                                                            : 'bg-gray-50')
                                                    : (optionLetter === mcqAnswers[i] ? 'bg-blue-100 border-blue-400' : 'hover:bg-blue-50')
                                                    }`}
                                            >
                                                <span className="font-semibold mr-2">{optionLetter}.</span> {opt}
                                            </button>
                                        );
                                    })}

                                </div>
                                {!mcqSubmitted[i] && (
                                    <button
                                        onClick={() => handleSubmitAnswer(i)}
                                        className="mt-3 bg-blue-600 text-white py-1 px-3 rounded"
                                    >
                                        Submit Answer
                                    </button>
                                )}

                                {mcqSubmitted[i] && (
                                    <div className="mt-2">
                                        {console.log("Debug | Chosen:", mcqAnswers[i], "Correct:", mcq.answer)}

                                        {mcqAnswers[i] === mcq.answer ? (
                                            <p className="text-green-600 flex items-center gap-2"><FaCheckCircle /> Correct</p>
                                        ) : (
                                            <p className="text-red-600 flex items-center gap-2">
                                                <FaTimesCircle /> Incorrect. <br />
                                                Correct Answer: <span className="font-semibold">{mcq.answer}</span>
                                            </p>
                                        )}
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
