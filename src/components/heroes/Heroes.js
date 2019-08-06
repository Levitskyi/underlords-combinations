import React, { Component } from 'react';
import './heroes.css';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

class Heroes extends Component {
	state = {
		heroes: []
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

		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId &&
			destination.index === source.index) {
			return;
		}

		const reorder = (list, startIndex, endIndex) => {
			const result = list;
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);
			return result;
		}

		const content = reorder(this.state.heroes, source.index, destination.index);
		this.setState({ content });
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{provided => (
						<div ref={provided.innerRef} {...provided.droppableProps} className="heroes-list">
							{this.state.heroes.map((hero, index) =>
								<Draggable key={hero._id} draggableId={hero._id} index={index}>
									{provided => (
										<Link style={{ textDecoration: "none" }} key={hero._id} to={`/heroes/${hero._id}`}>
											<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="heroes-list__block">
												<div className="heroes-list__heroes-images">
													<img alt={hero.name} src={hero.imgUrl} />
												</div>
												<h2 className="heroes-list__heroes-name white-color text-uppercase">{hero.name}</h2>
												<div className="heroes-list__heroes-class">
													{hero.classList.map(hero_class => <img key={hero_class._id} alt={hero_class.name} src={hero_class.imgUrl} />)}
												</div>
											</div>
										</Link>
									)}
								</Draggable>
							)}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		)
	}
}

export default Heroes;