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

editTask= (data) => {
  let user = JSON.parse(localStorage.getItem('user'))
  let userCopy = {...user}
  fetch(`http://localhost:3000/api/v1/tasks/${data.task_id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(data => {
    userCopy.projects.forEach((p, index) => {
    
      if(p.id === data.id){
        userCopy.projects[index] = data;
      }
    })
    
     localStorage.setItem('user', JSON.stringify(userCopy))
     let user = JSON.parse(localStorage.getItem('user'))
     this.setState({
       user: user
     })
      
  })
}

deleteTask = (task) =>{
  let user = JSON.parse(localStorage.getItem('user'))
  let userCopy = {...user}
  fetch(`http://localhost:3000/api/v1/tasks/${task.id}`,{
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(resp => resp.json())
  .then(data => {
    let foundProject = userCopy.projects.find(project => project.id === data.task.project_id)
    let projectUpdated = foundProject.tasks.filter(task => task.id !== data.task.id)
    foundProject.tasks = projectUpdated
    userCopy.projects.forEach((p, index) => {
      if(p.id === foundProject.id){
        userCopy.projects[index] = foundProject;
      }
    })
    localStorage.setItem('user', JSON.stringify(userCopy))
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState({
      user:user
    })
    

    
  })
  alert('You have successfully deleted your task')
}

deleteProject = (project) => {
  let user = JSON.parse(localStorage.getItem('user'))
  let userCopy = {...user}
  fetch(`http://localhost:3000/api/v1/projects/${project.id}`,{
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(resp => resp.json())
  .then(data => {
    let newProjects= userCopy.projects.filter(p => {
      return p.id !== data.id 
    })
    userCopy.projects = newProjects
    localStorage.setItem('user', JSON.stringify(userCopy))
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState({
      user:user
    })
    
    

    
  })
}

addImg = (src, project) => {
  let user = JSON.parse(localStorage.getItem('user'))
  let userCopy = {...user}
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
    userCopy.projects.forEach((p, index) => {
    
      if(p.id === data.id){
        userCopy.projects[index] = data;
      }
    })

      localStorage.setItem('user', JSON.stringify(userCopy))
      this.props.history.push(`/projects/${data.id}`)
  })

}

markAsComplete = (task) => {
  let val = !task.is_complete
  let data = {is_complete: val}
  let user = JSON.parse(localStorage.getItem('user'))
  let userCopy = {...user}
  fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(data => {
    userCopy.projects.forEach((p, index) => {
        debugger
      if(p.id === data.id){
        userCopy.projects[index] = data;
      }
    })
    
     localStorage.setItem('user', JSON.stringify(userCopy))
     let user = JSON.parse(localStorage.getItem('user'))
     this.setState({
       user: user
     })
      
  })
}

editProject = (data) => {
  let user = JSON.parse(localStorage.getItem('user'))
  let userCopy = {...user}
  fetch(`http://localhost:3000/api/v1/projects/${data.project_id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(data => {
    userCopy.projects.forEach((p, index) => {
    
      if(p.id === data.id){
        userCopy.projects[index] = data;
      }
    })
    
     localStorage.setItem('user', JSON.stringify(userCopy))
     let user = JSON.parse(localStorage.getItem('user'))
     this.setState({
       user: user
     })
      
  })

}

updateLocalStorage = (data) => {
  let user = JSON.parse(localStorage.getItem('user'))
  let userCopy = {...user}
  userCopy.projects.push(data)
  localStorage.setItem('user', JSON.stringify(userCopy))
  this.props.history.push('/projects')
  
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

addTask = (data) => {
  let user = JSON.parse(localStorage.getItem('user'))
  let userCopy = {...user}
  fetch(`http://localhost:3000/api/v1/add_task`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(project =>{
    userCopy.projects.forEach((p, index) => {
      if(p.id === project.id){
        userCopy.projects[index] = project;
      }
    })
      localStorage.setItem('user', JSON.stringify(userCopy))
      let user = JSON.parse(localStorage.getItem('user'))
      this.setState({
        user: user
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
    const {handleChange, handleLogin, handleLogout, onSelectedProject, updateLocalStorage, addTask, deleteTask, editTask, deleteProject, editProject, markAsComplete} = this
    const {selectedProject} = this.state
    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <div >
        <NavBar handleLogout={handleLogout}/>
        <Switch> 
        <Route exact path='/'  render={ ()=> <Home/>}/>
        <Route exact path='/projects'  render={props => localStorage.token ? <MyProjects onSelectedProject={onSelectedProject} user={user} deleteProject={deleteProject}/> : <Redirect push to='/login'/>}/>
        <Route exact path='/projects/:id/diagrammer'  render={(props) =>{
          let projectId = parseInt(props.match.params.id)
          let project = user.projects.find(p => p.id === projectId)
          return <ProjectGraphs addImg={this.addImg} project={project} user={user}/>}
        } />
        <Route exact path='/projects/:id' render={(props) => {
          let projectId = parseInt(props.match.params.id)
          let projectFound = Object.entries(selectedProject).length === 0 ? user.projects.find(p => p.id === projectId) : selectedProject
         
          return projectFound ? <ProjectDetails deleteTask={deleteTask} project={projectFound} markAsComplete={markAsComplete} addTask={addTask} editTask={editTask} editProject={editProject} /> : <Home/>
        }}/>
        <Route path='/new'  render={()=> localStorage.token ? <NewProjectForm  updateLocalStorage={updateLocalStorage}user={user} createProject={this.createProject}/> : <Redirect push  to='/login'/>}/>
        <Route path='/login'  render={ ()=> !localStorage.token ? <LoginForm handleSubmit={handleLogin} handleChange={handleChange}/> : <Redirect push to='/profile'/>}/>
        <Route path='/signup' render={() => !localStorage.token ? <SignUpForm  handleSubmit={handleLogin} handleChange={handleChange}/> : <Redirect push to='/profile'/>} /> 
         <Route path='/profile' render={() => localStorage.token  ? <Profile   user={user}/> : <Redirect to='/login'/>} /> 
      </Switch>
        
       
      </div>
    );
  }
  
}

export default withRouter(App)
