export interface LocaleData {
  dayNames: string[];
  dayShortNames: string[];
  dayMinNames: string[];
  monthNames: string[];
  monthShortNames: string[];
}

export interface Token {
  literal: boolean;
  value: string;
}

export function padZero(num: number, length = 2) {
  return num.toString().padStart(length, '0');
}

export function getLocalizedNames(locale: string) {
  const formatter = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, options);

  const dayNames = Array.from({ length: 7 }, (_, i) =>
    formatter({ weekday: 'long' }).format(
      new Date(Date.UTC(2024, 1, i + 1)),
    ),
  );
  const dayShortNames = Array.from({ length: 7 }, (_, i) =>
    formatter({ weekday: 'short' }).format(
      new Date(Date.UTC(2024, 1, i + 1)),
    ),
  );
  const dayMinNames = Array.from({ length: 7 }, (_, i) =>
    formatter({ weekday: 'narrow' }).format(
      new Date(Date.UTC(2024, 1, i + 1)),
    ),
  );

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    formatter({ month: 'long' }).format(
      new Date(Date.UTC(2024, i, 1)),
    ),
  );
  const monthShortNames = Array.from(
    { length: 12 },
    (_, i) =>
      formatter({ month: 'short' }).format(
        new Date(Date.UTC(2024, i, 1)),
      ),
  );

  return {
    dayNames,
    dayShortNames,
    dayMinNames,
    monthNames,
    monthShortNames,
  };
}

function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function tokenizeFormat(format: string) {
  const regex =
    /(\\.|YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|ZZ|Z|A|a|\[.*?\])/g;
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(format)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        literal: true,
        value: format.slice(lastIndex, match.index),
      });
    }
    tokens.push({ literal: false, value: match[0] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < format.length) {
    tokens.push({
      literal: true,
      value: format.slice(lastIndex),
    });
  }

  return tokens;
}

function parseMatches(
  matches: RegExpMatchArray,
  tokens: Token[],
  localeData: LocaleData,
) {
  const { monthNames, monthShortNames } = localeData;

  let year = 1970;
  let month = 0;
  let day = 1;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let milliseconds = 0;
  let isPM = false;
  let timezoneOffsetMinutes: number | null = null;

  let matchIndex = 1; // matches[0] is the full match

  tokens.forEach((token) => {
    if (token.literal) {
      // Literals do not consume matches
      return;
    }

    const value = matches[matchIndex++];
    switch (token.value) {
      case 'YYYY':
        year = parseInt(value, 10);
        break;
      case 'YY':
        year = 2000 + parseInt(value, 10);
        break;
      case 'MMMM':
        month = monthNames.indexOf(value);
        break;
      case 'MMM':
        month = monthShortNames.indexOf(value);
        break;
      case 'MM':
      case 'M':
        month = parseInt(value, 10) - 1;
        break;
      case 'DD':
      case 'D':
        day = parseInt(value, 10);
        break;
      case 'HH':
      case 'H':
        hours = parseInt(value, 10);
        break;
      case 'hh':
      case 'h':
        hours = parseInt(value, 10);
        break;
      case 'mm':
      case 'm':
        minutes = parseInt(value, 10);
        break;
      case 'ss':
      case 's':
        seconds = parseInt(value, 10);
        break;
      case 'SSS':
        milliseconds = parseInt(value, 10);
        break;
      case 'A':
      case 'a':
        isPM = value.toLowerCase() === 'pm';
        break;
      case 'Z':
      case 'ZZ':
        // Parse timezone offset
        timezoneOffsetMinutes = parseTimezoneOffset(value);
        break;
      default:
        break;
    }
  });

  // Adjust hours for AM/PM
  if (
    tokens.some((t) => t.value === 'A' || t.value === 'a')
  ) {
    if (isPM && hours < 12) {
      hours += 12;
    }
    if (!isPM && hours === 12) {
      hours = 0;
    }
  }

  // Create the date object in UTC
  let date = new Date(
    Date.UTC(
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds,
    ),
  );

  // Adjust for timezone offset if provided
  if (timezoneOffsetMinutes !== null) {
    date = new Date(
      date.getTime() - timezoneOffsetMinutes * 60000,
    );
  }

  return date;
}

function parseTimezoneOffset(value: string) {
  const sign = value[0] === '+' ? 1 : -1;

  let hours, minutes;
  if (value.includes(':')) {
    // Format: +HH:mm
    [hours, minutes] = value
      .slice(1)
      .split(':')
      .map(Number);
  } else {
    // Format: +HHmm
    hours = Number(value.slice(1, 3));
    minutes = Number(value.slice(3, 5));
  }
  return sign * (hours * 60 + minutes);
}

function buildRegexPattern(
  tokens: Token[],
  localeData: LocaleData,
) {
  const {
    dayNames,
    dayShortNames,
    dayMinNames,
    monthNames,
    monthShortNames,
  } = localeData;

  const tokenPatterns: Record<string, string> = {
    YYYY: '(\\d{4})',
    YY: '(\\d{2})',
    MMMM: '(' + monthNames.map(escapeRegex).join('|') + ')',
    MMM:
      '(' +
      monthShortNames.map(escapeRegex).join('|') +
      ')',
    MM: '(\\d{2})',
    M: '(\\d{1,2})',
    DD: '(\\d{2})',
    D: '(\\d{1,2})',
    dddd: '(' + dayNames.map(escapeRegex).join('|') + ')',
    ddd:
      '(' + dayShortNames.map(escapeRegex).join('|') + ')',
    dd: '(' + dayMinNames.map(escapeRegex).join('|') + ')',
    d: '(\\d{1})',
    HH: '(\\d{2})',
    H: '(\\d{1,2})',
    hh: '(\\d{2})',
    h: '(\\d{1,2})',
    mm: '(\\d{2})',
    m: '(\\d{1,2})',
    ss: '(\\d{2})',
    s: '(\\d{1,2})',
    SSS: '(\\d{3})',
    A: '(AM|PM)',
    a: '(am|pm)',
    Z: '([+-]\\d{2}:\\d{2})',
    ZZ: '([+-]\\d{4})',
    // Add other tokens as needed
  };

  let pattern = '';

  tokens.forEach((token: Token) => {
    if (token.literal) {
      pattern += escapeRegex(token.value);
    } else if (tokenPatterns[token.value]) {
      pattern += tokenPatterns[token.value];
    } else {
      // Handle unknown tokens or throw an error
      throw new Error(`Unknown token: ${token.value}`);
    }
  });

  return new RegExp('^' + pattern + '$', 'i');
}

export default function () {
  function from(
    date: Date,
    format: string,
    locale = 'en-US',
  ) {
    const {
      dayNames,
      dayShortNames,
      dayMinNames,
      monthNames,
      monthShortNames,
    } = getLocalizedNames(locale);

    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const timezoneOffset = -date.getTimezoneOffset();

    // Determine AM/PM
    const isPM = hours >= 12;
    const hour12 = hours % 12 || 12;

    const tokens: Record<string, string | number> = {
      YY: padZero(year % 100),
      YYYY: year,
      M: month + 1,
      MM: padZero(month + 1),
      MMM: monthShortNames[month],
      MMMM: monthNames[month],
      D: day,
      DD: padZero(day),
      d: dayOfWeek,
      dd: dayMinNames[dayOfWeek],
      ddd: dayShortNames[dayOfWeek],
      dddd: dayNames[dayOfWeek],
      H: hours,
      HH: padZero(hours),
      h: hour12,
      hh: padZero(hour12),
      m: minutes,
      mm: padZero(minutes),
      s: seconds,
      ss: padZero(seconds),
      SSS: padZero(milliseconds, 3),
      Z:
        (timezoneOffset >= 0 ? '+' : '-') +
        padZero(Math.floor(Math.abs(timezoneOffset) / 60)) +
        ':' +
        padZero(Math.abs(timezoneOffset) % 60),
      ZZ:
        (timezoneOffset >= 0 ? '+' : '-') +
        padZero(Math.floor(Math.abs(timezoneOffset) / 60)) +
        padZero(Math.abs(timezoneOffset) % 60),
      A: isPM ? 'PM' : 'AM',
      a: isPM ? 'pm' : 'am',
    };
    return format.replace(
      /YYYY|YY|MMMM|MMM|MM|M|DDD|DD|D|dddd|ddd|dd|d|HH|H|hh|h|mm|m|ss|s|SSS|ZZ|Z|A|a/g,
      (match) => String(tokens[match]),
    );
  }

  function to(
    dateString: string,
    format: string,
    locale = 'en-US',
  ) {
    const localeData = getLocalizedNames(locale);
    const tokens = tokenizeFormat(format);
    const regex = buildRegexPattern(tokens, localeData);

    const matches = dateString.match(regex);

    if (!matches) {
      throw new Error('Date string does not match format');
    }

    return parseMatches(matches, tokens, localeData);
  }

  function isValid(dateString: string, format?: string) {
    try {
      const dateObject = format
        ? //@ts-ignore
          this.to(dateString, format)
        : new Date(dateString);
      if (
        dateObject instanceof Date &&
        !isNaN(dateObject.getTime())
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return { from, to, isValid };
}
