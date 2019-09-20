import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import styled from 'styled-components'

const FormStyling = styled.div`
    .formDiv{
        padding: 50px;
    }

`

class ProjectDescription extends React.Component{
  

  
    render(){

        const type = 'login'
        return(
            <FormStyling>
            <div className='formDiv' >
                <h2>Create a new Project</h2>

                <Form >
                    <Form.Field label='Username' placeholder='Enter your username' type='text'name='username' control='input' />
                     <Form.Field label='Password' placeholder='Enter your password' type='password' name='password' control='input' />
                     <Button type='submit'>Submit</Button>
          </Form>
            </div>
            </FormStyling>
           
         
          

    
            
            
        )
    }
}

export default ProjectDescription