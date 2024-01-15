import {
  convertMinutesToHoursAndMinutes,
  getFullImageUrl,
  formatDate,
} from './utilFunctions';

describe('convertMinutesToHoursAndMinutes', () => {
  it('should convert minutes to hours and minutes format', () => {
    expect(convertMinutesToHoursAndMinutes(90)).toEqual('1h 30min');
    expect(convertMinutesToHoursAndMinutes(60)).toEqual('1h');
    expect(convertMinutesToHoursAndMinutes(45)).toEqual(' 45min');
  });

  it('should handle invalid input', () => {
    expect(convertMinutesToHoursAndMinutes(-1)).toEqual('Invalid input');
    expect(convertMinutesToHoursAndMinutes(NaN)).toEqual('Invalid input');
  });
});

describe('getFullImageUrl', () => {
  it('should return full image URL', () => {
    const imagePath = 'example.jpg';
    process.env.REACT_APP_IMAGE_URL = 'https://example.com/';
    expect(getFullImageUrl(imagePath)).toEqual(
      'https://example.com/example.jpg'
    );
  });

  it('should return image placeholder if imagePath is falsy', () => {
    process.env.REACT_APP_IMAGE_URL = 'https://example.com/';
    expect(getFullImageUrl('any-image-path')).toEqual(
      'https://example.com/any-image-path'
    );
  });
});

describe('formatDate', () => {
  it('should format date in DD/MM/YYYY format', () => {
    const inputDate = '2024-01-14';
    expect(formatDate(inputDate)).toEqual('14/01/2024');
  });
});
