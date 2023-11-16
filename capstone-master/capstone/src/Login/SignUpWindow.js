import react from 'react';
import logo from '../Pindie.png';
import React, { useState } from 'react';
import {AutoComplete,Button,Cascader,Checkbox,Col,Form,Input,InputNumber,Row,Select,} from 'antd';

const { Option } = Select;
const apiString = "http://localhost:5000";

    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 10, 
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 6,
          },
        },
      };

export default function SignUpWindow({setWindowType}){

    const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

    function login(){
        setWindowType('login');
    }

    function createAccount(){
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;


        alert("An account for " + firstName + " " + lastName + " was created. " +
        "Remember your password: " + password);
        return;
    }

    async function signUp(ev){
        if(ev){
            ev.preventDefault();
        }
        //create the json formatted userdata
        const firstName = document.getElementById("firstname");
        const lastName = document.getElementById("lastname");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const username = document.getElementById("username");
        const userData = {
            'first_name': firstName,
            'last_name' : lastName,
            'email' : email,
            'user_password' : password,
            'username' : username
        };

        const url = apiString + "/users";
        const res = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application.json'},
            body: JSON.stringify(userData)
        });
        const account = await res.json();
        console.log(account);
    }

    return(
        <section className="window">
            <h1>Welcome to</h1>
            <img src={logo}/>
            <h3>Please enter the following information to create an account</h3>
            {/* <div>
                <p>First Name</p>
                <input id="first-name" type="text" placeholder="John"></input>
            </div>
            <div>
                <p>Last Name</p>
                <input id="last-name" type="text" placeHolder="Smith"></input>
            </div>
            <div>
                <p>Email</p>
                <input id="email" type="email" placeholder="johnsmith@email.com"></input>
            </div>
            <div>
                <p>Username</p>
                <input id="username" type="text" placeholder="creator123"></input>
            </div>
            <div>
                <p>Password</p>
                <input id="password" type="password" placeholder="ICreate828*"></input>
            </div>
            <button onClick={createAccount}>Submit</button> */}
            <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        id="email"
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        id="password"
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        id="firstname"
        name="firstname"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        id="lastname"
        name="lastname"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        id="username"
        name="username"
        label="Username"
        tooltip="What do you want your screen name to be?"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item> */}

      {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}
      <Form.Item {...tailFormItemLayout}>
        <Button onClick={signUp} type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
            <div className="other-prompt">
                <p>Already have an account? click </p>
                <button onClick={login}>here</button>
                <p> to log in!</p>
            </div>
        </section>
    )
}