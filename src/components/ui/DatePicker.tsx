import {
  DateFormatter,
  DayPicker,
  SelectSingleEventHandler,
} from 'react-day-picker';
import {
  SlInput,
  SlIcon,
} from '@shoelace-style/shoelace/dist/react';
import { useState, useEffect, useRef } from 'react';
import { enUS, vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

import { format, isValid, parse } from 'date-fns';

import autoAnimate from '@formkit/auto-animate';

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
      <span role="img" aria-label={season}>
        {seasonEmoji[season]}
      </span>{' '}
      {format(month, 'LLLL', { locale: options?.locale })}
    </>
  );
};

export interface IDatePickerProps {
  value?: string | Date;
  onChange?: (value?: string | Date) => void;
  size?: 'small' | 'medium' | 'large';
  clearable?: boolean;
}

function DatePicker(props: IDatePickerProps) {
  const [show, setShow] = useState(false);
  const element = useRef<HTMLSpanElement>(null);
  const [selected, setSelected] = useState<
    Date | undefined
  >();
  const { i18n } = useTranslation();
  const [inputValue, setInputValue] = useState<string>();

  const handleInputChange = (e: Event) => {
    setInputValue(
      (e.currentTarget as HTMLInputElement).value,
    );
    const date = parse(
      (e.currentTarget as HTMLInputElement).value,
      'y-MM-dd',
      new Date(),
    );
    if (isValid(date)) {
      setSelected(date);
      return props.onChange?.(
        (e.currentTarget as HTMLInputElement).value,
      );
    } else {
      setSelected(undefined);
      return props.onChange?.(undefined);
    }
  };
  const handleDaySelect: SelectSingleEventHandler = (
    date,
  ) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, 'y-MM-dd'));
      setShow(false);

      return props.onChange?.(format(date, 'y-MM-dd'));
    } else {
      setInputValue('');
      setShow(false);

      return props.onChange?.(undefined);
    }
  };

  useEffect(() => {
    element.current && autoAnimate(element.current);
  }, [element]);

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

  useEffect(() => {
    if (typeof props?.value === 'string') {
      setInputValue(props?.value);
      setSelected(parse(props?.value, 'y-MM-dd', new Date()));
    } else {
      setInputValue(
        format(props?.value || new Date(), 'y-MM-dd'),
      );
      setSelected(props?.value)
    }
  }, [props.value]);
  return (
    <span className="relative select-none" ref={element}>
      <SlInput
        placeholder={format(new Date(), 'y-MM-dd')}
        onSlFocus={() => setShow(true)}
        onSlChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleInputChange(e);
        }}
        onSlBlur={() => setShow(false)}
        value={inputValue}
        autocomplete="off"
        size={props?.size}
        clearable={props?.clearable}
        className="input"
      >
        <SlIcon
          name="calendar"
          slot="prefix"
          className="text-[var(--sl-color-neutral-500)] w-5 h-5"
        ></SlIcon>
      </SlInput>
      {show && (
        <span className="absolute top-[calc(100%+8px)] left-0 bg-[var(--sl-color-neutral-100)]  rounded-lg shadow-lg z-10">
          <DayPicker
            {...props}
            required
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            showOutsideDays
            fixedWeeks
            showWeekNumber
            ISOWeek
            locale={i18n.language === 'vi-VN' ? vi : enUS}
            formatters={{ formatCaption }}
          />
        </span>
      )}
    </span>
  );
}

export { DatePicker };
