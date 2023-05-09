import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import public routes components
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import StudentLogin from "./pages/StudentLogin";

// import student route components
import CoursePlayer from "./pages/StudentPages/CoursePlayer";
import QuizPage from "./pages/StudentPages/QuizPage";
import Leaderboard from "./pages/StudentPages/Leaderboard";

// import admin route components
import AssignmentPage from "./pages/AdminPages/AssignmentPage";
import Dashboard from "./pages/AdminPages/Dashboard";
import Quizzes from "./pages/AdminPages/Quizzes";
import AssignmentMark from "./pages/AdminPages/AssignmentMark";
import Videos from "./pages/AdminPages/Videos";

// import other modules
import Navber from "./components/Navber";
import useAuthCheck from "./hooks/useAuthCheck";
import PublicRoute from "./components/Route/PublicRoute";
import StudentRoute from "./components/Route/StudentRoute";
import AdminRoute from "./components/Route/AdminRoute";
import useAuth from "./hooks/useAuth";

function App() {
  const authCheck = useAuthCheck();
  const isAuth = useAuth();

  return !authCheck ? (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  ) : (
    <Router>
      {isAuth && <Navber />}
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />

        {/* Student route */}
        <Route
          path="/player"
          element={
            <StudentRoute>
              <CoursePlayer />
            </StudentRoute>
          }
        />
        <Route
          path="/quizzes/:videoId"
          element={
            <StudentRoute>
              <QuizPage />
            </StudentRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <StudentRoute>
              <Leaderboard />
            </StudentRoute>
          }
        />

        {/* Admin route */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <AdminRoute>
              <AssignmentPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminRoute>
              <Quizzes />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/assignment-mark"
          element={
            <AdminRoute>
              <AssignmentMark />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/videos"
          element={
            <AdminRoute>
              <Videos />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
