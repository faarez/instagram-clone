import {useState,useEffect} from 'react'
import './App.css';
import Header from './components/header/Header.js'
import Post from './components/post/Post.js'
import {db,auth} from './firebase.js'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input} from '@material-ui/core'
import ImageUpload from './components/imageUpload/ImageUpload'
function App() {
  const [posts, setPosts] = useState([
   
  ]);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSignin, setOpenSignin] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSigninClose = () => {
    setOpenSignin(false);
  };
  const signUp = (e)=>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)   
    .catch((error)=> alert(error.message))
  }
  const signIn = (e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch(error => alert(error.message));

    setOpenSignin(false);
  }
  
  
  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) =>{
     if(authUser){
       console.log(authUser);
       setUser(authUser);
       if(authUser.displayName){

       }else{
         return authUser.updateProfile({
           displayName:username,
         })
       }
     }else{
       setUser(null)
     }
   });
   return  () =>{
     unsubscribe();
   }
  }, [user,username])
  
  useEffect(() => {
   db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
     setPosts(snapshot.docs.map(doc => (
       {
         id:doc.id,
         post:doc.data()
       }
     )));
   })
  }, []);



  return (
    <div className="app">
      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ) : (
        <div className="error" onClick={() => setOpenSignin(true)}>
          <h3>login please login to upload </h3>
        </div>
      )}
      <Header
        loginContainer={
          user ? (
            <Button onClick={() => auth.signOut()}>logout</Button>
          ) : (
            <div className="app_loginContainer">
              <Button onClick={() => setOpenSignin(true)}>Sign in</Button>
              <Button onClick={() => setOpen(true)}>Sign up</Button>
            </div>
          )
        }
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  className="app__headerImage"
                  alt="our logo"
                />
              </center>

              <Input
                type="text"
                className="custom-input"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="email"
                className="custom-input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                className="custom-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp} className="custom-btn">
                Sign Up
              </Button>
            </form>
          </div>
        }
      </Modal>
      <Modal
        open={openSignin}
        onClose={handleSigninClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  className="app__headerImage"
                  alt="our logo"
                />
              </center>

              <Input
                type="email"
                className="custom-input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                className="custom-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn} className="custom-btn">
                Sign in
              </Button>
            </form>
          </div>
        }
      </Modal>
      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            username={post.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
          />
        ))}
      </div>
      {/* <Post username="ezekiel" caption="i am back guys" imageUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
      <Post username="dani" caption="my new vlog is out" imageUrl="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
      <Post username="hasham" caption="this my first post" imageUrl="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" /> */}
    </div>
  );
}

export default App;
