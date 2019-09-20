import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Profile from './components/Profile'
import Home from './components/Home'
import MyProjects from './components/MyProjects'
import NewProjectForm from './components/NewProjectForm'


import './App.css';



class App extends React.Component{
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      user: {}
    }
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

handleLogin = (e, eType) => {
  e.preventDefault()
  let url = eType === 'login' ? 'login' : 'signup'
  const {username, password} = this.state
  fetch(`http://localhost:3000/api/v1/${url}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user:{
          username: username,
          password: password
        }
      })
  }).then(resp => resp.json())
  .then(data =>{
      if(data.jwt){
        localStorage.setItem("token", data.jwt)
        debugger
        this.updateUser(data.user)
      } else{
        eType === 'login' ? alert("Incorrect username or password") : alert("This username is already associated with an account")
      }
  })
}

updateUser = (user_data)=> {
    this.setState({
      user: {user_data},
      username: '',
      password: ''
    })
// Function doesn't fully erase username state. (ATTENTION)
 
}



handleLogout = () => {
  this.setState({
    user: {}
  })
  localStorage.clear()

}
  render(){
    const {handleChange, handleLogin, handleLogout} = this
    const {user} = this.state
    return (
      <div >
        <NavBar handleLogout={handleLogout}/>
        <Switch> 
        <Route exact path='/'  render={ ()=> <Home/>}/>
        <Route path='/projects'  render={ ()=> localStorage.token ? <MyProjects/> : <Redirect to='/login'/>}/>
        <Route path='/new'  render={ ()=> localStorage.token ? <NewProjectForm/> : <Redirect to='/login'/>}/>
        <Route path='/login'  render={ ()=> !localStorage.token ? <LoginForm handleSubmit={handleLogin} handleChange={handleChange}/> : <Redirect to='/profile'/>}/>
        <Route path='/signup' render={() => !localStorage.token ? <SignUpForm handleSubmit={handleLogin} handleChange={handleChange}/> : <Redirect to='/profile'/>} /> 
         <Route path='/profile' render={() => localStorage.token  ? <Profile user={user}/> : <Redirect to='/login'/>} /> 
      </Switch>
        
       
      </div>
    );
  }
  
}

export default App;
