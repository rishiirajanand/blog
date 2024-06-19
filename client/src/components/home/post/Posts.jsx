import React, { useEffect, useState } from "react";
import { API } from '../../../service/api.js'
import { Box } from "@mui/material";
import Post from "./Post.jsx";
import { useSearchParams, Link } from "react-router-dom";

function Posts() {

    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category : category || '' });

            if(response.isSuccess) {
                setPosts(response.data)
            }
        }
        fetchData();
    }, [category])

  return (
    <>
        {
            posts && posts.length > 0 ? posts.map(post => (
                <Link key={post._id} to={`details/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Post  post={post}/>
                </Link>
            ))
            :   <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                    No data is available for selected category
                </Box>
        }
    </>
  );
}

export default Posts;
