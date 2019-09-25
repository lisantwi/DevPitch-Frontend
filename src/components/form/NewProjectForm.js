import React from 'react'
import ProjectDescription from './ProjectDescription'
import ProjectGraphs from './ProjectGraphs'

import {
	withRouter
} from 'react-router-dom';

require("storm-react-diagrams/dist/style.min.css")

class NewProjectForm extends React.Component{
    constructor(){
        super()
        this.state={
            stage: 1,
            project_name:'',
            description: '',
            start_date:'',
            end_date:'',
            selected: [],
            currentProject:{}
        }

    }


    continueForm = () => {
        let{ project_name, description, start_date, end_date, selected} = this.state
        let data = {
            name: project_name,
            description: description,
            start_date: start_date,
            end_date: end_date,
            selected: selected
        }
        fetch('http://localhost:3000/api/v1/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
        .then(data => {
            this.setState({
             currentProject: data,
            })
        })
        this.props.history.push('/projects')
    }



    handleChange = (e) => {
        debugger
        this.setState({
            [e.target.name]: e.target.value
        })
     
    }

 addLanguages = (arr) => {
     this.setState({
         selected: arr
     })

 }

    movePage = () => {
        const {stage} = this.state
        this.setState({
            stage: stage+= 1
           })
    }

    renderForm = () => {
        const {continueForm, handleChange, addImg, addLanguages} = this
        switch(this.state.stage){
            case 1:
                return <ProjectDescription handleChange={handleChange} addLanguages={addLanguages} continueForm={continueForm} />
            case 2:
                return <ProjectGraphs addImg={addImg} currentProject={this.state.currentProject} continueForm={continueForm}/>
        }
    }

    render(){
        const {stage} = this.state
        return(
            <div>
                 {this.renderForm()}
            </div>
           
        )
    }
}

export default withRouter(NewProjectForm)