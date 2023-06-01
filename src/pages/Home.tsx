import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PostInterface } from "../Interfaces/interfaces";
import { db } from "../firebase/firebase-config";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

const Home = () => {
    const [posts, setPosts] = useState<PostInterface[]>([]);

    const getPosts = async () => {
        try {
            const q = query(collection(db, "Posts"));
            const querySnapshot = await getDocs(q);
            const newPosts: PostInterface[] = [];
            querySnapshot.forEach((doc) => {
                const newPost: PostInterface = {
                    uName: doc.data().uName,
                    uPost: doc.data().uPost,
                    comments: doc.data().comments,
                    id: doc.id,
                };
                newPosts.push(newPost);
            });
            setPosts(newPosts);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPosts();
    }, [posts]);

    return (
        <div className="mt-20 px-10 py-5 flex flex-col gap-y-6">
            <CreatePost />
            {posts.map((post, id) => (
                <Post post={post} key={id} />
            ))}
        </div>
    );
};

export default Home;
