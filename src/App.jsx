import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import AllCourses from './pages/AllCourses';
import SubscribedCourses from './pages/SubscribedCourses';
import RecommendedCourses from './pages/RecommendedCourses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Landing from './pages/Landing.jsx';
import LessonDetail from './pages/LessonDetail.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<AllCourses />} /> {/* After login, navigate here */}
            <Route path="/subscribed" element={<SubscribedCourses />} />
            <Route path="/recommended" element={<RecommendedCourses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/lesson/:id" element={<LessonDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
