import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import {Button} from './Button';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960){
      setButton(false);
    } else{
      setButton(true);
    }
  };

  useEffect(()=>{
    showButton();
  }, []);

  window.addEventListener('resize',showButton);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            LEGITMISER  <i class="fas fa-leaf"></i>
          </Link>
          <div className='menu-icon' onClick = {handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
          </div>
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
           <li className='nav-item'>
           <Link to ='/uploads' className='nav-links' onClick={closeMobileMenu}>
              Uploads
            </Link>      
           </li>
           <li className='nav-item'>
            <Link to ='/graphs' className='nav-links' onClick={closeMobileMenu}>
              Graphs
            </Link>      
           </li>
           <li className='nav-item'>
            <Link to ='/issues' className='nav-links' onClick={closeMobileMenu}>
              Issues
            </Link>      
           </li>
           <li className='nav-item'>
            <Link to ='/sign-out' className='nav-links-mobile' onClick={closeMobileMenu}>
              Sign out
            </Link>      
           </li>
        </ul>
        {button && <Button buttonStyle='btn--outline'>Sign out</Button>}
      </nav>

    </>
  )
}

export default Navbar

