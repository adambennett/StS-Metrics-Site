import * as moment from 'moment';

export class DateFormatter {
  static getTimestamp = (type: string) => {
    const date: Date = new Date();
    let timestamp;
    switch (type) {
      case 'Today':
        timestamp = DateFormatter.getDayStartAndEnd(date);
        break;
      case 'Week':
        timestamp = DateFormatter.getWeekStartAndEnd();
        break;
      case 'Month':
        timestamp = DateFormatter.getMonthStartAndEnd(date);
        break;
      case 'Year':
        timestamp = DateFormatter.getYearStartAndEnd(date);
        break;
    }
    return timestamp;
  }

  static formatDate = (date: Date) => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    let hr = new Intl.DateTimeFormat('en', { hour: '2-digit'}).format(date);
    hr = (hr.substring(3, 5) == 'PM') ? (parseInt(hr.substring(0,2)) + 12).toString() : hr.substring(0, 2);
    let mi = new Intl.DateTimeFormat('en', {minute: '2-digit'}).format(date);
    mi = (mi.toString().length == 1) ? '0' + mi : mi;
    let se = new Intl.DateTimeFormat('en', { second: '2-digit'}).format(date);
    se = (se.toString().length == 1) ? '0' + se : se;

    return ye + mo + da + hr + mi + se;
  }

  static isLeapYear = (year) => {
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
  }

  static getDayStartAndEnd = (date: Date) => {
    const tomorrow = moment().add(1, 'days').toDate();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    const daT= new Intl.DateTimeFormat('en', { day: '2-digit' }).format(tomorrow);
    const start = ye + mo + da + '00' + '00' + '00';
    const end = ye + mo + daT + '00' + '00' + '00';
    return {start, end};
  }

  static getMonthStartAndEnd = (date: Date) => {
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const startDay = '01';
    let endDay = '31';
    if (month == '02') {
      endDay = (DateFormatter.isLeapYear(ye)) ? '29' : '28';
    } else if (month == '04' || month == '06' || month == '09' || month == '11') {
      endDay = '30';
    }
    const start = ye + month + startDay + '00' + '00' + '00';
    const end = ye + month + endDay + '12' + '59' + '59';
    return {start, end};
  }

  static getYearStartAndEnd = (date: Date) => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const start = ye + '01' + '01' + '00' + '00' + '00';
    const end = ye + '12' + '31' + '12' + '59' + '59';
    return {start, end};
  }

  static getWeekStartAndEnd = () => {
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek   = moment().endOf('week').toDate();
    const start = DateFormatter.formatDate(startOfWeek);
    const end = DateFormatter.formatDate(endOfWeek);
    return {start, end};
  }
}
