import AddCourseModal from '../components/AddCourseModal';

export default function AddCoursePage() {
    return <AddCourseModal onClose={() => window.history.back()} />;
}
