import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { isLoggedIn } from "./logging/islogged";

const Create = () => {
    const [blogtitle, setTitle] = useState('');
    const [blogbody, setBody] = useState('');
    const [blogauthor, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
        else{
            const username = localStorage.getItem("username")
            if(username){
                setAuthor(username)
            }
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBlog = { blogtitle, blogbody, blogauthor };

        setIsPending(true);

        // try {
        //     const response = await api.post('/blog', newBlog);
        //     console.log(newBlog);


        //     // const response = await fetch('http://localhost:8000/blogs', {
        //     //     method: 'POST',
        //     //     headers: { "Content-Type": "application/json" },
        //     //     body: JSON.stringify(blog)
        //     // });

        //     // if (!response.ok) {
        //     //     throw new Error(`Error: ${response.status} ${response.statusText}`);
        //     // }

        //     setIsPending(false);
        //     // history.push('/');
        //     navigate('/');
        // } catch (error) {
        //     console.error("Failed to add blog:", error);
        //     setIsPending(false);
        // }

        api.post('/blog', newBlog, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            res => {
                console.log(res);
                navigate('/');
            }
        ).catch(err => {
            console.log(err);

        }).finally(() => {
            setIsPending(false);
        })
    };
    if (isPending) {
        return (
            <h1>Loading</h1>
        )
    }

    return (
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" required value={blogtitle} onChange={(e) => setTitle(e.target.value)} />
                <label>Blog body:</label>
                <textarea required value={blogbody} onChange={(e) => setBody(e.target.value)}></textarea>
        
                <label>Blog author:</label>
                <input type="text" value={blogauthor} readOnly />
                {!isPending && <button>Add blog</button>}
                {isPending && <button disabled>Adding blog</button>}
            </form>
        </div>
    );
}


    export default Create;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "./api";

// const Create = () => {
//   const [blogtitle, setTitle] = useState('');
//   const [blogbody, setBody] = useState('');
//   const [blogauthor, setAuthor] = useState('');
//   const [isPending, setIsPending] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newBlog = { blogtitle, blogbody, blogauthor };
//     setIsPending(true);

//     try {
//       await api.post('/blog', newBlog);
//       console.log("Blog added:", newBlog);
//       setIsPending(false);
//       navigate('/');
//     } catch (error) {
//       console.error("Failed to add blog:", error);
//       setIsPending(false);
//     }
//   };

//   return (
//     <div className="create">
//       <h2>Add a new blog</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Blog title:</label>
//         <input type="text" required value={blogtitle} onChange={(e) => setTitle(e.target.value)} />

//         <label>Blog body:</label>
//         <textarea required value={blogbody} onChange={(e) => setBody(e.target.value)}></textarea>

//         <label>Blog author:</label>
//         <input type="text" required value={blogauthor} onChange={(e) => setAuthor(e.target.value)} />

//         {!isPending && <button>Add blog</button>}
//         {isPending && <button disabled>Adding blog...</button>}
//       </form>
//     </div>
//   );
// };

// export default Create;
