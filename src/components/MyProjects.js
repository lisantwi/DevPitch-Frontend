import React from 'react'
import styled from 'styled-components'
import { Card } from 'semantic-ui-react'



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
        debugger
        return(
        <CardStyles>
            <div className= 'ui grid'>
                  <h2>My Projects</h2>
                  <br/><br/>
                {this.props.user.projects.map(p=>{
                    debugger
                    return <div className='four wide column'>
                        <div className="ui card">
  <div className="content">
    <div className="header">Project Name: {p.name}</div>
  </div>
  <div className="content">
    <h4 className="ui sub header">Details</h4>
    <div className="ui small feed">
      <div className="event">
        <div className="content">
          <div className="summary">
            <a>Languages: </a><ul>{p.languages? p.languages.map(l=> {
                debugger
                return <li>{l.name}</li>
            }) : null
            }</ul>
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
             <a>Start Date:</a> {p.start_date}
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
             <a>End Date:</a> {p.end_date}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="extra content">
    <button className="ui button">View Project</button>
  </div>
</div>
                    </div>
                })  }
            </div>
            </CardStyles>
        )
    }
}

export default MyProjects