import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

type Props = {
  onSearch: (city: string) => void;
};

export function SearchInput({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const city = search.trim();

    if (!city) return;

    onSearch(city);
    setSearch("");
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <Field orientation="horizontal" className="rounded-md">
        <InputGroup className="h-12 px-2 rounded-md bg-background">
          <InputGroupInput
            type="search"
            placeholder="Search city name (eg: New York, London)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-lg!"
          />

          <InputGroupAddon className="px-2">
            <InputGroupText>
              <SearchIcon className="size-5" />
            </InputGroupText>
          </InputGroupAddon>

          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="default"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              type="submit"
              disabled={!search.trim()}
            >
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </form>
  );
}
