import React, { Component } from 'react';
import './hero.css';
import '../loader/loader.css';

class Hero extends Component {
	state = {
		hero: {},
		isLoading: true
	};

	componentDidMount() {
		fetch(`/heroes/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(({ data }) => {
				console.log(data);
				this.setState( { hero: data, isLoading: false });
			})
	}

	render() {
		const hero = this.state.hero;

		if (this.state.isLoading) {
			return <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		}

		return (
				<div className="hero-block">
					<div className="hero-block__hero-image"><img alt={hero.name} src={`/${hero.imgUrl}`} /></div>
					<div className="hero-block__hero-info">
						<h1 className="hero-block__hero-name white-color">{hero.name.toUpperCase()}</h1>
						<h2 className="hero-block__hero-group white-color">{hero.group.toUpperCase()}</h2>
						<div className="hero-block__hero-classes">
							{hero.classList.map(hero_class => <img alt={hero_class} src={`/${hero_class}`} />)}
						</div>
						<div className="hero-block__hero-detail-info">
							<div className="hero-block__hero-tab white-color">
								<h2>ABILITY</h2>
								<h2>STATS</h2>
							</div>
							<div className="hero-block__hero-ability-info">
								<img alt={hero.ability.name} src={`/${hero.ability.imgUrl}`} />
								<h3 className="white-color">{hero.ability.name.toUpperCase()}</h3>
								<p className="hero-block__ability-description white-color">{hero.ability.description}</p>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

export default Hero;