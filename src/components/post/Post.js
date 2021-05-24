import "./Post.css";
import {Avatar} from '@material-ui/core'
const Post = () => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          alt="Yoga.ezekeil"
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
        />
        <h3>Username</h3>
      </div>
      {/* Header -> avatar + username */}

      <img
        className="post__image"
        alt="tree "
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
      />
      {/* Image */}
      <h4 className="post__text">
        <strong>Yoga.ezekeil</strong> love this
      </h4>
      {/* username + caption */}
    </div>
  );
};

export default Post;
