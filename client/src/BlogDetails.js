import { Navigate, useHistory, useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect } from "react";
import { isLoggedIn } from "./logging/islogged";
import api from "./api";
const token = localStorage.getItem("token");


const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:3000/blog/' + id)
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
    }, []);

    const handleClick = async () => {
        const del = async () => {
            api.delete(`/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
                res => {
                    console.log('blog deleted');
                    navigate('/')
                }
            ).catch(err => {
                console.log(err);
            })
        }
        del();
    }
    console.log(blog)
    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.blogData.blogtitle}</h2>
                    <p>Written by {blog.blogData.blogauthor}</p>
                    <div>{blog.blogData.blogbody}</div>
                    {localStorage.getItem("username") === blog.blogData.blogauthor && (
                        <div>
                            <button onClick={handleClick}>Delete</button>
                            <button onClick={() => navigate(`/blog/${id}/edit`)}>Edit</button>
                        </div>
                    )}

                </article>
            )}
        </div>
    );
}

export default BlogDetails;