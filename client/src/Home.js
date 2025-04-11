import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import api from './api';


const Home = () => {
    const [backendblog, setBlogs] = useState([]);
    
   useEffect(()=> {
    const fetchPosts = async () => {
        try{
            const response = await api.get('/blog',{
                headers:{
                    Authorization:'Bearer '+localStorage.getItem('token')
                }
            });
            console.log(response);
            setBlogs(response.data.blogData);
        } catch(err) {
            console.log(err);
        }
    }
    fetchPosts();
},[])

return (
        <div className="home">
            {/* { error ?<div>{ error }</div>:null } */}
            {/* {isPending ? <div>Loading...</div>:null } */}
           {backendblog && backendblog.length ? <BlogList blogs={backendblog} title="All Blogs!"/>:<p>No Blogs</p>}
        </div>
    );
}

export default Home;