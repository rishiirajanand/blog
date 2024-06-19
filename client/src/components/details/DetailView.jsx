import React, { useEffect, useState, useContext } from "react";
import {Box, Typography , styled} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../service/api.js'
import { DataContext } from '../../context/DataProvider.jsx'

import { Delete, Edit } from '@mui/icons-material';


const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
      margin: 0
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover'
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
`;

const EditIcon = styled(Edit)`
    font-size: 2.3rem;
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    font-size: 2.3rem;
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Author = styled(Box)(({ theme }) => ({
  color: '#878787',
  display: 'flex',
  margin: '20px 0',
  [theme.breakpoints.down('sm')]: {
      display: 'block'
  },
}));

const Description = styled(Typography)`
  word-break: break-word;
`


function DetailView() {
  const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  const [post, setPost] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()

  const { account } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
            setPost(response.data);
        }
    }
    fetchData();
}, []);


  const deletePost = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
        navigate('/');
    }
  }

  return (
    <Container>
      <Image src={url} alt="blog" />

      <Box style={{float: 'right'}}>

        {
          account.username === post.username && 
          <> 
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary"/>
            </Link>
            <DeleteIcon onClick={() => deletePost()} color="error"/>
          </>
        }

      </Box>

      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          Author: <span style={{fontWeight: 600}}>{post.username}</span>
        </Typography>
        <Typography style={{marginLeft: 'auto'}}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>

      <Description>{post.description}</Description>

    </Container>
  );
}

export default DetailView;
