import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

const CreatePost = () => {
    const [postInput, setPostInput] = useState("");
    const [user] = useAuthState(auth);

    const handleCreatePost = async () => {
        try {
            await addDoc(collection(db, "Posts"), {
                uName: user?.displayName,
                uPost: postInput,
                comments: [],
            });
        } catch (err) {
            console.error(err);
        }
        setPostInput("");
    };

    return (
        <div className="rounded border border-black px-6 py-3">
            <label htmlFor="create" className="block mb-2 font-semibold">
                Create Post
            </label>
            <div className="mt-4 flex items-center gap-x-4">
                <input
                    type="text"
                    placeholder="Add Comment"
                    className="flex-1 border border-black rounded focus:outline-none px-4 py-2"
                    value={postInput}
                    onChange={(e) => setPostInput(e.target.value)}
                    id="create"
                />
                <button
                    className="rounded border-black border px-4 py-2 font-semibold"
                    onClick={handleCreatePost}
                >
                    Create Post
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
