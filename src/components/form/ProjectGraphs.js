import React from 'react'
import styled from 'styled-components'

const FormStyling = styled.div`
    .formDiv{
        padding: 50px;
    }

`

class ProjectGraphs extends React.Component{
    render(){
        return(
            <FormStyling>
                <div>
                    <h2>Phase 2</h2>
                    <button onClick={this.props.continueForm}> Continue</button>
                </div>
            </FormStyling>
          
        )
    }
}

export default ProjectGraphs