import moment from 'moment/min/moment-with-locales';
moment.locale("ru");

function getSinceDateTime(date: string): string {

  const timestamp = (moment().valueOf() - moment(date).valueOf());
  const seconds = Math.floor(moment.duration(timestamp).asSeconds())
  const humanizeDateTime = moment.duration(seconds, 'seconds').humanize();

  let sinceDateTime = humanizeDateTime + ' назад';

  if (sinceDateTime === 'несколько секунд назад') sinceDateTime = 'Только что';

  const checkValidDateTime = humanizeDateTime.split(' ');
  
  if (checkValidDateTime.length < 2) sinceDateTime = '1 ' + sinceDateTime;

  return sinceDateTime;
}

export default getSinceDateTime;