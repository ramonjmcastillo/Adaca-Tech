import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
