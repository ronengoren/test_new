import React, {Component} from 'react';
import dateFns from "date-fns";
// import Moment from '/moment';
import {connect} from 'react-redux';
import {getEvents} from '../actions/index'; 
import {getEvent} from '../actions/index'; 
import {Link} from 'react-router'; 
import ReactDOM from 'react-dom';

import "../../scss/style.scss";


class Calendar extends Component {
  componentWillMount(){
    this.props.getEvents();  
  } 
  renderEvents(){
    return this.props.events.map((event) => {
      return (
        <ul key={event.id}> 
          <Link to={"events/" + event.id }>
            <h4> Start Date: {event.start_date} </h4> 
            <h4> Start Date: {event.title} </h4> 

          </Link> 
          <Link to="events/new" className="btn btn-warning">
        Create Event
        </Link> 
        </ul> 
      )
    });
  }
  render() {
    return(
        <div className="container">
        <div className="link">
        <div>
      
        </div>
        Event Home Page
        <ul className="list-group">
           {this.renderEvents()}
           </ul>
           </div>
        </div>
      );
    }
 
    
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}

            </span>
            
            
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    
    this.setState({
      selectedDate: day
    });

    console.log(day);
  };
  

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
            <div>
        {this.renderEvents()}
          </div>
          <br></br>
      </div>
    );
  }
  
}


function mapStateToProps(state){
  return {events: state.events.all } 
}


export default connect(mapStateToProps, {getEvents: getEvents})(Calendar); 
