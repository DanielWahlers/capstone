import react from 'react';
import './Create.css';
import {useLocation, useNavigate, Navigate} from 'react-router-dom';
import Preview from './Preview.js';
//import Upload from './Upload.js';
import NavBar from '../NavBar.js';
import { Button, Checkbox, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import {useState, useEffect} from 'react';

export default function Create(){
    const location = useLocation();
    const apiString = "http://localhost:5000";
    const navigate = useNavigate();

//Beginning of this nonsense
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

//end of this nonsense

async function submit(ev){
  ev.preventDefault();
  const title = document.getElementById("titleInput").value;
  const caption = document.getElementById("captionInput").value;
  const userFile = document.getElementById('file').files[0];
  if(title == '' || caption == ''){
    alert("You need to complete all of the required fields to be able to post");
  }
  else if(userFile == undefined || userFile == null){
    alert("You need to select a piece of media to upload with your pin");
  }
  else{
    const formData = new FormData();
    formData.append('file', userFile);
    const url = apiString + `/upload?title=${title}&user_id=${location.state.user.id}&caption=${caption}`;
    console.log("url", url);
    const requestOptions = {
        method: 'POST',
        body: formData,
      // headers: {'Content-Type': 'multipart/form-data'}
    };
    const res = await fetch(url, requestOptions);
    const uploadData = await res.json();

    console.log("uploadData: ", uploadData);
    navigate("/myprofile", {state: {user: location.state.user}});
}
}

function cancel(){
  navigate("/myprofile", {state: {user: location.state.user}});
}

    const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

    const onFinish = (values) => {
      console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 4,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 20,
        },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };


    return(
        <>{location.state?
            <div className="Create">
            <NavBar id="navbar" user={location.state.user}/>
            <main>
              <section id="create">
              <Form
                id="my-form"
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    id="title"
                    rules={[
                        {
                        required: true,
                        message: 'Please input the title of this pin!',
                        },
                    ]}
                >
                    <Input id="titleInput" />
                </Form.Item>

                <Form.Item
                    label="Caption"
                    name="caption"
                    id="caption"
                    rules={[
                        {
                        required: true,
                        message: 'Please input a caption for this pin!',
                        },
                    ]}
                >
                    <Input id="captionInput" />
                </Form.Item>

                <Form.List
        name="names"
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Other Authors' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input another author's username or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="other author's username"
                    style={{
                      width: '60%',
                    }}
                    className="other-authors-input"
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '120%',
                }}
                icon={<PlusOutlined />}
              >
                Add Additional Author
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <input id="file" type="file" name="file" required/>
      {/* <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal> */}

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={submit}>
                         Submit
                    </Button>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button type="default" htmlType="submit" onClick={cancel}>
                         Cancel
                    </Button>
                </Form.Item>
            </Form>
                {/* <form>
                  <label for="title">Title:</label>
                  <input type="text" id="title" name="title"/>
                  <label for="caption">Caption:</label>
                  <input type="text" id="caption" name="caption"/>
                  
                </form> */}
              </section>
            </main>
          
          </div>
        : <Navigate to="/"/>
        }
        </>
    )
}