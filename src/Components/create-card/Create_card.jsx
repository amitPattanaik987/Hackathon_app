import React from 'react';
import "./Create_card.css";
import tick from "../../assets/tick_symbol.png";
import Countdown_timer from '../countdown_timer/Countdown_timer';
import 'bootstrap/dist/css/bootstrap.css';

export default function Create_card(props) {
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = new Date(date).toLocaleString('en-US', options);
    return formattedDate.replace(/(\d+)(?=\s)/, (match) => `${match}${getOrdinalSuffix(match)}`); 
  };


  const getOrdinalSuffix = (number) => {
    const intNumber = parseInt(number);
    if (intNumber % 10 === 1 && intNumber % 100 !== 11) return 'st';
    if (intNumber % 10 === 2 && intNumber % 100 !== 12) return 'nd';
    if (intNumber % 10 === 3 && intNumber % 100 !== 13) return 'rd';
    return 'th';
  };


  const statusText = () => {
    switch (props.status) {
      case 'Active':
        return 'Ends in';
      case 'Upcoming':
        return 'Starts in';
      case 'Past':
        return 'Ends on';
      default:
        return '';
    }
  };

  const getStatusStyles = () => {
    switch (props.status) {
      case 'Active':
        return {
          backgroundColor: '#44924C3D',
          color: 'green',
        };
      case 'Past':
        return {
          backgroundColor: '#FF3C002B',
          color: 'red',
        };
      default:
        return {
          backgroundColor: '#f2c94c40',
          color: 'black',
        };
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <div className='card'>
      <img src={props.image} alt={props.name} />
      <div className='text-area'>
        <p className='state' style={statusStyles}>{props.status}</p>
        <p style={{ fontWeight: 600 }}>{props.name}</p>
        <p>{statusText()}</p>
        {props.status === 'Past' ? (
          <p>{formatDate(props.endDate)}</p>
        ) : (
          <Countdown_timer targetDate={props.endDate} />
        )}
        <button className='btn btn-success participate'>
          <img src={tick} alt="" />Participate Now
        </button>
      </div>
    </div>
  );
}
