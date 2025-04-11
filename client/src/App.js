import './App.css';
import Create from './Create';
import Home from './Home';
import Signup from './logging/Signup';
import React, { Fragment, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import Edit from './Edit';
import Login from './logging/Login';
// import Create from './Create';


function App() {
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/db');
  //       setPost(response.data);
  //     } catch(err){

  //     }
  //   }
  // })

  const title = 'Welcome to the new blog.';
  return (
    // <Router>
    //   <div className='App'>
    //     <Navbar />
    //     <div className="content">
    //       <Switch>
    //         <Route exact path="/">
    //           <Home />
    //         </Route>
    //         <Route path="/create">
    //         <Create />
    //         </Route>
    //         <Route path="/blogs/:id">
    //         <BlogDetails />
    //         </Route>
    //         <Route path = '*'>
    //           <NotFound />
    //         </Route>
    //       </Switch>
    //     </div>
    //   </div>
    // </Router>
    <Fragment>
      <Routes>

        <Route path='/' element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path='/create' element={
          <>
            <Navbar />
            <Create />
          </>
        } />
        <Route path='/blog/:id' element={
          <>
            <Navbar />
            <BlogDetails />
          </>
        } />
        <Route path='/blog/:id/edit' element={
          <>
            <Navbar />
            <Edit />
          </>
        } />
        <Route path='/signup' element={
          <>
            <Navbar />
            <Signup />
          </>
        } />
        <Route path='/login' element={
          <>
            <Navbar />
            <Login />
          </>
        } />

      </Routes>
    </Fragment>
  );
}

export default App;
