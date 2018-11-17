import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import SelectField from '../SelectField/SelectField'
import style from './style.scss'
import optclass from '../internal/OptClass'
import DateHelper from './DateHelper'

/**
 * The DatePicker component.
 */
class DatePicker extends React.Component {
  constructor(props) {
    super(props)
  }

  _dateHelper = this.props.dateHelper ? this.props.dateHelper : DateHelper

  state = {
    year: {
      min: 0,
      value: 0,
      max: 0,
      options: []
    },
    month: {
      min: 0,
      value: 0,
      max: 0,
      options: []
    },
    day: {
      min: 0,
      value: 0,
      max: 0,
      options: []
    },
    value: ''
  }

  static defaultProps = {
    min: { month: '-0', day: '-0', year: '-10' },
    max: { month: '+0', day: '+0', year: '+10' },
    format: 'YYYY-MM-DD',
    placeholder: {
      month: 'Month',
      day: 'Day',
      year: 'Year'
    }
  }

  static propTypes = {
    /**
     * Max date - object with month, day, year.
     */
    max: PropTypes.object,
    /**
     * Min date - object with month, day, year.
     */
    min: PropTypes.object,
    /**
     * Date string.
     */
    value: PropTypes.string,
    /**
     * Date format - any valid Moment.js format string.
     */
    format: PropTypes.string,
    /**
     * A callback function to be called when the value changes.
     */
    changeCallback: PropTypes.func,
    /**
     * Optional CSS class(es) to be used for local styles (string or array of strings)
     */
    optClass: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]),
    /**
     * If true, will display the inputs inline on smaller screens (default 100% width)
     */
    inlineSmallScreen: PropTypes.bool,
    /**
     * Text shown above the date picker.
     */
    label: PropTypes.string,
    /**
     * Whether the select field is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * An object of key/val pairs to set custom placeholders on each field eg: { month: 'M', day: 'D', year: 'Y' }
     */
    placeholder: PropTypes.object
  }

  _initDate = (date, format) => {
    let dateObj = {
      year: {
        min: 0,
        value: 0,
        max: 0,
        options: []
      },
      month: {
        min: 0,
        value: 0,
        max: 0,
        options: []
      },
      day: {
        min: 0,
        value: 0,
        max: 0,
        options: []
      },
      value: ''
    }

    let mDate = date === undefined ? moment.utc() : moment.utc(date, format)

    // selected date values
    dateObj.year.value = this._dateHelper.getYear(mDate)
    dateObj.month.value = this._dateHelper.getMonth(mDate)
    dateObj.day.value = this._dateHelper.getDate(mDate)

    dateObj.value = mDate.format(format)

    // min & max values
    dateObj.year.min = this._getMinOrMax(this.props.min, 'year')
    dateObj.year.max = this._getMinOrMax(this.props.max, 'year')
    dateObj.month.min = this._getMinOrMax(this.props.min, 'month')
    dateObj.month.max = this._getMinOrMax(this.props.max, 'month')
    dateObj.day.min = this._getMinOrMax(this.props.min, 'day')
    dateObj.day.max = this._getMinOrMax(this.props.max, 'day')

    // options
    dateObj.year.options = this._getYears(dateObj.year.min, dateObj.year.max)
    dateObj.month.options = this._getMonths(dateObj)
    dateObj.day.options = this._getDays(dateObj)

    this.setState(dateObj)
  }

  /**
   *
   * @param {Object} minOrMax Example: { month: '-0', day: '-0', year: '-10' } | { month: 'current', day: 'current', year: 'current' }
   * @param {String} type String. Options: ['year', 'month', 'day']
   * @returns {Number} Calculated min or max value for given type
   * @private
   */
  _getMinOrMax = (minOrMax, type) => {
    let momentDate
    let value

    if (minOrMax[type] === 'current') {
      momentDate = moment.utc()
    } else if (minOrMax[type].indexOf('+') !== -1) {
      momentDate = moment.utc().add(Math.abs(minOrMax[type]), type)
    } else if (minOrMax[type].indexOf('-') !== -1) {
      momentDate = moment.utc().subtract(Math.abs(minOrMax[type]), type)
    } else {
      value = minOrMax[type]
    }

    if (momentDate) {
      switch (type) {
        case 'year':
          value = this._dateHelper.getYear(momentDate)
          break
        case 'month':
          value = this._dateHelper.getMonth(momentDate)
          break
        case 'day':
          value = this._dateHelper.getDate(momentDate)
          break
      }
    }

    return parseInt(value)
  }

  /**
   *
   * @param {Integer} min First year
   * @param {Integer} max Last year
   * @returns {Array} Array of objects, ex. [{ value: '2010' }, (...), { value: '2020' }]
   * @private
   */
  _getYears = (min, max) => {
    let yearOptions = []

    for (var i = min; i <= max; i++) {
      yearOptions.push({value: i.toString()})
    }

    return yearOptions
  }

  /**
   *
   * @param {Object} dateObj State object
   * @returns {Array} Array of objects, ex. [{ value: '0', display: 'Jan' }, (...), { value: '11', display: 'Dec' }]
   * @private
   */
  _getMonths = dateObj => {
    let monthOptions = []
    const checkMin = dateObj.year.value === dateObj.year.min
    const checkMax = dateObj.year.value === dateObj.year.max

    let start = checkMin ? dateObj.month.min : 0
    let end = checkMax ? dateObj.month.max + 1 : 12

    for (var i = start; i < end; i++) {
      monthOptions.push({value: i.toString(), display: moment.utc(i + 1, 'MM').format('MMM')})
    }

    // if selected month is greater than max month, change it to max month
    if (checkMax && dateObj.month.value > dateObj.month.max) {
      dateObj.month.value = dateObj.month.max
    }

    // if selected month is lower than min month, change it to min month
    if (checkMin && dateObj.month.value < dateObj.month.min) {
      dateObj.month.value = dateObj.month.min
    }

    return monthOptions
  }

  /**
   *
   * @param {Object} dateObj State object
   * @returns {Array} Array of objects, ex. [{ value: '1' }, (...), { value: '31' }]
   * @private
   */
  _getDays = dateObj => {
    let dayOptions = []

    const checkMin = dateObj.year.value === dateObj.year.min && dateObj.month.value === dateObj.month.min
    const checkMax = dateObj.year.value === dateObj.year.max && dateObj.month.value === dateObj.month.max
    const daysInMonth = moment.utc(dateObj.year.value + '-' + (dateObj.month.value + 1), 'YYYY-M').daysInMonth()

    let start = checkMin ? dateObj.day.min : 1
    let end = checkMax ? dateObj.day.max : daysInMonth

    for (var i = start; i <= end; i++) {
      dayOptions.push({value: i.toString()})
    }

    // if selected day is greater than max day in a month, change it to max day in a month
    if (dateObj.day.value > daysInMonth) {
      dateObj.day.value = daysInMonth
    }

    // if selected day is greater than max day, change it to max day
    if (checkMax && dateObj.day.value > dateObj.day.max) {
      dateObj.day.value = dateObj.day.max
    }

    // if selected day is lower than min day, change it to min day
    if (checkMin && dateObj.day.value < dateObj.day.min) {
      dateObj.day.value = dateObj.day.min
    }

    dateObj.value = this._getValue(dateObj, this.props.format)
    return dayOptions
  }

  /**
   *
   * @param {Object} state State object
   * @param {String} format String with a valid moment.js format, ex. 'YYYY-MM-DD'
   * @returns {String} Date string according to passed format, ex. '2016-09-04'
   * @private
   */
  _getValue = (state, format) => {
    return moment.utc().year(state.year.value).month(state.month.value).date(state.day.value).format(format)
  }

  handleChangeYear = event => {
    let state = this.state

    state.year.value = parseInt(event.target.value)
    state.value = this._getValue(state, this.props.format)

    state.month.options = this._getMonths(state)
    state.day.options = this._getDays(state)
    this.setState({
      year: state.year,
      month: state.month,
      day: state.day,
      value: state.value
    }, () => {
      this.callback(state.value)
    })
  }

  handleChangeMonth = event => {
    let state = this.state

    state.month.value = parseInt(event.target.value)
    state.value = this._getValue(state, this.props.format)
    state.day.options = this._getDays(state)
    this.setState({
      month: state.month,
      day: state.day,
      value: state.value
    }, () => {
      this.callback(state.value)
    })
  }

  handleChangeDay = event => {
    let state = this.state

    state.day.value = parseInt(event.target.value)
    state.value = this._getValue(state, this.props.format)
    this.setState({
      day: state.day,
      value: state.value
    }, () => {
      this.callback(state.value)
    })
  }

  callback = value => {
    if (typeof this.props.changeCallback === 'function') {
      this.props.changeCallback({
        target: {
          name: this.props.name,
          value: value
        }
      })
    }
  }

  componentWillMount = () => {
    this._initDate(this.props.value, this.props.format)
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.props.value) {
      this._initDate(nextProps.value, this.props.format)
    }
  }

  render() {
    const { inlineSmallScreen, label, optClass } = this.props
    const inlineSmallScreenClass = inlineSmallScreen ? style['inline-small-screen'] : null
    const componentClass = optclass(style, ['datepicker-component', inlineSmallScreenClass], optClass)

    return (
      <div className={componentClass}>
        { label && <label>{label}</label> }
        <div className={style['datepicker']}>
          <SelectField
            changeCallback={this.handleChangeMonth}
            disabled={this.props.disabled}
            displayProp='display'
            options={this.state.month.options}
            placeholder={this.props.placeholder.month}
            valueProp='value'
            value={this.state.month.value.toString()}
          />
          <SelectField
            changeCallback={this.handleChangeDay}
            disabled={this.props.disabled}
            displayProp='value'
            options={this.state.day.options}
            placeholder={this.props.placeholder.day}
            valueProp='value'
            value={this.state.day.value.toString()}
          />
          <SelectField
            changeCallback={this.handleChangeYear}
            disabled={this.props.disabled}
            displayProp='value'
            options={this.state.year.options}
            placeholder={this.props.placeholder.year}
            valueProp='value'
            value={this.state.year.value.toString()}
          />
        </div>
      </div>
    )
  }
}

export default DatePicker
