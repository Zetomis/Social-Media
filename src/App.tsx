import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase-config";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.isAnonymous === undefined) {
            navigate("/sign-in");
        } else {
            navigate("/");
        }
    }, [user]);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </div>
    );
};

export default App;
