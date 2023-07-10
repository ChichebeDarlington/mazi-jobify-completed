import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import { Signup, Error } from "./pages";
import AddJob from "./pages/dashboard/AddJob";
// import { SharedLayout } from "./pages/Dashboard";
import SharedLayout from "./pages/dashboard/SharedLayout";
import AllJobs from "./pages/dashboard/AllJobs";
import Profile from "./pages/dashboard/Profile";
import Stats from "./pages/dashboard/Stats";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />}></Route>
          <Route path="add-job" element={<AddJob />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
