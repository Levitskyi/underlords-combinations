import React, { Component } from 'react';

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
			<div className="App">
					{this.state.heroes.map(hero =>
		        <div key={hero._id} className="heroes-images">
							<img alt={hero.name} src={hero.imgUrl}/>
							<p className="heroes-name">{hero.name.toUpperCase()}</p>
							<p className="heroes-class">{hero.classList.map(i => i + ' ')}</p>
		        </div>
	      	)}
			</div>
		)
	}
}

export default Heroes;