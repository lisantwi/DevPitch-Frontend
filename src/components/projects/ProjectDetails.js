import React, { Fragment } from 'react'
import styled from 'styled-components'
import {Button,Grid} from 'semantic-ui-react'
import { Link} from "react-router-dom";
import DiagramCard from './DiagramCard';



const CardStyles = styled.div`


.pen,
.pen a {
font-family: "Open Sans", sans-serif;
color: #black;
font-style: normal;
}
.pen a {
text-decoration: none;
}


.pen .page-header {
border-bottom: 1px solid black;
margin-top: 16px;
margin-bottom: 12px;
padding: 12px 0;
}


.pen .page-header .technology li a:hover {
color: #333;
}

.pen .page-footer {
min-height: 16px;
border-top: 1px solid black;
margin: 42px 0 0;
padding: 12px 0;
}

.tasks, .images{
    min-height: 300px;
}







`



class ProjectDetails extends React.Component{
    constructor(props){
        super(props)

    }



    render(){
        const {project} = this.props
        return(
            <CardStyles>
            <Fragment>
            <div className="container pen">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-header">
    
                  <h1>Project Details</h1>
                  <p className="lead">Name: {project.name}</p>
                  <p className="lead">Description: {project.description}</p>
                  <p className="lead">I'm building this project with:</p> <ul>{project.languages.map(p =>{
                      return <li>{p.name}</li>
                  } )}</ul> 
               

                </div>
              </div>
            </div>
          </div>
          <div className='tasks'>  <h3>Tasks<i className="fa fa-plus-circle"></i></h3>
          You have 0 tasks. Add some tasks to track your project progress.
          </div>
            <hr/>
          <div className='Diagrams'>  <h3>Images</h3></div>
             <h5>You currently have {project.images.length} diagrams</h5>
            <Link to={`/projects/${project.id}/diagrammer`}>
            <Button>Add a new diagram</Button>
            </Link>

        

          <Grid columns={project.images.length} divided>
              {project.images.map(img => {
                  return <DiagramCard img={img} key={img.id}/>
              })}
            
            </Grid>
     
          
          
          <div className="container pen"><div className="row">
            <div className="col-sm-12"><div className="page-footer">
           
            </div></div>
          </div></div>
          </Fragment>
          </CardStyles>
        )
    }
}

export default ProjectDetails