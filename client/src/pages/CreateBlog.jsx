import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, resetCreateBlogState } from "../userReducer/userBlogsSlice";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { createBlogLoading } = useSelector((state) => state.userBlogs);

    // console.log("createBlogSuccess createBlogLoading createBlogError", createBlogSuccess, createBlogLoading, createBlogError);
;

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: [],
    })

    const onFormChange = (e) => {
        setFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const { tags } = prev;
            if (checked) {
                return { ...prev, tags: [...tags, value] };
            } else {
                return { ...prev, tags: tags.filter((tag) => tag !== value) };
            }
        });
    };

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(createBlog(formData)).unwrap();
            alert("Blog created successfully");
            setFormData({ title: "", content: "", tags: [] });
            navigate("/blogs");
          } catch (error) {
            alert(error || "Something went wrong, try again");
            setFormData({ title: "", content: "", tags: [] });
          }
    };

    useEffect(()=>{
        return ()=>{
            dispatch(resetCreateBlogState());
        }
    },[]);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={onFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        name="content"
                        id="content"
                        value={formData.content}
                        onChange={onFormChange}
                        rows="10"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    ></textarea>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {['AI', 'Frontend', 'Backend', 'DevOps', 'Mobile', 'Data Science'].map((tag) => (
                            <div key={tag} className="flex items-center">
                                <input
                                    id={`tag-${tag}`}
                                    name="tags"
                                    type="checkbox"
                                    value={tag}
                                    checked={formData.tags.includes(tag)}
                                    onChange={handleTagChange}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`tag-${tag}`} className="ml-2 min-w-0 flex-1 text-sm text-gray-500">
                                    {tag}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={createBlogLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {createBlogLoading ? 'Creating...' : 'Create Post'}
                    </button>
                </div>
                {/* {createBlogError && <p className="text-red-500">{createBlogError}</p>} */}
            </form>
        </div>
    );
};

export default CreateBlog;
