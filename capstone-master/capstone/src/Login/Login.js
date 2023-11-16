import './Login.css';
import LoginWindow from './LoginWindow.js';
import SignUpWindow from './SignUpWindow.js';
import {useState} from 'react';
//import {useHistory} from 'react-router-dom';

export default function Login() {
  //const history = useHistory();
  const [windowType, setWindowType] = useState(() => 'login');

  // const userData = {
  //   "id": 1,
  //   "username": "AverageJoe",
  //   "first_name": "Joe",
  //   "last_name": "Average",
  //   "user_password": "Joe123",
  //   "email": "joeaverage@fake.com",
  //   "bio": null,
  //   "date_posted": "2023-10-21T18:54:09.000Z",
  //   "location": null
  // };
  return (
    <div className="Login">
      {windowType === 'login'? <LoginWindow setWindowType={setWindowType}/> : <SignUpWindow setWindowType={setWindowType}/>}
    </div>
  );
}
