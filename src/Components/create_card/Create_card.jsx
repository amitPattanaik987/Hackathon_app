import React from 'react';
import "./Create_card.css";
import tick from "../../assets/tick_symbol.png";
import Countdown_timer from '../countdown_timer/Countdown_timer';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

export default function Create_card(props) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const formattedDate = dateObj.toLocaleString('en-US', options);
    return formattedDate.replace(day.toString(), `${day}${getOrdinalSuffix(day)}`);
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

  const handleParticipateClick = () => {
    // Navigate to the Problem_statements page with the hackathon name as a parameter
    navigate(`/problem/${props.name}`);
  };

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

        <button className='btn btn-success participate' onClick={handleParticipateClick}>
          <img src={tick} alt="" />
          <p>Participate Now</p>
        </button>
      </div>
    </div>
  );
}
