import React from 'react'
import {Form, Checkbox, Button} from 'semantic-ui-react'
import styled from 'styled-components'

const FormStyling = styled.div`
    .formDiv{
        padding: 50px;
    }

`

class LoginForm extends React.Component{
  

  
    render(){
        const {handleChange, handleSubmit} = this.props
        const type = 'login'
        return(
            <FormStyling>
            <div className='formDiv' >
                <h2>Login</h2>
                <p>I don't have an account. <a href='/signup'>Sign up here</a></p>
                <Form onSubmit={(e) => handleSubmit(e,type)}>
                    <Form.Field label='Username' placeholder='Enter your username' type='text'name='username' control='input' onChange={handleChange}/>
                     <Form.Field label='Password' placeholder='Enter your password' type='password' name='password' control='input' onChange={handleChange}/>
                     <Button type='submit'>Submit</Button>
          </Form>
            </div>
            </FormStyling>
           
         
          

    
            
            
        )
    }
}

export default LoginForm