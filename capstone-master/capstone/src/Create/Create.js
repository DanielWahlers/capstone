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
            <div>
            <NavBar id="navbar" user={location.state.user}/>
            <main>
              <div className="create">
                
              </div>
            </main>
          
          </div>
        : <Navigate to="/"/>
        }
        </>
    )
}