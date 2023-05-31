import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase-config";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";

const App = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.isAnonymous === undefined) {
            navigate("/sign-in");
        } else {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
            </Routes>
        </div>
    );
};

export default App;
