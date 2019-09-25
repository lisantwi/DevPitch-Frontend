import React from 'react'
import ProjectDescription from './form/ProjectDescription'
import ProjectGraphs from './form/ProjectGraphs'
import ProjectDetails from './form/ProjectDetails'
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

    addImg = (src) => {
        const {currentProject} = this.state
        let data = {
            project_id: currentProject.id,
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
            this.setState({
             currentProject: data
            })
        })

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
            case 3:
                return <ProjectDetails continueForm={continueForm}/>
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