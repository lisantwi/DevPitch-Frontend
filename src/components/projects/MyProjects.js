import React from 'react'
import styled from 'styled-components'
import ProjectCard from './ProjectCard'



const CardStyles = styled.div`
    padding-top:40px;

`


class MyProjects extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            projects: []
    }
    }



    render(){
      const {user, onSelectedProject, deleteProject} = this.props
        return(
        <CardStyles>
            <div className= 'ui grid'>
                  <h2>My Projects</h2>
                  <br/><br/>
                {user.projects.map(p=> <ProjectCard deleteProject={deleteProject} onSelectedProject={onSelectedProject} key={p.id} project={p}/>)}
            </div>    
        
        </CardStyles>
        )  
}}

export default MyProjects