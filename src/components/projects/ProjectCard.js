import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'



const CardStyles = styled.div`
    padding-top:40px;

`


class ProjectCard extends React.Component{
    constructor(props){
        super(props)

    }



    render(){
        const {project, onSelectedProject} = this.props
        return(
        <CardStyles>
            <div className='four wide column'>
                        <div className="ui card">
  <div className="content">
    <div className="header">Project Name: {project.name}</div>
  </div>
  <div className="content">
    <h4 className="ui sub header">Details</h4>
    <div className="ui small feed">
      <div className="event">
        <div className="content">
          <div className="summary">
            <a>Languages: </a><ul>{project.languages? project.languages.map(l=> {
                return <li>{l.name}</li>
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