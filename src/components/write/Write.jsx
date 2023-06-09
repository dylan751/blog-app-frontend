import { useContext, useState } from 'react';
import axios from 'axios';
import './Write.css';
import { Context } from '../../context/Context';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules, formats } from '../../constants/ReactQuillConfig';

function Write() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      description,
    };
    // Upload file
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;

      try {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/upload`, data);
      } catch (err) {}
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/posts`,
        newPost,
      );
      window.location.replace(`/post/${res.data._id}`);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <ReactQuill
            placeholder="Tell your story..."
            className="writeInput writeText"
            value={description}
            onChange={(newValue) => setDescription(newValue)}
            modules={modules}
            formats={formats}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
