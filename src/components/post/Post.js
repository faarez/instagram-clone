import "./Post.css";
import {Avatar} from '@material-ui/core'
const Post = ({imageUrl,username,caption}) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          alt={username}
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      {/* Header -> avatar + username */}

      <img
        className="post__image"
        alt="tree "
        src={imageUrl}
      />
      {/* Image */}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      {/* username + caption */}
    </div>
  );
};

export default Post;
