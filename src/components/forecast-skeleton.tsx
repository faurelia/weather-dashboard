import {
  CalendarIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DropletIcon,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

const DAYS = Array.from({ length: 6 }, (_, i) => i);
const HOURLY_CARDS = Array.from({ length: 8 }, (_, i) => i);

export function ForecastSkeleton() {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />
            <h2 className="uppercase">5-day / 3-hour Forecast Breakdown</h2>
          </div>

          <span className="text-sm text-muted-foreground">
            Click a day to expand hourly data
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {DAYS.map((day) => (
          <Collapsible
            key={day}
            className="rounded-md border"
            open={openDay === day}
            onOpenChange={(isOpen) => setOpenDay(isOpen ? day : null)}
          >
            <CollapsibleTrigger className="w-full cursor-pointer rounded-md bg-accent/85 transition-colors hover:bg-accent data-panel-open:rounded-b-none">
              <Item>
                <ItemMedia variant="image" className="size-10">
                  <Skeleton className="size-10 bg-muted-foreground/5" />
                </ItemMedia>

                <ItemContent>
                  <ItemTitle>
                    <Skeleton className="h-4 w-20 bg-muted-foreground/5" />
                  </ItemTitle>
                  <Skeleton className="h-3 w-24 bg-muted-foreground/5" />
                </ItemContent>

                <ItemContent>
                  <ItemTitle>
                    <Skeleton className="h-5 w-12 bg-muted-foreground/5" />
                  </ItemTitle>
                  <Skeleton className="h-3 w-10 bg-muted-foreground/5" />
                </ItemContent>

                <ItemActions>
                  {openDay === day ? (
                    <ChevronUpIcon className="size-4" />
                  ) : (
                    <ChevronDownIcon className="size-4" />
                  )}
                </ItemActions>
              </Item>
            </CollapsibleTrigger>

            <CollapsibleContent className="border-t p-4">
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto lg:grid lg:grid-cols-8 lg:snap-none">
                {HOURLY_CARDS.map((hour) => (
                  <Card
                    key={hour}
                    className="shrink-0 min-w-25 snap-start rounded-md border bg-accent [--card-spacing:--spacing(2)] lg:snap-align-none"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center gap-2">
                        <h3 className="flex items-center gap-1 whitespace-nowrap text-sm text-muted-foreground">
                          <ClockIcon className="size-4" />
                          <Skeleton className="h-4 w-10 bg-muted-foreground/5" />
                        </h3>
                      </CardTitle>

                      <CardContent className="flex flex-col items-center gap-2">
                        <Skeleton className="size-16 bg-muted-foreground/5" />

                        <Skeleton className="h-6 w-16 bg-muted-foreground/5" />

                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <DropletIcon className="size-4 text-sky-400" />
                          <Skeleton className="h-4 w-8 bg-muted-foreground/5" />
                        </div>
                      </CardContent>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}
