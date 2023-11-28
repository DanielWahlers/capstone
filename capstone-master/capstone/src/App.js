import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import MyProfile from './MyProfile/MyProfile.js';
import Profile from './Profile/Profile.js';
import Create from './Create/Create.js';
  export default function App() {
    return (
    <>
        {/* <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link> */}
        <Routes>
         <Route path="/" element={<Login/>} />
         <Route path="/home" element={<Home/>} />
         <Route path="/myprofile" element={<MyProfile/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/create" element = {<Create/>}/>
       </Routes>
    </>
  );
}
