import React from 'react';
import cx from 'clsx';
import { DefaultProps, mergeStyles, useMantineTheme } from '@mantine/core';
import useStyles from './Day.styles';

export type DayStylesNames = keyof ReturnType<typeof useStyles>;

export interface DayProps extends DefaultProps<DayStylesNames> {
  value: Date;
  selected: boolean;
  weekend: boolean;
  outside: boolean;
  onClick?(): void;
  elementRef(ref: HTMLButtonElement): void;
  onKeyDown(date: Date, event: React.KeyboardEvent): void;
  disabled: boolean;
  hasValue: boolean;
  __staticSelector?: string;
}

export function Day({
  className,
  style,
  value,
  selected,
  weekend,
  outside,
  onClick,
  elementRef,
  onKeyDown,
  themeOverride,
  classNames,
  disabled,
  styles,
  hasValue,
  __staticSelector = 'month',
}: DayProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme }, classNames, __staticSelector);
  const _styles = mergeStyles(classes, styles);

  return (
    <button
      type="button"
      onClick={onClick}
      ref={elementRef}
      onKeyDown={(event) => onKeyDown(value, event)}
      tabIndex={hasValue ? (selected ? 0 : -1) : 0}
      style={{
        ..._styles.day,
        ...(outside ? _styles.outside : null),
        ...(weekend ? _styles.weekend : null),
        ...(selected ? _styles.selected : null),
        ...style,
      }}
      disabled={disabled}
      className={cx(
        classes.day,
        {
          [classes.outside]: outside,
          [classes.weekend]: weekend,
          [classes.selected]: selected,
        },
        className
      )}
    >
      {value.getDate()}
    </button>
  );
}

Day.displayName = '@mantine/core/Day';
