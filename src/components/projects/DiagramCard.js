import React from 'react'
import {Card, Grid, Image, Modal, Button, Header} from 'semantic-ui-react'
import styled from 'styled-components'

const CardStyles = styled.div`
    .iconDiv{
      cursor: pointer;
    }

    
  

`

class DiagramCard extends React.Component {

    render(){
     
        const {img, handleDeleteDiagram} = this.props
        return(
          <CardStyles>
               <Grid.Column >
              <Card>
    <Image src={img.src} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Entity Relationship Diagram</Card.Header>
      <Card.Meta>
        <span className='date'>Date: 00/00/00</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
   <div className='iconDiv'><i class="fa fa-trash" onClick={()=>handleDeleteDiagram(img)} aria-hidden="true"></i></div> 

<Modal size='large' trigger={<Button>View Image </Button>}>
<Modal.Header>Select a Photo</Modal.Header>
<Modal.Content image>
  <Image wrapped size='massive' src={img.src} />
  <Modal.Description>
    <Header>Entity Relationship Diagram </Header>
  </Modal.Description>
</Modal.Content>
</Modal>
    </Card.Content>
  </Card>
  </Grid.Column>
          </CardStyles>
       





            
        )
    }
}
export default DiagramCard