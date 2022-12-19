import React from 'react';
import { TrendData } from '../../Data/trendsData';
import './TrendsCard.css';

const TrendsCard = () => {
  return (
    <div className='TrendsCard'>
        <h3>Trends for you</h3>
        {TrendData.map((trend,id)=> {
            return(
                <div className='trend'>
                    <span>#{trend.name}</span>
                    <span>{trend.shares}k shares</span>
                </div>
            );
        })}
        <span>Show more</span>
    </div>
  )
}

export default TrendsCard;