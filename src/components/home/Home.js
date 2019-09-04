import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Heroes from '../heroes/Heroes';
import AllyCounts from '../AllyCounts/AllyCounts';

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

const calculateAlliances = selected => {
	let alliances = {};
	selected.forEach(hero => {
		hero.classList.forEach(elem => {
			const key = elem.name;
			const count = alliances[key] ? alliances[key].count + 1 : 1;
			alliances = {
				...alliances,
				[key]: {
					...elem,
					count
				}
			}
		});
	});
	return alliances;
};

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#d07c19' : 'transparent'
});

class Home extends Component {
	state = {
		heroes: [],
		selected: [],
		alliances: {}
	};

	componentDidMount() {
		fetch('/heroes')
			.then(res => res.json())
			.then(({ data }) => {

				// should be deleted after correcting data from backend
				const newData = data.map(elem => {
					const newClassList = elem.classList.map(list => {
						const newList = {
							...list,
							rows: 2,
							step: 3,
							color: '#4977a6'
						};
						return newList
					});
					return {
						...elem,
						classList: newClassList
					};
				});

				this.setState( { heroes: newData } );

			})
	}

	onDragEnd = result => {
		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId &&
			destination.index === source.index) {
			return;
		}

		if (destination.droppableId === 'selected' && this.state.selected.length >= 10) return;

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
			const alliances = calculateAlliances(selected);

			this.setState({
				heroes,
				selected,
				alliances
			});
		}
	};

	render() {
		const { heroes, alliances, selected } = this.state;
		return (
			<div>
				<div className="alliances-container">
					{Object.keys(alliances).map(key => <AllyCounts key={key} {...alliances[key]} />)}
				</div>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="heroes" direction="horizontal">
						{provided => (
							<div ref={provided.innerRef} {...provided.droppableProps} className="heroes-list">
								<Heroes heroes={heroes} />
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					<Droppable droppableId="selected" direction="horizontal">
						{(provided, snapshot) => (
							<div className="drop-area" ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
								<Heroes heroes={selected} />
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		)
	}
}

export default Home;