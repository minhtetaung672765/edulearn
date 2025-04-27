import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import AllCourses from './pages/AllCourses';
import SubscribedCourses from './pages/SubscribedCourses';
import RecommendedCourses from './pages/RecommendedCourses';
import CourseDetail from './pages/CourseDetail';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">

          <Routes>
            <Route path="/" element={<AllCourses />} />
            <Route path="/subscribed" element={<SubscribedCourses />} />
            <Route path="/recommended" element={<RecommendedCourses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
