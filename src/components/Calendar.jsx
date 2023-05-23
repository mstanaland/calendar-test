import { useRef, useMemo } from "react";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

export function Calendar({
  numVisibleMonths = 1,
  renderCalendarDay,
  ...props
}) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: numVisibleMonths },
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
    ref
  );

  const grids = Array.apply(null, Array(numVisibleMonths)).map((_, index) => {
    return (
      <CalendarGrid
        key={index}
        state={state}
        offset={{ months: index }}
        renderCalendarDay={renderCalendarDay}
      />
    );
  });

  return (
    <div {...calendarProps} ref={ref} className="inline-block text-gray-800">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
        numVisibleMonths={numVisibleMonths}
      />
      <div className="flex gap-8 items-start">{grids}</div>
    </div>
  );
}
