import { signOut } from "firebase/auth";
import Button from "./Button";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleProfile = () => {
        navigate(`/profile/${user?.uid}`);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bg-teal-700 h-20 flex justify-between items-center px-6">
            <h1 className="font-bold text-white text-2xl">Social Media</h1>
            {user?.isAnonymous === false && (
                <div className="flex gap-x-4">
                    <Button onClickEvent={handleProfile}>Profile</Button>
                    <Button onClickEvent={handleSignOut}>Sign Out</Button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
