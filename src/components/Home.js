import React from 'react'
import { Button, Grid} from 'semantic-ui-react'
import styled from 'styled-components'

const LoginDiv = styled.div`
    .buttonDiv{
        text-align:center;
        padding: 100px;
    }

    .homeLogo{
        margin-top:200px;
        display:flex;
        z-index: -1;
    }

    .title{
        position: absolute;
        top: 300px;
        right: 100px;
        font-size: 100px;
        font-family: 'Turret Road', cursive;
        color:#cc412c;
    }

    .container{
        position:relative;
    }
`
const Home = () =>{
    const image = require('../images/homepage.svg')
    return(
        <div className='container'>
            <LoginDiv>
            <h2 className='title'>DevPitch</h2>
         <div className='title'>
     
         <div className='buttonDiv'>
                <a href='/login'><Button >Log in </Button></a>
                <a href='/signup'><Button >Sign Up </Button></a>
                </div>
              
         </div>

                    <img ClasName='homeLogo' src={image}/>
                
              
             
            </LoginDiv>
            </div>
 

    )
}

export default Home