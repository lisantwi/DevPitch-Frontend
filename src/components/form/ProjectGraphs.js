import React from 'react'
import styled from 'styled-components'
import Lodash from 'lodash';
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

`




class ProjectGraphs extends React.Component{
    state={
        nodename: 'model'
    }
    componentWillMount() {
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
    }
    handleChange = (e) => {
        this.setState({
            nodename: e.target.value

        })
    }
	render() {
     

		return (
			<div className="content">
				<TrayWidget>
					<TrayItemWidget onClick={this.handleClick} model={{ type: 'in' }} name="Test" color="peru" />
					<TrayItemWidget model={{ type: 'out' }} name="Test" color="hotpink" />
				</TrayWidget>
				<div
					className="diagram-layer"
					onDrop={event => {
						var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
						var nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
						var node = null;
						if (data.type === 'in') {
							node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'peru');
                            node.addPort(new DefaultPortModel(true, 'in-1', 'Name'));
                            node.addPort(new DefaultPortModel(true, 'in-2', 'text'));
						} else {
							node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'hotpink');
							node.addPort(new DefaultPortModel(false, 'out-1', 'Out'));
						}
						var points = this.engine.getRelativeMousePoint(event);
						node.x = points.x;
						node.y = points.y;
						this.engine.getDiagramModel().addNode(node);
						this.forceUpdate();
					}}
					onDragOver={event => {
						event.preventDefault();
					}}
				>
					<DiagramWidget className='srd-demo-canvas' diagramEngine={this.engine} />
				</div>
                <label>Change Node Name</label>
                <input onChange={this.handleChange} type='text'/>
			</div>
		);
}

}

export default ProjectGraphs