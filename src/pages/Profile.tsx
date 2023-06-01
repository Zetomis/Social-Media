import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { FollowsInterface } from "../Interfaces/interfaces";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../components/Button";

const Profile = () => {
    const { id } = useParams();
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [userFollow, setUserFollows] = useState<FollowsInterface[]>([]);
    const [user] = useAuthState(auth);
    const [isFollowing, setIsFollowing] = useState(false);

    const navigate = useNavigate();

    const handleFollow = async () => {
        try {
            const userRef = doc(db, "UserData", id || "");
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                await setDoc(userRef, {
                    ...userSnap.data(),
                    follows: [
                        ...userSnap.data().follows,
                        { followerId: user?.uid },
                    ],
                });
                setIsFollowing(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnfollow = () => {
        try {
            setIsFollowing(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const userRef = doc(db, "UserData", id || "");
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUserName(userSnap.data().uName);
                    setUserEmail(userSnap.data().uEmail);
                    setUserId(userSnap.data().id);
                    setUserFollows(userSnap.data().follows);
                    setIsFollowing(
                        Boolean(
                            userFollow.find(
                                (curUser) => curUser.followerId === user?.uid
                            )
                        )
                    );
                } else {
                    setError("No such user :c");
                }
            } catch (err) {
                console.error(err);
            }
        };

        getUser();
    }, []);

    console.log(isFollowing);

    if (error) {
        return <h1>{error}</h1>;
    } else {
        return (
            <div className="mt-20 px-10 py-5">
                <div className="flex flex-col gap-y-2 items-center">
                    <h1 className="font-bold text-2xl text-center">
                        {userName}
                    </h1>
                    <span className="block font-semibold text-center mb-4">
                        {userEmail}
                    </span>
                    {user?.uid !== id && (
                        <div>
                            {isFollowing ? (
                                <Button onClickEvent={handleUnfollow}>
                                    Unfollow
                                </Button>
                            ) : (
                                <Button onClickEvent={handleFollow}>
                                    Follow
                                </Button>
                            )}
                        </div>
                    )}
                    <div className="rounded border border-black px-6 py-3 w-full max-w-md mt-10">
                        <h1 className="font-semibold">Followers</h1>
                        {userFollow &&
                            userFollow.map((follower) => (
                                // <Link to={`/profile/${follower.followerId}`}>
                                //     {follower.followerId}
                                // </Link>
                                <button
                                    onClick={() => {
                                        navigate(
                                            `/profile/${follower.followerId}`
                                        );
                                    }}
                                >
                                    {follower.followerId}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;
