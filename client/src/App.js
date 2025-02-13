import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup, Login } from "./components/users/RegisterLogin";
import HomePage from "./components/posts/HomePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
