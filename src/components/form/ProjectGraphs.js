import React, { isValidElement } from 'react'
import styled from 'styled-components'
import {Form, Button, Select} from 'semantic-ui-react'
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
	.title{
		text-align: center
		padding-top: 30px;
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

	

`




class ProjectGraphs extends React.Component{
	constructor(){
		super()
		this.state={
			nodename: '',
			hidden: true,
			nodes: {},
			fields: {},
			engine: '',
			saved: '',
			relationship:''
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

	createNode = (event, val) => {
		event.preventDefault()
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

	

	saveImg = () => {	
			html2canvas(document.querySelector(".diagram-layer")).then(canvas => {
				let imgUrl = canvas.toDataURL("image/png")
				this.setState({
					saved: imgUrl
				})
			});
			this.props.addImg(this.state.saved)
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
	




	render() {
		const options = [{key: 'One-to-Many', value: 'One-to-Many', text:'One-to-Many' },{key: 'Many-to-Many', value: 'Many-to-Many', text:'Many-to-Many'},{key: 'One-to-One', value: 'One-to-One', text: 'One-to-One'}] 
		// const options = this.state.nodes.map(v => ({
		// 	label: v.name,
		// 	value: v.name
		//   }));
		return (
			
			<FormStyling>
 		
			 <div className="title">
			<div >
			<h1 >Define Your Data Models</h1>
	
	<Button onClick= {this.handleClick}>Add A New Model</Button>
			</div>
			
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
					onDragOver={event => {
				
					}}
				>
					<br/>
						<br/>
					<DiagramWidget className='srd-demo-canvas' diagramEngine={this.engine} />

				
			
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
						<label>Add Relationships</label>
						<Select onChange={this.handleSelectChange} placeholder='Add your relationships' options={options} />
					
		
						<div >
			
							{this.state.relationship ? this.duplicateDiv() : null}
				
				
					
						</div>
				
				<br/><br/>
						<Button onClick={()=>this.saveImg(this.engine)}>Save &amp; Continue</Button>
					
						
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