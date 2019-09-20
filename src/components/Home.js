import React from 'react'
import { Button} from 'semantic-ui-react'
import styled from 'styled-components'

const LoginDiv = styled.div`
    .buttonDiv{
        text-align:center;
        padding: 100px;
    }
`
function Home () {

    return(
        <div>
            <LoginDiv>
                <div className='buttonDiv'>
                <a href='/login'><Button >Log in </Button></a>
                <a href='/signup'><Button >Sign Up </Button></a>
                </div>
             
            </LoginDiv>
         
        </div>

    )
}

export default Home