import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import "./App.css";

const App = (): JSX.Element => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile/:id" element={<Profile />} />
				<Route path="/dashboard/:id" element={<Dashboard />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
