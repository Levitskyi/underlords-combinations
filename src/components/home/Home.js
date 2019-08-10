import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Heroes from '../heroes/Heroes';


const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#d07c19' : 'transparent'
});

class Home extends Component {
	state = {
		heroes: [],
		selected: []
	};

	componentDidMount() {
		fetch('/heroes')
			.then(res => res.json())
			.then(({ data }) => {
				console.log(data);
				this.setState( { heroes: data } );

			})
	}

	onDragEnd = result => {
		const { destination, source } = result;
		console.log(result);

		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId &&
			destination.index === source.index) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const items = reorder(
				this.state[source.droppableId],
				source.index,
				destination.index
			);

			let state = { [source.droppableId]: items};

			this.setState(state);
		} else {
			const result = move(
				this.state[source.droppableId],
				this.state[destination.droppableId],
				source,
				destination
			);

			const { heroes, selected } = result;

			this.setState({
				heroes,
				selected
			});
		}
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="heroes" direction="horizontal">
					{provided => (
						<div ref={provided.innerRef} {...provided.droppableProps} className="heroes-list">
							<Heroes heroes={this.state.heroes} />
						{provided.placeholder}
						</div>
					)}
				</Droppable>
				<Droppable droppableId="selected" direction="horizontal">
					{(provided, snapshot) => (
						<div className="drop-area" ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
							 <Heroes heroes={this.state.selected} />
						{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		)
	}
}

export default Home;