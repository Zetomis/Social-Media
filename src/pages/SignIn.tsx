import { signInWithPopup } from "firebase/auth";
import { auth, db, googleAuthProvider } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { UserDataInterface } from "../Interfaces/interfaces";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const SignIn = () => {
    const [user] = useAuthState(auth);

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const addUserData = async () => {
            try {
                if (user?.isAnonymous === false) {
                    const userRef = doc(db, "UserData", user.uid);
                    const userSnap = await getDoc(userRef);
                    if (!userSnap.exists()) {
                        const newUser: UserDataInterface = {
                            uName: user.displayName || "",
                            uEmail: user.email || "",
                            follows: [],
                            id: user.uid,
                        };
                        await setDoc(userRef, newUser);
                    } else {
                        console.log("Welcome Home");
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        addUserData();
    }, [user]);

    return (
        <div className="bg-white w-screen h-screen flex justify-center items-center">
            <Button onClickEvent={handleSignIn}>Sign In with Google</Button>
        </div>
    );
};

export default SignIn;
