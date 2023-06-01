import { useNavigate } from "react-router-dom";
import { PostInterface } from "../Interfaces/interfaces";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Post = ({ post }: { post: PostInterface }) => {
    const navigate = useNavigate();
    const [commentInput, setCommenInput] = useState<string>("");
    const [user] = useAuthState(auth);

    const handleCommentClick = (id: string) => {
        navigate(`/profile/${id}`);
    };

    const handleAddComment = async () => {
        try {
            const docRef = doc(db, "Posts", post.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                await setDoc(docRef, {
                    ...docSnap.data(),
                    comments: [
                        ...docSnap.data().comments,
                        {
                            uComment: commentInput,
                            uName: user?.displayName,
                            uId: user?.uid,
                        },
                    ],
                });
            } else {
                throw new Error("No such Document (which will never happens)");
            }
        } catch (err) {
            console.error(err);
        }
        setCommenInput("");
    };

    return (
        <div className="px-6 py-3 rounded border-black border">
            <div>
                <h1 className="font-semibold text-sm">{post.uName}</h1>
                <p className="font-semibold">{post.uPost}</p>
            </div>
            {post.comments.length !== 0 && (
                <div className="px-6 py-3 border border-black rounded mt-4 flex flex-col gap-y-2">
                    {post.comments.map((comment, id) => (
                        <div
                            className="pl-4 border-l border-black cursor-pointer"
                            onClick={() => handleCommentClick(comment.uId)}
                        >
                            <h1 className="font-semibold text-sm">
                                {comment.uName}
                            </h1>
                            <p className="font-semibold">{comment.uComment}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-4 flex items-center gap-x-4">
                <input
                    type="text"
                    placeholder="Add Comment"
                    className="flex-1 border border-black rounded focus:outline-none px-4 py-2"
                    value={commentInput}
                    onChange={(e) => setCommenInput(e.target.value)}
                />
                <button
                    className="rounded border-black border px-4 py-2 font-semibold"
                    onClick={handleAddComment}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default Post;
