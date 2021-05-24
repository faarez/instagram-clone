import {useState} from 'react'
import './App.css';
import Header from './components/header/Header.js'
import Post from './components/post/Post.js'
function App() {
  const [posts, setPosts] = useState([
    {
      username: "ezekiel",
      caption: "i am back guys",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      username: "dani",
      caption: "i am back guys",
      imageUrl:
        "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
    },
  ]);

  return (
    <div className="app">
      <Header />
      {posts.map((post) => (
        <Post {...post} />
      ))}
      {/* <Post username="ezekiel" caption="i am back guys" imageUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
      <Post username="dani" caption="my new vlog is out" imageUrl="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
      <Post username="hasham" caption="this my first post" imageUrl="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" /> */}
    </div>
  );
}

export default App;
