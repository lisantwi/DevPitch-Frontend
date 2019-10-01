import React from 'react'
import styled from 'styled-components'
import {Form, Button, TextArea} from 'semantic-ui-react'


const FormStyling = styled.div`
    .formDiv{
        padding: 50px;
    }

`


class ProjectDescription extends React.Component{
    constructor(){
        super()
        this.state = {
            languages: [],
            start_date:'',
            end_date:'',
            description: '',
            selected: []
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

    handleChangeSelect = (e, {value}) => {
        this.props.addLanguages(value)
    }

    render(){
        
        const {handleChange, continueForm} = this.props
        return(
            <FormStyling>
                <div className='formDiv'>
                    <h2>Tell us about your project</h2>
                    <Form onSubmit={continueForm}>
                    <Form.Input  required={true} onChange={handleChange} name='project_name' type='text' placeholder='Project Name' />
                    <Form.Group  widths='equal'>
                        <Form.Input required={true} onChange={handleChange} name='start_date' type='date' placeholder='Project Start Date' required/>
                        <Form.Input required={true} onChange={handleChange} name='end_date' type='date' placeholder='Project Start Date' required/>
                    </Form.Group>
                    <Form.Dropdown 
                        fluid
                        multiple
                        search
                        selection
                        name='languages'
                        label='Language'
                        options={this.state.languages}
                        placeholder='Select the Languages for your project'
                        onChange={this.handleChangeSelect.bind(this)}
                        required
                    />
                  

                    <TextArea name='description' onChange={handleChange}placeholder='What are you trying to build? How will it help achieve your goals future goals? Is this for practice or part of an assignment?' rows="15"/>
                    <Button type='submit'><div>Submit</div> </Button>

                    </Form>
                   
                </div>
            </FormStyling>
        )
    }
}

export default ProjectDescription