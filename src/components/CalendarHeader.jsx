import { useDateFormatter } from "@react-aria/i18n";
import { Button } from "./Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { VisuallyHidden } from "@react-aria/visually-hidden";

export function CalendarHeader({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
  numVisibleMonths,
}) {
  let monthDateFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    timeZone: state.timeZone,
  });

  const headings = Array.apply(null, Array(numVisibleMonths)).map(
    (_, index) => {
      return (
        <h2
          key={index}
          aria-hidden
          className="flex-1 align-center font-bold text-xl text-center"
        >
          {monthDateFormatter.format(
            state.visibleRange.start
              .add({ months: index })
              .toDate(state.timeZone)
          )}
        </h2>
      );
    }
  );

  return (
    <div className="flex items-center py-4">
      {/* Add a screen reader only description of the entire visible range rather than
       * a separate heading above each month grid. This is placed first in the DOM order
       * so that it is the first thing a touch screen reader user encounters.
       * In addition, VoiceOver on iOS does not announce the aria-label of the grid
       * elements, so the aria-label of the Calendar is included here as well. */}
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>
      <Button {...prevButtonProps}>
        <ChevronLeftIcon className="h-6 w-6" />
      </Button>

      {headings}

      <Button {...nextButtonProps}>
        <ChevronRightIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
