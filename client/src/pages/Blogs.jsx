import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBlogs } from "../userReducer/userBlogsSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLike } from "../userReducer/userBlogsSlice";
const Blogs = () => {

    const dispatch = useDispatch();
    const {blogs, loading, error} = useSelector((state)=>state.userBlogs);
    const {user} = useSelector((state)=>state.userProfile);
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);

    

    console.log("user-in-blogs", user);
    useEffect(()=>{
        dispatch(getBlogs())
    },[dispatch])

     const navigateBlogs = (e)=>{
        e.preventDefault();
        navigate("/create-blog");
     }

     const handleLike = (blogId)=>{
        // console.log("blogId", blogId);
        dispatch(toggleLike({blogId}));
     }
    return (
        <>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <button className=" bg-blue-500 text-white p-4 rounded-md w-fit mx-auto my-4 cursor-pointer hover:bg-blue-600 transition-all duration-300 justify-center items-center flex" onClick={navigateBlogs} >Create blogs</button>
        {blogs.length > 0 && blogs.map((blog)=>(
            <div className="border-2 border-gray-300 rounded-md p-4" key={blog._id}>
                <h1>title:  {blog.title}</h1>
                <p>content: {blog.content}</p>
                <p>author: {blog.author}</p>
                <p>createdAt: {blog.createdAt}</p>
                <p>updatedAt: {blog.updatedAt}</p>
                <p><span className="text-blue-500 cursor-pointer hover:text-blue-600 transition-all duration-300">likes: {blog.likes.length}</span></p>
                <button className="bg-red-400 text-white p-4 rounded-md w-fit my-4 cursor-pointer hover:bg-red-600 transition-all duration-300 justify-center items-center flex" onClick={()=>handleLike(blog._id)}>{
                    isLiked ? "Liked" : "Like"
                }</button>
                {/* <p>tags: {blog.tags.join(", ")}</p> */}
            </div>
        ))}
        </>
    )
}

export default Blogs;
