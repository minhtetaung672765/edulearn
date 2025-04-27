import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <button onClick={() => navigate('/')} className="text-2xl font-bold text-blue-600">
                    EduLearn
                </button>

                {/* Nav Links */}
                <div className="flex space-x-8">
                    <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 font-semibold">
                        All Courses
                    </button>
                    <button onClick={() => navigate('/subscribed')} className="text-gray-700 hover:text-blue-600 font-semibold">
                        Subscribed
                    </button>
                    <button onClick={() => navigate('/recommended')} className="text-gray-700 hover:text-blue-600 font-semibold">
                        Recommended
                    </button>
                </div>

                {/* Profile or Login */}
                <div>
                    {user ? (
                        <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 font-semibold">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-blue-600 font-semibold">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
