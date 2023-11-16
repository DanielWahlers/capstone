import react from 'react';
import './Create.css';
import {useLocation, Navigate} from 'react-router-dom';
import Preview from './Preview.js';
import Upload from './Upload.js';
import NavBar from '../NavBar.js';


export default function Create(){
    const location = useLocation();


    return(
        <>{location.state?
        <section className="create">
            <NavBar id="navbar" user={location.state.user}/>
            <Preview id="preview" user={location.state.user}/>
            <Upload id="upload" user={location.state.user}/>
        </section>
        : <Navigate to="/"/>
        }
        </>
    )
}