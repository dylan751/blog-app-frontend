import { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './SinglePost.css';
import { Context } from '../../context/Context';

function SinglePost() {
  const PublicFolder = `${process.env.REACT_APP_IMAGES_ENDPOINT}/images/`;
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const [post, setPost] = useState({});

  const { user } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/posts/${postId}`,
      );
      setPost(res.data);
    };
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/posts/${post._id}`,
        { data: { username: user.username } },
      );
      window.location.replace('/');
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src={
            post.photo
              ? `${PublicFolder + post.photo}`
              : 'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
          }
          alt=""
          className="singlePostImg"
        />
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"></i>
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{' '}
            <Link className="link" to={`/?author=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="singlePostDesc">{post.description}</p>
      </div>
    </div>
  );
}

export default SinglePost;
