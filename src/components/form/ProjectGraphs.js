import React from 'react'
import styled from 'styled-components'
import { Link} from "react-router-dom";
import {Form, Button, Grid} from 'semantic-ui-react'
import html2canvas from 'html2canvas';




import Draggable from 'react-draggable'; // The default

import {
	DiagramWidget,
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DefaultNodeModel,
	DefaultPortModel
} from 'storm-react-diagrams';



const FormStyling = styled.div`
    .formDiv{
        padding: 50px;
	}
	.hidden{
		display: none;
		margin-top:30px;
		padding-left: 20px;
		padding-right:20px
	}
	
	.addButton{
		margin-left: 0 auto;
	}

	.content{
		margin: 0;
		padding: 0;
	}

	.diagram-layer{
		margin:auto;
	}
	.relationshipDiv{
		border: outset #f33;
		padding-right:30px
		padding-left:30px
		display:inline
		color:red
	}

	.title{
		text-align:center;
	}
	.title h1{
		padding-top:30px;
	}

	.buttonDiv{
		cursor: pointer;
	}

	.divButt{
		text-align:right;
	}

	.clearButton{
		text-align: left;
	}

	.colorButtonDiv{
		text-align:right;
	}

	

`




class ProjectGraphs extends React.Component{
	constructor(){
		super()
		this.state={
			nodename: '',
			hidden: true,
			nodes: {},
			fields: {},
			saved: '',
			relationship:'',
			oneMany: ['Div'],
			oneOne: ['Div'],
			manyMany:['Div']
		}

	}
 
    componentWillMount() {
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
	}
	
	handleChange = (e) => {
		this.setState({
			fields:{...this.state.fields, [e.target.name]:e.target.value}})
	}

	
	handleClick = (event) => {
		let value = this.state.hidden ? false : true
		this.setState({
			hidden: value
		})
		// var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
			
	}

	clearAll = () =>{
		this.setState({
			oneOne: [],
			manyMany: [],
			oneMany: []
		})
	}

	createNode = (event, val) => {

		let node = null
		node = new DefaultNodeModel(event.target.modelName.value, 'peru')
		let i = 1
		let fieldsArr = Object.entries(this.state.fields)
		fieldsArr.forEach(f=> {
				node.addPort(new DefaultPortModel(true, `in-${i}`, `${f[1]}`));

				i++
		})
		val.diagramModel.addNode(node)
		this.forceUpdate();
		let value = this.state.hidden ? false : true
		this.setState({
			nodes: {...this.state.nodes, node},
			hidden: value,
			engine: val
		})

	}

	returnDiagram= () =>{
		return <DiagramWidget className='srd-demo-canvas' diagramEngine={this.engine} />
	}

	

	saveImg = () => {	
		let imgUrl 
		let graph = document.querySelector(".diagram-layer")
			html2canvas(graph).then(canvas => {
				imgUrl = canvas.toDataURL("image/png")
				this.props.addImg(imgUrl, this.props.project)
			});


			
	
	
		
			

	
			// this.props.addImg(this.state.saved, this.props.project)
}
	
duplicateDiv = () => {
	let div=''
	const {relationship} = this.state
	switch(relationship) {
		case 'One-to-One':
		div = <Draggable><div className="ui yellow label">One-to-One</div></Draggable>	
		  break;
		case 'Many-to-Many':
			div = <Draggable><div className="ui green label">Many-to-Many</div></Draggable>
		  break;
		  case 'One-to-Many':
			div = <Draggable><div className="ui green label">One-to-Many</div></Draggable>
		  break;
	  } 
	  return div

		

	
	

}

handleSelectChange = (e) => {
	this.setState({
		relationship: e.target.textContent
	})
}

addOneMany = (e, div) => {
    let cDivs = this.state.oneMany;
    cDivs.push('newDiv')
    this.setState({oneMany: cDivs })
  }

  addOneOne = (e, div) => {
		let cDivs = this.state.oneOne;
		cDivs.push('newDiv')
		this.setState({oneOne: cDivs })
	  }

	  addManyMany = (e, div) => {
			let cDivs = this.state.manyMany;
			cDivs.push('newDiv')
			this.setState({manyMany: cDivs })
		  }
		
	




	render() {
		const {project} = this.props
		const options = [{key: 'One-to-Many', value: 'One-to-Many', text:'One-to-Many' },{key: 'Many-to-Many', value: 'Many-to-Many', text:'Many-to-Many'},{key: 'One-to-One', value: 'One-to-One', text: 'One-to-One'}] 
		// const options = this.state.nodes.map(v => ({
		// 	label: v.name,
		// 	value: v.name
		//   }));
		return (
			
			<FormStyling>
				<Link to={`/projects/${project.id}`}>
				<div className='buttonDiv'>
					<button className="ui active button">
					 <i className="arrow left icon"></i>
					Return to Project
				</button>
					</div>
				</Link>
				
					 
			 <div className="title">
			 <h1 >	Define Your Data Models</h1>
			 <Button onClick= {this.handleClick}>Add A New Model</Button>
				 <div className='ui two column centered grid'>
					
					 </div>
		
					
				 
			
			
			<br/>
		

		
			
				<div 
				onClick={this.onClickNode}
					className="diagram-layer"
					onDrop={event => {
						var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
						var node = null;
						
						if (data.type === 'in') {
							node = new DefaultNodeModel(this.state.nodename, 'peru');
                            node.addPort(new DefaultPortModel(true, 'in-1', 'Name'));
                            node.addPort(new DefaultPortModel(true, 'in-2', 'text'));
						} else {
							node = new DefaultNodeModel((this.state.nodename), 'hotpink');
							node.addPort(new DefaultPortModel(false, 'out-1', 'Out'));
						}
						var points = this.engine.getRelativeMousePoint(event);
						node.x = points.x;
						node.y = points.y;
						this.engine.getDiagramModel().addNode(node);
						this.forceUpdate();
					}}
					
				
			
				>
					<br/>
						<br/>

						{this.returnDiagram()}

			

				
			
				</div>
				<div className={this.state.hidden ? 'hidden' : ''}>

					<Form size='big'onSubmit={
						e => {
							let val = this.engine
							 this.createNode(e,val)}
					}>
						<Form.Field>
							<br/>	<br/>
						<label>Add New Model</label>
						<br/>	<br/>
						<input   name='modelName' onChange={this.handleModelName} type='text' placeholder='Model Name' width={8}/>
						</Form.Field>
						<br/>	<br/>
					<div className="three fields">
						<div className='field'>
								
					<input  onChange={this.handleChange} name='field_1' type='text' placeholder='Enter field name'  />
						</div>
						<div className='field'>
						<input  onChange={this.handleChange} name='field_2' type='text' placeholder='Enter field name' />
						</div>
						<div className='field'>
						<input  onChange={this.handleChange} name='field_3' type='text' placeholder='Enter field name' />
						</div>
						<div className='field'>
						<input  onChange={this.handleChange} name='field_4' type='text' placeholder='Enter field name'  />
						</div>
				
					</div>
					<Button type='submit' >Save</Button>
					<br/><br/>
					
					</Form>
				
				</div>
				<div>
						
					
						<div >

							<div className='divButt'>
							<Grid columns={3}>
								<Grid.Column>
									<div className='colorButtonDiv'>
									<label>Add Relationships:     </label><br/>
								{this.state.oneMany.map(div =>{
							return <Draggable ><div className="ui yellow label">One-to-Many</div></Draggable>
						})}

					{this.state.oneOne.map(div =>{
							return <Draggable ><div className="ui green label">One-to-One</div></Draggable>
						})}

{this.state.manyMany.map(div =>{
							return <Draggable ><div className="ui red label">Many-to-Many</div></Draggable>
						})}
									</div>
								
								</Grid.Column>
								<Grid.Column >
								<Button primary size='mini' onClick={this.addOneMany}> Add One-to-One Relationship</Button><br/>
						<Button primary size='mini' onClick={this.addOneOne}> Add One-to-Many Relationship</Button><br/>
						<Button primary size='mini' onClick={this.addManyMany}> Add Many-to-Many Relationship</Button>
						
									
								</Grid.Column>
								<Grid.Column>
								<div className='clearButton'>
								<Button secondary size='small' onClick={this.clearAll}> Clear All</Button>	
								</div>
							
								</Grid.Column>
							</Grid>
							</div>

							
					
						
	
						{/* <Draggable ><div className="ui yellow label">One-to-One</div></Draggable>
					    <Draggable><div className="ui green label">Many-to-Many</div></Draggable>	
						<Draggable><div className="ui red label">One-to-Many</div></Draggable> */}
				
				
					
						</div>
				
				<br/><br/>

				<Button onClick={this.saveImg}>Save &amp; Return to Project</Button>
		
						
					
						
				{/* <Select
			options={options}
			/> */}
					</div>
					</div>

			
	
			
				</FormStyling>
	
             
		);
}

}

export default ProjectGraphs