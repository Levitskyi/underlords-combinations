import React, { Component } from 'react';
import './hero.css';
import '../loader/loader.css';

class Hero extends Component {
    state = {
        hero: {},
        isLoading: true,
        activeTab: "ability"
    };

    toggleButton = (active) => {
        this.setState({
            activeTab: active
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
        const { hero, isLoading, activeTab } = this.state;

        if (isLoading) {
            return <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        }
    
    return (
        <div className="hero-block">
            <div className="hero-block__hero-image">
                <img key={hero._id} alt={hero.name} src={`/${hero.imgUrl}`} />
            </div>
            <div className="hero-block__hero-info">
                <h1 className="hero-block__hero-name white-color text-uppercase">{hero.name}</h1>
                <h2 className="hero-block__hero-group white-color text-uppercase">{hero.group}</h2>
                <div className="hero-block__hero-classes">
                    {hero.classList.map(hero_class => <img key={hero_class._id} alt={hero_class.name} src={`/${hero_class.imgUrl}`} />)}
                </div>
                <div className="hero-block__hero-detail-info">
                    <div className="hero-block__hero-toggle-buttons white-color">
                        <button onClick={() => this.toggleButton("ability")} className={activeTab === "ability" ? "active-button" : null}>ABILITY</button>
                        <button onClick={() => this.toggleButton("stats")} className={activeTab === "stats" ? "active-button" : null}>STATS</button>
                        <button onClick={() => this.toggleButton("test")} className={activeTab === "test" ? "active-button" : null}>TEST</button>
                    </div>
                    { activeTab === "ability" ?
                        (<div className={"hero-block__hero-ability-info"}>
                            <img alt={hero.ability.name} src={`/${hero.ability.imgUrl}`} />
                            <div className="hero-block__ability-description white-color">
                                <h3 className="text-uppercase">{hero.ability.name}</h3>
                                <p>{hero.ability.description}</p>
                            </div>
                        </div>)
                    : activeTab === "stats" ?
                        (<div className={"hero-block__hero-stats-info"} >
                            <h4 className="white-color text-uppercase">Level</h4>
                            <div className="hero-block__stats-description">
                                {Object.keys(hero.stats).map(stat => <p>{stat} {hero.stats[stat].join(" ")}</p>)}
                            </div>
                        </div>)
                    : null
                    }
                </div>
            </div>
      </div>
    );
  }
}

export default Hero;