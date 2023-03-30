import './Post.css';

function Post({ post }) {
  // const PublicFolder = `${process.env.REACT_APP_API_ENDPOINT}/images/`;
  const PublicFolder = 'http://localhost:4000/images/';
  return (
    <div className="post">
      <img
        className="postImg"
        // src={post.photo ? post.photo : `${PublicFolder + post.photo}`}
        src={
          post.photo
            ? `${PublicFolder + post.photo}`
            : 'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        }
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category) => {
            return <span className="postCat">{category.name}</span>;
          })}
        </div>
        <a href={`/post/${post._id}`} className="postTitle link">
          {post.title}
        </a>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.description}</p>
    </div>
  );
}

export default Post;
