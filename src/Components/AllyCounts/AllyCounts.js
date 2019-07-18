import React from 'react';
import './allyCounts.css';

const AllyCounts  = ({ count, step, rows, imgUrl, color }) => {
    return (
        <div className="alliance-block">
            <div className={`alliance-img ${count >= step ? 'colored' : ''}`}>
                <img src={imgUrl} alt="alliance"/>
            </div>
            {
                [...Array(rows)].map((ally, i) => {
                    return (
                        <div className="alliance-row" key={i}>
                            {
                                [...Array(step)].map((e, j) => {
                                    const isEmpty = (step * i + j + 1) > count;
                                    return (
                                        <div
                                            key={j}
                                            className={`alliance-row-item ${isEmpty ? 'empty': ''}`}
                                            style={{ backgroundColor: color}}
                                        />
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default AllyCounts;
