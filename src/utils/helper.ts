import moment from 'moment';

export const $ = (query: string) =>
  document.querySelector(query);
export const $$ = (query: string) =>
  document.querySelectorAll(query);

export function isObject(value: any) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

export function objectToQueryString(obj: any) {
  const params = new URLSearchParams();

  // Iterate over each key-value pair in the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Add each key-value pair to the URLSearchParams object
      if (Array.isArray(obj[key])) {
        if (obj[key].length === 1) {
          params.append(`${key}[0]`, obj[key][0]);
        } else {
          for (let i = 0; i < obj[key].length; i++) {
            params.append(`${key}[${i}]`, obj[key][i]);
          }
        }
      } else {
        params.append(key, obj[key]);
      }
    }
  }

  // Return the query string
  return params.toString();
}

export function displayNumber(value?: number) {
  if (!value) return '0';
  return new Intl.NumberFormat('en-US').format(value);
}

export function groupBy(array: Array<any>, key: string) {
  // Return the end result
  return array.reduce((result, currentValue) => {
    (result[currentValue?.[key]] =
      result?.[currentValue?.[key]] || []).push(
      currentValue,
    );
    return result;
  }, {});
}

export function focusElement(query: string) {
  try {
    if (!query) return false;
    const element: Element | null =
      document.querySelector(query);
    const focusElement = element as HTMLInputElement;
    focusElement?.focus();
  } catch (error) {
    console.warn(error);
  }
}

export function getErrorMessage(error: any) {
  if (error?.response?.data?.errors) {
    const errorValues = Object.values(
      error?.response?.data?.errors,
    );
    if (errorValues.length > 0) {
      return errorValues.join(' ');
    }
  }
  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }
  if (error?.response?.data) {
    const errorValues = Object.values(
      error?.response?.data,
    );
    if (errorValues.length > 0) {
      return errorValues.join(' ');
    }
  }
  return 'An error occur!';
}

export const scrollToTop = () => {
  $('#main-layout')?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export function checkMultiple(value: number) {
  if (value > 1) {
    return 's';
  }
  return '';
}

export function timeFromNow(date: string | undefined) {
  if (!date) return;
  const startStr = date.split('.')[0].replace('T', ' ');
  const endStr = moment()
    .utc()
    .format('YYYY-MM-DD HH:mm:ss');

  const timeEnd = moment(endStr, 'YYYY-MM-DD HH:mm:ss');
  const timeStart = moment(startStr, 'YYYY-MM-DD HH:mm');
  const diffSeconds = timeEnd.diff(timeStart, 'seconds');
  if (diffSeconds >= 86400) {
    return (
      String(Math.floor(diffSeconds / 86400)) +
      ' day' +
      checkMultiple(Math.floor(diffSeconds / 86400))
    );
  }
  if (diffSeconds >= 3600 && diffSeconds < 86400) {
    return (
      String(Math.floor(diffSeconds / 3600)) +
      ' hour' +
      checkMultiple(Math.floor(diffSeconds / 3600))
    );
  }
  if (diffSeconds > 60 && diffSeconds < 3600) {
    return (
      String(Math.floor(diffSeconds / 60)) +
      ' minute' +
      checkMultiple(Math.floor(diffSeconds / 60))
    );
  }
  if (diffSeconds < 60) {
    return (
      String(Math.floor(diffSeconds)) +
      ' second' +
      checkMultiple(Math.floor(diffSeconds))
    );
  }
}

export const displayStatus = (status: string) => {
  return [
    String(status.slice(0, 1)).toLocaleUpperCase(),
    status.slice(1, status.length),
  ]
    .join('')
    .replaceAll('_', ' ');
};

export function moneyFormat(value: any) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  if (!value) return '$0.00';
  return formatter.format(value);
}

export const cleanObject = (obj: {
  [key: string]: any;
}) => {
  for (const key in obj) {
    if (
      obj[key] === null ||
      obj[key] === undefined ||
      obj[key] === ''
    ) {
      delete obj[key];
    }
  }
  return obj;
};
