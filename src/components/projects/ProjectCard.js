import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'



const CardStyles = styled.div`
    padding-top:40px;

    .trashIcon{
      text-align: right;
      cursor: pointer;
    }

    .linkStatus{
      color:red
    }

    .statusDiv{
      font-size: 15px
    }

  

`


class ProjectCard extends React.Component{

  


    render(){
        const {project, onSelectedProject, deleteProject} = this.props
        return(
        <CardStyles>
            <div className='four wide column'>
                        <div className="ui card">
  <div className="content">
    <div className="header">Project Name: {project.name}</div><div className='trashIcon'><i className="fa fa-trash fa-lg" aria-hidden="true" onClick={()=>deleteProject(project)}></i></div>
  </div>
  <div className="content">
    <h4 className="ui sub header">Project Details</h4>
    <div className="ui small feed">
      <div className="event">
        <div className="content">
          <div className="summary">
           Languages: <ul>{project.languages? project.languages.map(l=> {
                return  <li key={l.id}>{l.name}</li>
            }) : null
            }</ul>
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
             <a>Start Date:</a> {project.start_date}
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
             <a>End Date:</a> {project.end_date}
          </div>
          <div className="summary">
            <div className='statusDiv'><a className='linkStatus'>Status:</a> {project.is_complete ? 'Complete' : 'Incomplete'}</div> 
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="extra content">
      <Link to={`/projects/${project.id}`}>
        <button onClick={()=> onSelectedProject(project)} className="ui button">View Project</button>
      </Link>
   
  </div>
  </div>
  </div>
            </CardStyles>
        )
    }
}

export default ProjectCard