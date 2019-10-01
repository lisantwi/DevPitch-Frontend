import React, { Fragment } from 'react'
import styled from 'styled-components'
import {Button,Grid, Form, Select, Input, Table, TextArea} from 'semantic-ui-react'
import { Link, withRouter} from "react-router-dom";
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

.hidden{
  display: none;
  padding-left: 30px
}
.icons{
  cursor:pointer;
}

.editing{
  display: none;
  padding-left: 30px
}

.lead{
  padding-left:20px
}

.formOn{
  display:none;
}

.formTag {
  padding-left:20px
}

.table{
  padding:20px;
}

.taskComplete{
  cursor: pointer;
}

.overdue{
  color:red;
  font-size: 12px
}


`



class ProjectDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
          hidden:true,
          task_name:'',
          due_date:'',
          priority: '',
          editing: false,
          formOn: false,
          languages:[]
        }

    }

    componentDidMount(){
      fetch('http://localhost:3000/api/v1/languages',{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(resp => resp.json())
      .then(languages => {
          this.setState({
              languages: languages
          })
      })  
  }

    handleClick = () => {
      let value = this.state.hidden ? false : true
      this.setState({
        hidden: value
      })   
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSelectChange=(e,{value})=>this.setState({priority:value})

    handleSubmit = (e) => {
      const {task_name, due_date, priority} = this.state
      const {project, addTask} = this.props
      e.preventDefault()
      let data = {
        name: task_name,
        due_date: due_date,
        priority: priority,
        project_id: project.id
      }
      addTask(data)
      this.handleClick()
    }

    handleEditSubmit = (e) => {
      const {task_name, due_date, priority, task_id} = this.state
      const {project, editTask} = this.props
      e.preventDefault()
      let data = {
        name: task_name,
        due_date: due_date,
        priority: priority,
        project_id: project.id,
        task_id: task_id
      }
      editTask(data)
      this.setState({
        editing: false
      })

      
    }

    handleDelete = (task) => {
      const {deleteTask} = this.props
      deleteTask(task)
    }
  handleEdit = (task) => {
    let value = this.state.editing ? false : true
    this.setState({
      editing: value,
      task_name: task.name,
      due_date: task.due_date,
      priority: task.priority,
      task_id: task.id,
    })

  }

  handleProjectEdit = (project) => {
    const languageChosen = project.languages.map(p=> {
      return p
    })
    this.setState({
      project_name: project.name,
      project_start_date: project.start_date,
      project_end_date: project.end_date,
      project_description: project.description
    })
    console.log(`editing ${project.name}`)
    let value = this.state.formOn ? false : true
    this.setState({
      formOn: value
    }) 
  }


  returnForm = () => {
    const {project} = this.props
    const {task_name, due_date, priority} = this.state
    const {handleChange, handleSelectChange, handleEditSubmit} = this
    const options = [
      {key:'High', text: 'High', value: 'high'},
      {key:'Medium', text: 'Medium', value: 'Medium'},
      {key:'Low', text: 'Low', value: 'low'}
    ]
     return (<Form onSubmit={this.handleEditSubmit}>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Task Name'
            name='task_name'
            value={task_name}
            onChange={handleChange}
            required
          />
          <Form.Field
            control={Input}
            type='date'
            label='Due Date'
            name='due_date'
            value={due_date}
            onChange={handleChange}
            max={project.end_date}
            required
          />
          <Form.Field
            control={Select}
            label='Priority'
            options={options}
            name='priority'
            value={priority}
            onChange={handleSelectChange}
            required
          />
          <Button type='submit' >Edit Task</Button>
        </Form.Group>
          </Form> )
  }

  addLanguages = (arr) => {
    this.setState({
        project_languages: arr
    })

}
handleChangeSelect = (e, {value}) => {
  this.addLanguages(value)
}

handleProjectEditSubmit = () => {
  const {editProject, project} = this.props
  const {project_name, project_start_date, project_end_date, project_description, project_languages} = this.state
  let data = {
    project_id: project.id,
    name: project_name,
    start_date: project_start_date,
    end_date: project_end_date,
    description: project_description,
    languages: project_languages
  }
  editProject(data)

  this.setState({
    formOn: false
  })


}

 
 





    render(){
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1; //January is 0!
      let yyyy = today.getFullYear();
       if(dd<10){
              dd='0'+dd
          } 
          if(mm<10){
              mm='0'+mm
          } 
      
      today = yyyy+'-'+mm+'-'+dd;
      const {handleClick, handleChange, handleSubmit,handleSelectChange, handleDelete, handleEdit, returnForm, handleProjectEdit, handleProjectEditSubmit} = this
      const {project_name, project_start_date, project_end_date, project_description} = this.state
      const options = [
        {key:'High', text: 'High', value: 'high'},
        {key:'Medium', text: 'Medium', value: 'Medium'},
        {key:'Low', text: 'Low', value: 'low'}
      ]
        const {project, markAsComplete} = this.props
       
        return(
            <CardStyles>
            <Fragment>
            <div className="container pen">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-header">
    
                  <h1>Project Details<div className='icons'><i onClick={()=>handleProjectEdit(project)} className="fa fa-edit "></i></div></h1>
                  <div className={this.state.formOn ? 'formOn' : ''}>
                  <p className="lead">Name: {project.name}</p>
                  <p className="lead">Description: {project.description}</p> 
                  <p className="lead">Project Start Date: {project.start_date}</p>          
                  <p className="lead">Project End Date: {project.end_date}</p>   
                  <p className="lead">I'm building this project with:</p> <ul>{project.languages.map(p =>{
                      return <li key={p.id}>{p.name}</li>
                  } )}</ul> 
                  </div>


                <div className={this.state.formOn ? '' : 'formOn'}>
                   <p>Edit Project</p>
                    <Form className='formTag' onSubmit={handleProjectEditSubmit} >
                    <Form.Input  required={true} onChange={handleChange} name='project_name' type='text' placeholder='Project Name' width={4} value={project_name}   />
                    <Form.Group   width={2} >
                        <Form.Input required={true} onChange={handleChange} name='project_start_date' type='date' placeholder='Project Start Date' value={project_start_date} width={2}  required onChange={handleChange}/>
                        <Form.Input required={true} onChange={handleChange} name='project_end_date' type='date' placeholder='Project Start Date' value={project_end_date}   width={2} required onChange={handleChange}/>
                    </Form.Group>
                    <Form.Dropdown 
                        fluid
                        multiple
                        search
                        selection
                        name='project_languages'
                        width={4} 
                        onChange={this.handleChangeSelect.bind(this)}
                        label='Language'
                        options={this.state.languages}
                        placeholder='Select the Languages for your project'
                        required
                    />
                  

                    <TextArea name='project_description'onChange={handleChange} value={project_description} onChange={handleChange}placeholder='What are you trying to build? How will it help achieve your goals future goals? Is this for practice or part of an assignment?' rows="3"  style={{ minWidth: 50 }} />
                    <Button><div>Submit</div> </Button>
                    </Form>
                   
                </div>

              
               

                </div>
              </div>
            </div>
          </div>
          <div className='tasks'>  <h3>Tasks<i onClick={handleClick}className="fa fa-plus-circle"></i></h3>
          You have {project.tasks.length} task(s). Add new tasks by clicking the '+' sign located next to 'Tasks'
          <Table className='table' celled>
            {project.tasks.length !== 0 ? <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Task Name</Table.HeaderCell>
        <Table.HeaderCell>Due Date</Table.HeaderCell>
        <Table.HeaderCell>Priority</Table.HeaderCell>
        <Table.HeaderCell>Status </Table.HeaderCell>
        <Table.HeaderCell>Edit/Delete</Table.HeaderCell>
      </Table.Row>
    </Table.Header> : null}


    <Table.Body>
      {project.tasks.map(t => {
        const dueDate = new Date(t.due_date)
        const todayDate = new Date()
        return <Table.Row key={t.id} > 
          <Table.Cell>{t.name}<span ></span> </Table.Cell>
          <Table.Cell>{t.due_date} {dueDate < todayDate ? <p className='overdue'>overdue</p> : ''}</Table.Cell>
          <Table.Cell>{t.priority}</Table.Cell>
          <Table.Cell>{t.is_complete ? 'Completed' : 'Incomplete'} <a className='taskComplete' onClick={()=>markAsComplete(t)}>{t.is_complete ? 'Mark as Incomplete' : 'Mark as Complete'}</a></Table.Cell>
          <Table.Cell><div className='icons'><i onClick={()=>handleEdit(t)} className="fa fa-edit fa-lg"></i><i onClick={()=>handleDelete(t) } className="fa fa-trash fa-lg"></i></div></Table.Cell>
        </Table.Row>
      })}
   

     
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='5'>
    
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
       
       

          <Form onSubmit={handleSubmit} className={this.state.hidden ? 'hidden' : ''}>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Task Name'
            placeholder='Enter the name of your new task'
            name='task_name'
            onChange={handleChange}
            required
          />
          <Form.Field
            control={Input}
            type='date'
            label='Due Date'
            name='due_date'
            onChange={handleChange}
            placeholder='Enter your Task Due Date'
            min={today}
            required
          />
          <Form.Field
            control={Select}
            label='Priority'
            options={options}
            placeholder='Select your Task Priority'
            name='priority'
            onChange={handleSelectChange}
            required
          />
          <Button type='submit' >Submit</Button>
        </Form.Group>
          </Form>

          {this.state.editing ? returnForm() : null}

        
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

export default withRouter(ProjectDetails)