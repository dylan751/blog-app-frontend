import Post from '../post/Post';
import './Posts.css';

function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}

export default Posts;
