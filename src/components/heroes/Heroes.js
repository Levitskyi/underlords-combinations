import React, { Component } from 'react';
import './heroes.css';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


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

class Heroes extends Component {
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
							{this.state.heroes.map((hero, index) =>
								<Draggable key={hero._id} draggableId={hero._id} index={index}>
									{provided => (
										<div key={hero._id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											<Link style={{ textDecoration: "none" }} to={`/heroes/${hero._id}`}>
												<div className="heroes-list__block">
													<div className="heroes-list__heroes-images">
														<img alt={hero.name} src={hero.imgUrl} />
													</div>
													<h2 className="heroes-list__heroes-name white-color text-uppercase">{hero.name}</h2>
													<div className="heroes-list__heroes-class">
														{hero.classList.map(hero_class => <img key={hero_class._id} alt={hero_class.name} src={hero_class.imgUrl} />)}
													</div>
												</div>
											</Link>
										</div>
									)}
								</Draggable>
							)}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<Droppable droppableId="selected" direction="horizontal">
					{(provided, snapshot) => (
						<div
							className="drop-area"
							ref={provided.innerRef}>
							{this.state.selected.map((hero, index) => (
								<Draggable
									key={hero._id}
									draggableId={hero._id}
									index={index}>
									{(provided, snapshot) => (
										<div
											key={hero._id}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}>
											<Link style={{ textDecoration: "none" }} key={hero._id} to={`/heroes/${hero._id}`}>
												<div className="heroes-list__block">
													<div className="heroes-list__heroes-images">
														<img alt={hero.name} src={hero.imgUrl} />
													</div>
													<h2 className="heroes-list__heroes-name white-color text-uppercase">{hero.name}</h2>
													<div className="heroes-list__heroes-class">
														{hero.classList.map(hero_class => <img key={hero_class._id} alt={hero_class.name} src={hero_class.imgUrl} />)}
													</div>
												</div>
											</Link>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		)
	}
}

export default Heroes;