import react from 'react';
import './Create.css';
import {useLocation, Navigate} from 'react-router-dom';
import Preview from './Preview.js';
// import Upload from './Upload.js';
import NavBar from '../NavBar.js';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Create(){
    const location = useLocation();

    const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

// this is where I am trying to actually send the file to the api

const apiString = "http://localhost:5000";

    // async function bucket(){
    //     //const url = apiString + `/upload?fileList=${fileList}`;
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'}
    //     };
    //     //const res = await fetch(url, requestOptions);
    //    // const dislikeData = await res.json();
    // }

    async function submit(ev){
        ev.preventDefault();
        const userFile = document.getElementById('file').files[0];
        const formData = new FormData();
        formData.append('userFile', userFile);
        const url = apiString + `/upload`;
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        const res = await fetch(url, requestOptions);
        const uploadData = await res.json();

        console.log("uploadData: ", uploadData);
    }

    return(
        <>{location.state?
            <div>
            <NavBar id="navbar" user={location.state.user}/>
            <main>
              <div className="create">
                <h1>Upload a file to Amazon S3</h1>
                <form id="form">
                    <input id="file" type="file" name="file" required/>
                    <button onClick={submit}>Upload</button>
                </form>
              </div>
            </main>
          
          </div>
        : <Navigate to="/"/>
        }
        </>
    )
}