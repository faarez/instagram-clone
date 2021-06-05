import "./Post.css";
import { Avatar, Grid, Box } from '@material-ui/core'
import PostOptions from "./PostOptions/PostOptions.js"

const Post = ({ postId, imageUrl, username, caption }) => {
  return (
    <div className="post">
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <div className="post__header">
            <Avatar
              alt={username}
              className="post__avatar"
              src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>

          </div>
        </Grid>
        <Grid item xs={2} >
          <Box mt={2.5}>
            <PostOptions imageUrl={imageUrl} id={postId} />
          </Box>
        </Grid>
      </Grid>

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
