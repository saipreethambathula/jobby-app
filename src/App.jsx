import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Jobs from "./components/Jobs";
import JobItem from "./components/JobItem";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Nested routes */}
        <Route index element={<Home />} /> {/* default / */}
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobItem />} />
      </Route>
    </Routes>
  );
}

export default App;
