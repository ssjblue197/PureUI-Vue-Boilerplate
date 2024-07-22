import {
  SlInput,
  SlIcon,
} from '@shoelace-style/shoelace/dist/react';
import { useState, useEffect, useRef } from 'react';
import { enUS, vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

import {
  format,
  isValid,
  parse,
  isAfter,
  isBefore,
} from 'date-fns';
import {
  DateFormatter,
  DayPicker,
  SelectRangeEventHandler,
  DateRange,
} from 'react-day-picker';

import autoAnimate from '@formkit/auto-animate';
import { isMobile } from 'react-device-detect';
import { twMerge } from 'tailwind-merge';

const seasonEmoji: Record<string, string> = {
  winter: '⛄️',
  spring: '🌸',
  summer: '🌻',
  autumn: '🍂',
};

const getSeason = (month: Date): string => {
  const monthNumber = month.getMonth();
  if (monthNumber >= 0 && monthNumber < 3) return 'winter';
  if (monthNumber >= 3 && monthNumber < 6) return 'spring';
  if (monthNumber >= 6 && monthNumber < 9) return 'summer';
  else return 'autumn';
};

const formatCaption: DateFormatter = (month, options) => {
  const season = getSeason(month);
  return (
    <>
      <span role="img" aria-label={season} className="mr-2">
        {seasonEmoji[season]}
      </span>{' '}
      {format(month, 'LLLL', { locale: options?.locale })}
    </>
  );
};

export interface IDateRangePickerProps {
  value?: DateRange;
  onChange?: (event?: DateRange) => void;
  inputClasses?: string;
}

function DateRangePicker(props: IDateRangePickerProps) {
  const [show, setShow] = useState(false);
  const element = useRef<HTMLSpanElement>(null);
  const { i18n } = useTranslation();

  const [selectedRange, setSelectedRange] =
    useState<DateRange>(() => {
      if (props.value) {
        return props.value;
      }
      return { from: undefined, to: undefined };
    });
  const [fromValue, setFromValue] = useState<string>(() => {
    if (props.value?.from) {
      return format(props.value.from, 'y-MM-dd');
    }
    return '';
  });
  const [toValue, setToValue] = useState<string>(() => {
    if (props.value?.to) {
      return format(props.value.to, 'y-MM-dd');
    }
    return '';
  });

  useEffect(() => {
    element.current && autoAnimate(element.current);
  }, [element]);

  const handleFromChange = (e: Event) => {
    setFromValue((e.target as HTMLInputElement).value);
    const date = parse(
      (e.target as HTMLInputElement).value,
      'y-MM-dd',
      new Date(),
    );
    if (!isValid(date)) {
      setSelectedRange({
        from: undefined,
        to: selectedRange.to,
      });
      return props.onChange?.({
        from: undefined,
        to: undefined,
      });
    }
    if (
      selectedRange?.to &&
      isAfter(date, selectedRange.to)
    ) {
      setSelectedRange({
        from: selectedRange.to,
        to: date,
      });
    } else {
      setSelectedRange({
        from: date,
        to: selectedRange?.to,
      });
    }
    props.onChange?.(selectedRange);
  };

  const handleToChange = (e: Event) => {
    setToValue((e.target as HTMLInputElement).value);
    const date = parse(
      (e.target as HTMLInputElement).value,
      'y-MM-dd',
      new Date(),
    );

    if (!isValid(date)) {
      setSelectedRange({
        from: selectedRange?.from,
        to: undefined,
      });
      return props.onChange?.({
        from: undefined,
        to: undefined,
      });
    }
    if (
      selectedRange?.from &&
      isBefore(date, selectedRange.from)
    ) {
      setSelectedRange({
        from: date,
        to: selectedRange.from,
      });
    } else {
      setSelectedRange({
        from: selectedRange?.from,
        to: date,
      });
    }
    props.onChange?.(selectedRange);
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    range && setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
    props.onChange?.(range);
  };

  useEffect(() => {
    window.document.addEventListener('click', (e) => {
      const isClickInside = element.current?.contains(
        e.target as HTMLElement,
      );
      setShow(!!isClickInside);
    });
    return window.document.removeEventListener(
      'click',
      () => {},
    );
  }, []);
  return (
    <span className="relative select-none" ref={element}>
      <div className="flex items-center gap-2 w-full relative">
        <SlInput
          placeholder={'YYYY-MM-DD'}
          onSlFocus={() => setShow(true)}
          value={fromValue}
          onSlChange={handleFromChange}
          autocomplete="off"
          className={
            twMerge('w-[calc(50vw-2rem)] sm:w-[calc(50%-2rem)] sm:max-w-48',
            props?.inputClasses
            )
          }
        >
          <SlIcon
            name="calendar"
            slot="prefix"
            className="text-[var(--sl-color-neutral-500)] w-5 h-5"
          ></SlIcon>
        </SlInput>
        -
        <SlInput
          placeholder={'YYYY-MM-DD'}
          onSlFocus={() => setShow(true)}
          value={toValue}
          onSlChange={handleToChange}
          autocomplete="off"
          className={
            twMerge('w-[calc(50vw-2rem)] sm:w-[calc(50%-2rem)] sm:max-w-48',
            props?.inputClasses
            )
          }
        ></SlInput>
      </div>
      {show && (
        <span className="absolute top-[calc(100%+8px)] left-0 bg-[var(--sl-color-neutral-100)]  rounded-lg shadow-lg z-10">
          {isMobile ? (
            <DayPicker
              {...props}
              mode="range"
              numberOfMonths={1}
              pagedNavigation
              selected={selectedRange}
              onSelect={handleRangeSelect}
              showOutsideDays
              fixedWeeks
              showWeekNumber
              ISOWeek
              locale={i18n.language === 'vi-VN' ? vi : enUS}
              formatters={{ formatCaption }}
            />
          ) : (
            <DayPicker
              {...props}
              mode="range"
              numberOfMonths={2}
              pagedNavigation
              selected={selectedRange}
              onSelect={handleRangeSelect}
              showOutsideDays
              fixedWeeks
              showWeekNumber
              ISOWeek
              locale={i18n.language === 'vi-VN' ? vi : enUS}
              formatters={{ formatCaption }}
            />
          )}
        </span>
      )}
    </span>
  );
}

export { DateRangePicker };
