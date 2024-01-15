//@ts-expect-error dadas
import imagePlaceholder from '../assets/images/imagePlaceholder.svg';
import moment from 'moment';
export function convertMinutesToHoursAndMinutes(minutes: number): string {
  if (isNaN(minutes) || minutes < 0) {
    return 'Invalid input';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? hours + 'h' : '';
  const minutesText =
    remainingMinutes > 0 ? ' ' + remainingMinutes + 'min' : '';

  return hoursText + minutesText;
}

export function getFullImageUrl(imagePath: string | undefined): string {
  const fullImageUrl = imagePath
    ? process.env.REACT_APP_IMAGE_URL + imagePath
    : imagePlaceholder;
  return fullImageUrl;
}

export function formatDate(inputDate: string | Date): string {
  return moment(inputDate).format('DD/MM/YYYY');
}
