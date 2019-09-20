import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import styled from 'styled-components'


const FormStyling = styled.div`
    .formDiv{
        padding: 50px;
    }

`




class SignUpForm extends React.Component{

    
    render(){
        const type = 'signup'
        const {handleChange, handleSubmit} = this.props
        return(
          
            <FormStyling>
                
            <div className='formDiv' >
            <h2> Create a new account</h2>
                <Form onSubmit={(e) => handleSubmit(e,type)}>
                    <Form.Field label='Username' placeholder='Choose your username' type='text'name='username' control='input' onChange={handleChange}/>
                     <Form.Field label='Password' placeholder='Enter your password' type='password' name='password' control='input' onChange={handleChange}/>
                     <Button type='submit'>Create Account</Button>
          </Form>
            </div>
            </FormStyling>
           
            
        )
    }
}

export default SignUpForm