import React from 'react';
import { Route, Redirect, Switch, withRouter} from "react-router-dom";
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Profile from './components/Profile'
import Home from './components/Home'
import MyProjects from './components/MyProjects'
import NewProjectForm from './components/NewProjectForm'


import './App.css';



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      user: {projects:
      []},
      projects: []
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
      } else{
        eType === 'login' ? alert("Incorrect username or password") : alert("This username is already associated with an account")
      }
  })
  debugger
  this.props.history.push('/profile')

}


componentDidMount(){
  if (localStorage.getItem('token') !== null
  ) {
    fetch('http://localhost:3000/api/v1/users',{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  .then(resp => resp.json())
  .then(user => {
      this.setState({
         user: user
      })
  })  
}
  }


createProject = (description) => {
  fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      description: description
    })
}).then(resp => resp.json())
.then(data => {
    this.setState({
     projects: [...this.state.projects, data]
    })
})
  
}




handleLogout = () => {
  this.setState({
    user: {}
  })
  localStorage.clear()

}
  render(){
    const {handleChange, handleLogin, handleLogout, getProjects} = this
    const {user} = this.state
    return (
      <div >
        <NavBar handleLogout={handleLogout}/>
        <Switch> 
        <Route exact path='/'  render={ ()=> <Home/>}/>
        <Route exact path='/projects'  render={props => localStorage.token ? <MyProjects  user={user}/> : <Redirect push to='/login'/>}/>
        <Route path='/new'  render={()=> localStorage.token ? <NewProjectForm  user={user} createProject={this.createProject}/> : <Redirect push  to='/login'/>}/>
        <Route path='/login'  render={ ()=> !localStorage.token ? <LoginForm handleSubmit={handleLogin} handleChange={handleChange}/> : <Redirect push to='/profile'/>}/>
        <Route path='/signup' render={() => !localStorage.token ? <SignUpForm  handleSubmit={handleLogin} handleChange={handleChange}/> : <Redirect push to='/profile'/>} /> 
         <Route path='/profile' render={() => localStorage.token  ? <Profile   user={user}/> : <Redirect to='/login'/>} /> 
      </Switch>
        
       
      </div>
    );
  }
  
}

export default withRouter(App)
