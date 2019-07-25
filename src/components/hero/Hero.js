import React, { Component } from 'react';
import './hero.css';
import '../loader/loader.css';

class Hero extends Component {
  state = {
    hero: {},
    isLoading: true,
    isActive: true
  };

  toggleButton() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  componentDidMount() {
    fetch(`/heroes/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(({ data }) => {
        console.log(data);
        this.setState( { hero: data, isLoading: false});
      })
  }

  render() {
    const hero = this.state.hero;
    const visibleContent = this.state.isActive ? "" : " hidden-content";
    const hiddenContent = this.state.isActive ? " hidden-content" : "";
    const isActiveButton = this.state.isActive ? "active-button" : "";
    const notActiveButton = this.state.isActive ? "" : "active-button";

    if (this.state.isLoading) {
      return <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }

    return (
        <div className="hero-block">
          <div className="hero-block__hero-image">
          	<img key={hero._id} alt={hero.name} src={`/${hero.imgUrl}`} />
          </div>
          <div className="hero-block__hero-info">
            <h1 className="hero-block__hero-name white-color">{hero.name.toUpperCase()}</h1>
            <h2 className="hero-block__hero-group white-color">{hero.group.toUpperCase()}</h2>
            <div className="hero-block__hero-classes">
              {hero.classList.map(hero_class => <img key={hero_class._id} alt={hero_class.name} src={`/${hero_class.imgUrl}`} />)}
            </div>
            <div className="hero-block__hero-detail-info">
              <div className="hero-block__hero-toggle-buttons white-color">
                <button onClick={this.toggleButton.bind(this)} className={isActiveButton} disabled={this.state.isActive ? true : false}>ABILITY</button>
                <button onClick={this.toggleButton.bind(this)} className={notActiveButton} disabled={this.state.isActive ? false : true}>STATS</button>
              </div>
              <div className={"hero-block__hero-ability-info" + (visibleContent)}>
                <img alt={hero.ability.name} src={`/${hero.ability.imgUrl}`} />
                <div className="hero-block__ability-description white-color">
                  <h3>{hero.ability.name.toUpperCase()}</h3>
                  <p>{hero.ability.description}</p>
                </div>
              </div>
              <div className={"hero-block__hero-stats-info" + (hiddenContent)} >
                <h4 className="white-color text-uppercase">Level</h4>
                <div className="hero-block__stats-description">
                  {Object.keys(hero.stats).map(stat => <p>{stat} {hero.stats[stat].join(' ')}</p>)}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Hero;