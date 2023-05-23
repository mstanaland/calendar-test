import { useRef } from "react";
import { useCalendarCell } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { isSameDay, getDayOfWeek, isSameMonth } from "@internationalized/date";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import cx from "clsx";

export function CalendarCell({ state, date, currentMonth, renderCalendarDay }) {
  let ref = useRef();
  let { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  let isOutsideMonth = !isSameMonth(currentMonth, date);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  let isSelectionStart = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected;
  let isSelectionEnd = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected;
  const isCellUnavailable = state.isCellUnavailable(date); // result of isDateUnavailable prop
  const isInvalid = state.isCellUnavailable(date); //  date is invalid according to the minValue and maxValue props

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  // let { locale } = useLocale();
  // let dayOfWeek = getDayOfWeek(date, locale);
  // let isRoundedLeft =
  //   isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  // let isRoundedRight =
  //   isSelected &&
  //   (isSelectionEnd ||
  //     dayOfWeek === 6 ||
  //     date.day === date.calendar.getDaysInMonth(date));

  let { focusProps, isFocusVisible } = useFocusRing();

  const hasRenderCalendarDay = Boolean(renderCalendarDay);
  let renderCalendarDayJsx = null;
  let renderCalendarDayClassName = "";
  if (hasRenderCalendarDay) {
    const { jsx, className } = renderCalendarDay(date);
    renderCalendarDayJsx = jsx;
    renderCalendarDayClassName = className;
  }

  return (
    <td
      {...cellProps}
      className={cx("calendar-cell relative w-10 h-10", {
        "z-10": isFocusVisible || isSelected,
      })}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        id={date.toString()}
        ref={ref}
        hidden={isOutsideMonth}
        className={cx("relative w-10 h-10 outline-none group", {
          "bg-violet-300": isSelected,
          disabled: isDisabled,
        })}
      >
        <div
          style={{ height: "41px", width: "41px" }}
          className={cx(
            "-inset-px flex flex-col justify-between p-1 relative",
            {
              "text-gray-400": isDisabled,
              "cursor-pointer": !isDisabled,
              "cursor-default": isDisabled,
              "ring-2 group-focus:z-2 ring-violet-600 ring-offset-2":
                isFocusVisible && !isDisabled,
              // "bg-violet-600 text-white hover:bg-violet-700":
              //   isSelectionStart || isSelectionEnd,
              "hover:bg-violet-400":
                isSelected && !(isSelectionStart || isSelectionEnd),
              "hover:bg-violet-100": !isSelected && !isDisabled,
              selected: isSelected,
              [`${renderCalendarDayClassName}`]: !!renderCalendarDayClassName,
              "border border-gray-300": !hasRenderCalendarDay,
            }
          )}
        >
          <div className="text-xs leading-none grow-0">{formattedDate}</div>
          <div className="grow flex justify-center items-center">
            {renderCalendarDayJsx}
          </div>
        </div>
      </div>
    </td>
  );
}
