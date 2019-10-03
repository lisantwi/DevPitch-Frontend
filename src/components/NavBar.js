import styled from 'styled-components'
import React from 'react'

const Nav = styled.div`
html, body, div, p, ul, li {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
  }
  .nav {
    background: #000;
    height: 80px; /* set same as height & line-height below */
  }
  .nav li {
    display: inline-block;
    list-style: none;
    height: 60px; /* should be the same as line-height */
    line-height: 60px; /* should be the same as height */
    padding: 0 40px; /* "0" sets top and bottom padding to none */
  }
  
  .nav li:hover {
    background: red;
    transition: background .3s;
  }
  
  .nav-link {
    color: #fff;
    text-decoration: none;

  }
  .nav-title {
    color: red;
    text-align:left;
    margin-right:100px;
    margin-left: 50px;
  }
`;

class NavBar extends React.Component{
    render(){
        const {user, handleLogout} = this.props
        return(
            <Nav>
                 <div className="nav">
                <ul>
                    <li className='nav-title'>DevPitch</li>
                    <li><a href='/' className="nav-link">Home</a></li>
                    {!localStorage.token ? <li><a href='/login' className="nav-link">Login</a></li> : null}
                    {localStorage.token ? <li><a href='/profile' className="nav-link">My Profile</a></li> : null}
                    {localStorage.token ? <li><a href='/projects' className="nav-link">My Projects</a></li> : null}
                   {localStorage.token?<li> <a href="/new" className="nav-link">Create A New Project</a></li> : null}
                    <li onClick={handleLogout}>{localStorage.token? <a href='/' className="nav-link">Logout</a> : null }</li> 
                </ul>
            </div>
            </Nav>
           
            
        )
    }
}

export default NavBar