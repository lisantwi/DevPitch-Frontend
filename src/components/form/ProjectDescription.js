import React from 'react'
import styled from 'styled-components'
import {Form, Button, TextArea} from 'semantic-ui-react'

const FormStyling = styled.div`
    .formDiv{
        padding: 50px;
    }

`


class ProjectDescription extends React.Component{
    render(){
        return(
            <FormStyling>
                <div className='formDiv'>
                    <h2>Tell us about your project</h2>
                    <Form>
                    <TextArea placeholder='What are you trying to build? How will it help achieve your goals future goals? Is this for practice or part of an assignment?' rows="15"/>
                    <Button onClick={this.props.continueForm} > Continue</Button>
                    <Button onClick={this.props.continueForm}> Save</Button>
                    </Form>
                   
                </div>
            </FormStyling>
        )
    }
}

export default ProjectDescription