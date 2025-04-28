import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showProfileBox, setShowProfileBox] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                {user ? (
                    <button onClick={() => navigate('/courses')} className="text-2xl font-bold text-blue-600">
                        EduLearn
                    </button>
                ) : (
                    <button onClick={() => navigate('/')} className="text-2xl font-bold text-blue-600">
                        EduLearn
                    </button>
                )}

                {/* Nav Links */}
                {/* <div className="flex space-x-8">
                    <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 font-semibold">
                        All Courses
                    </button>
                    <button onClick={() => navigate('/subscribed')} className="text-gray-700 hover:text-blue-600 font-semibold">
                        Subscribed
                    </button>
                    <button onClick={() => navigate('/recommended')} className="text-gray-700 hover:text-blue-600 font-semibold">
                        Recommended
                    </button>
                </div> */}
                {/* Navigation */}
                <div className="flex space-x-8">
                    {user ? (
                        <>
                            <button onClick={() => navigate('/courses')} className="text-gray-700 hover:text-blue-600 font-semibold">
                                All Courses
                            </button>
                            <button onClick={() => navigate('/subscribed')} className="text-gray-700 hover:text-blue-600 font-semibold">
                                Subscribed
                            </button>
                            <button onClick={() => navigate('/recommended')} className="text-gray-700 hover:text-blue-600 font-semibold">
                                Recommended
                            </button>
                        </>
                    ) : (
                        <>
                            {/* No course links when not logged in */}
                        </>
                    )}
                </div>


                {/* Profile or Login */}
                {/* <div>
                    {user ? (
                        <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 font-semibold">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-blue-600 font-semibold">
                            Login
                        </button>
                    )}
                </div> */}
                <div className="relative">
                    {user ? (
                        <>
                            <button
                                className="text-gray-700 hover:text-blue-600 font-semibold"
                                onClick={() => setShowProfileBox(!showProfileBox)}
                            >
                                {user.user.name}
                            </button>

                            {showProfileBox && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                                    <div className="px-4 py-2 text-gray-800 border-b">
                                        <p className="font-bold">{user.user.name}</p>
                                        <p className="text-sm">{user.user.email}</p>
                                    </div>
                                    <button
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex space-x-4">
                            <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-blue-600 font-semibold">
                                Login
                            </button>
                            <button onClick={() => navigate('/register')} className="text-gray-700 hover:text-blue-600 font-semibold">
                                Register
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}
