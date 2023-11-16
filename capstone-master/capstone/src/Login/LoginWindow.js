import react from 'react';
import {useNavigate} from 'react-router-dom';
import logo from "../Pindie.png"
import { Button, Checkbox, Form, Input } from 'antd';


export default function LoginWindow({setWindowType}){
    const navigate = useNavigate();
    const user = {
        "id": 2,
        "username": "Crossed",
        "first_name": "Daniel",
        "last_name": "Wahlers",
        "user_password": "Dan123",
        "email": "dannywahlers@fake.com",
        "bio": "This is my bio",
        "date_posted": "2023-10-21T18:55:01.000Z",
        "location": "",
        "media_link": "https://picsum.photos/300/200?id=0"
    };

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    function signup(){
        setWindowType('signup');
    }



    async function signin(){
        navigate("/home", {state: {user:user}});
    }

    return(
        <section className="window">
            <h1>Welcome to</h1>
            <img src={logo}/>
            <h3>Please enter your username and password</h3>
            <Form
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
                    label="Username"
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={signin}>
                         Submit
                    </Button>
                </Form.Item>
            </Form>
            <div className="other-prompt">
                <p>don't have an account? click </p>
                <button onClick={signup}>here</button>
                <p>to sign up!</p>
            </div>
        </section>
    );
}