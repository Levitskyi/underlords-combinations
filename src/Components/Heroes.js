import React, { Component } from 'react';
import './heroes.css';

class Heroes extends Component {
	state = {
		heroes: []
	};

	componentDidMount() {
		fetch('/heroes')
			.then(res => res.json())
			.then(({ data }) => {
				console.log(data);
				this.setState( { heroes: data });
			})
	}

	render() {
  	return (
  		<div className="heroes-list">
  			{this.state.heroes.map(hero =>
  				<div key={hero._id} className="heroes-list__block">
  					<div className="heroes-list__heroes-images">
  						<img alt={hero.name} src={hero.imgUrl} />
						</div>
  					<h2 className="heroes-list__heroes-name white-color">{hero.name.toUpperCase()}</h2>
  					<div className="heroes-list__heroes-class">
  						{hero.classList.map(hero_class => <img key={hero_class._id} alt={hero_class.name} src={hero_class.imgUrl} />)}
						</div>
  				</div>
  			)}
  		</div>
  	)
  }
}

export default Heroes;