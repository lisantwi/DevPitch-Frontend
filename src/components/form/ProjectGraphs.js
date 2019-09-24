import React from 'react'
import styled from 'styled-components'
import Select from 'react-select';
import Lodash from 'lodash';
import * as SRD from 'storm-react-diagrams'
import Draggable from 'react-draggable'; // The default

import {
	DiagramWidget,
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DefaultNodeModel,
	DefaultPortModel
} from 'storm-react-diagrams';
import TrayWidget from './TrayWidget';
import TrayItemWidget from './TrayItemWidget';


const FormStyling = styled.div`
    .formDiv{
        padding: 50px;
	}
	.hidden{
		display: none;
	}

	

`
var engine = new SRD.DiagramEngine();
engine.installDefaultFactories();

// 2) setup the diagram model
var model = new SRD.DiagramModel();

// 3) create a default node
var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
let port1 = node1.addOutPort("Out");
node1.setPosition(100, 100);

// 4) create another default node
var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
let port2 = node2.addInPort("In");
node2.setPosition(400, 100);

// 5) link the ports
let link1 = port1.link(port2);

// 6) add the models to the root graph
model.addAll(node1, node2, link1);

// 7) load model into engine
engine.setDiagramModel(model);




class ProjectGraphs extends React.Component{
	constructor(){
		super()
		this.state={
			nodename: '',
			hidden: true,
			nodes: {},
			fields: {},
			engine: '',
			saved: ''
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

	addLabel = () => {
		const node = this.state.nodes[0]
	}

	saveImg = (val) => {
		debugger
		const model = this.state.engine.getDiagramModel();
		let jsonDiagram = JSON.stringify(model.serializeDiagram())
		debugger
	
	let svgBlob = new Blob([jsonDiagram], {type: "image/jpeg;charset=utf-8"})
	let img = URL.createObjectURL(svgBlob);
	console.log('saving')
	this.setState({ 
		saved: img
})

}
	





	render() {
		// const options = this.state.nodes.map(v => ({
		// 	label: v.name,
		// 	value: v.name
		//   }));
		return (
			
			<FormStyling>
 		
			 <div className="content">
			
				<TrayWidget>
					<TrayItemWidget  model={{ type: 'in' }} name="Test" color="peru" />
					<TrayItemWidget model={{ type: 'out' }} name="Test" color="hotpink" />
				</TrayWidget>
				<button onClick= {this.handleClick}>Add new Node</button>
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

					<DiagramWidget className='srd-demo-canvas' diagramEngine={this.engine} />

				
			
				</div>
				<div className={this.state.hidden ? 'hidden' : ''}>

					<form onSubmit={
						e => {
							let val = this.engine
							 this.createNode(e,val)}
					}>
					<label>Change Node Name</label>
					<input   name='modelName' onChange={this.handleModelName} type='text' placeholder='Model Name'/>
					<input  onChange={this.handleChange} name='field_1' type='text' placeholder='Enter field name'/>
					<input  onChange={this.handleChange} name='field_2' type='text' placeholder='Enter field name'/>
					<input  onChange={this.handleChange} name='field_3' type='text' placeholder='Enter field name'/>
					<input  onChange={this.handleChange} name='field_4' type='text' placeholder='Enter field name'/>
					<button type='submit' >Create Node</button>
					<br/><br/>
					
					</form>
				
				</div>
				<div>
						<label>Add Relationships</label>
						<Draggable>
						<button onClick={this.addLabel}>Has many</button>
						</Draggable>
						<button onClick={()=>this.saveImg(this.engine)}>Save</button>
					
						
				{/* <Select
			options={options}
			/> */}
					</div>
					{this.state.saved ? <img src={this.state.saved}/> : null}
	
				</div> 
				</FormStyling>
	
             
		);
}

}

export default ProjectGraphs