import React, { PropTypes, Component } from 'react';
import style from './AddForm.scss';
const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const arrayOfWorkingHours = () => {
  const hoursInDay = 24;
  const rangeThirthyMinutesInDay = hoursInDay * 2;
  const arrayOfHoursWithMinutes = [];
  for (let i = 0; i < rangeThirthyMinutesInDay; i++) {
    const rest = i % 2;
    const hours = `${i < 20 ? 0 : ''}${Math.floor(i / 2)}`;
    const minutes = rest > 0 ? '30' : '00';
    arrayOfHoursWithMinutes.push({
      value: `${hours}${minutes}`,
      text: `${hours}:${minutes}`,
    });
  }
  return arrayOfHoursWithMinutes;
};
class WorkingHours extends Component {
  static propTypes = {
    field: PropTypes.array,
    saveHandle: PropTypes.func,
  }
  componentWillMount() {
    const { length } = this.props.field;
    if (length > 0) return;
    days.forEach(day => this.props.field.addField({
      start: '0000',
      end: '0000',
      day,
    }));
  }
  render() {
    return (
      <div className={style.workContainer}>
        {this.props.field.map(({ day, end, start }, index) => (
          <div key={index} className={style.oneDay}>
            <div className={style.dayName}>{day.value}</div>
            <select className={style.select} {...start}>
              {arrayOfWorkingHours().map(({ value, text }, indexA) => (
                <option value={value} key={indexA}>
                  {text}
                </option>
              ))}
            </select>
            <select className={style.select} {...end}>
              {arrayOfWorkingHours().map(({ value, text }, indexB) => (
                <option value={value} key={indexB}>
                  {text}
                </option>
              ))}
            </select>
          </div>
        ))}
        <input
          type="button"
          value="Save working hours"
          className={style.saveWorkingHours}
          onClick={this.props.saveHandle} />
      </div>
    );
  }
}


export default WorkingHours;
