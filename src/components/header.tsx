import { ModeToggle } from "@/components/mode-toggle";
import { Sun } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sun className="size-6" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight">
            Atmosphere IQ
          </h1>
          <p className="text-sm text-muted-foreground">
            Live Weather Dashboard
          </p>
        </div>
      </div>

      <ModeToggle />
    </header>
  );
}
