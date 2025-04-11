import { Link } from "react-router-dom";

const BlogList = ({blogs, title}) => {


    return ( 
        <div className="blog-list">
            <h1>{title}</h1>
             {blogs.map((blog) => (
                <div className="blog-preview" key={blog._id}>
                    <Link to={`/blog/${blog._id}`}>
                        <h2>{ blog.blogtitle }</h2>
                        <p>Written by { blog.blogauthor }</p>
                    
                    </Link>
                </div>
            ))}
            
        </div>
     );
}
 
export default BlogList;