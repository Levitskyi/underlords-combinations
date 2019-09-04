import React, { Component } from 'react';
import './heroes.css';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

class Heroes extends Component {
	render() {
		return this.props.heroes.map((hero, index) =>
			<Draggable key={hero._id} draggableId={hero._id} index={index}>
				{provided => (
					<div key={hero._id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<Link style={{ textDecoration: "none" }} to={`/heroes/${hero._id}`}>
							<div className="heroes-list__block">
								<div className="heroes-list__block-inner">
									<div className="heroes-list__heroes-images">
										<img alt={hero.name} src={hero.imgUrl} />
									</div>
									<h2 className="heroes-list__heroes-name white-color text-uppercase">{hero.name}</h2>
									<div className="heroes-list__heroes-class">
										{hero.classList.map(hero_class => <img key={hero_class._id} alt={hero_class.name} src={hero_class.imgUrl} />)}
									</div>
								</div>
							</div>
						</Link>
					</div>
				)}
			</Draggable>
		)
	}
}

export default Heroes;