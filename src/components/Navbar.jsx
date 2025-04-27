import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-dark shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-white-600">
                    EduLearn
                </Link>

                {/* Navigation Links */}
                <div className="flex space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold">
                        All Courses
                    </Link>
                    <Link to="/subscribed" className="text-gray-700 hover:text-blue-600 font-semibold">
                        Subscribed
                    </Link>
                    <Link to="/recommended" className="text-gray-700 hover:text-blue-600 font-semibold">
                        Recommended
                    </Link>
                </div>

                {/* Profile Menu Placeholder */}
                <div className="relative">
                    <button className="text-gray-700 hover:text-blue-600 font-semibold">
                        Profile
                    </button>
                </div>
            </div>
        </nav>
    );
}
