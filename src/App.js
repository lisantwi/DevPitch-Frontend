import React from 'react';
import { Route, Redirect, Switch, withRouter} from "react-router-dom";
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Profile from './components/Profile'
import Home from './components/Home'
import MyProjects from './components/projects/MyProjects'
import ProjectDetails from './components/projects/ProjectDetails'
import NewProjectForm from './components/form/NewProjectForm'
import ProjectGraphs from './components/form/ProjectGraphs'


import './App.css';



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      user: {projects:
      []},
      projects: [],
      selectedProject: {}
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
      if(data.user){
        this.fetchUserInfo()
      }
      this.props.history.push('/profile')
  })
  

}

addImg = (src, project) => {

  let user = JSON.parse(localStorage.getItem('user'))
  let data = {
      project_id: project.id,
      src: src

  }
  fetch('http://localhost:3000/api/v1/add_image', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(data => {
      let userCopy = {...user}
      // let newUser = userCopy.projects.filter(p => p.id !== project.id)
      // let userData = newUser.push(data)
  })

}


fetchUserInfo = () => {
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
      localStorage.setItem('user', JSON.stringify(user))
  })  
}
  }

  onSelectedProject = (selectedProject) => {
    this.setState({
      selectedProject: selectedProject
    })
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
    const {handleChange, handleLogin, handleLogout, onSelectedProject} = this
    const {selectedProject} = this.state
    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <div >
        <NavBar handleLogout={handleLogout}/>
        <Switch> 
        <Route exact path='/'  render={ ()=> <Home/>}/>
        <Route exact path='/projects'  render={props => localStorage.token ? <MyProjects onSelectedProject={onSelectedProject} user={user}/> : <Redirect push to='/login'/>}/>
        <Route exact path='/projects/:id/diagrammer'  render={(props) =>{
          let projectId = parseInt(props.match.params.id)
          let project = user.projects.find(p => p.id === projectId)
          return <ProjectGraphs addImg={this.addImg} project={project} user={user}/>}
        } />
        <Route exact path='/projects/:id' render={(props) => {
          let projectId = parseInt(props.match.params.id)
          let projectFound = Object.entries(selectedProject).length === 0 ? user.projects.find(p => p.id === projectId) : selectedProject
         
          return projectFound ? <ProjectDetails project={projectFound} /> : <Home/>
        }}/>
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
