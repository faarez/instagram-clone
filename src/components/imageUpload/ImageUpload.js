import { Button } from "@material-ui/core";
import firebase from "firebase";
import { useState } from "react";
import { storage, db } from "../../firebase";
import './imageUpload.css'
const Imageupload = ({username}) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          snapshot.bytesTransferred / snapshot.totalBytes
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        console.log(error.message);
      },
      () => {
        storage.ref("images").child(image.name).getDownloadURL()
        .then(url =>{
            db.collection('posts').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption:caption,
                imageUrl:url,
                username:username
            });
            setProgress(0);
            setCaption('');
            setImage(null);
        })
      }
    );
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div className="imageupload">
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button className="imageUpload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default Imageupload;
