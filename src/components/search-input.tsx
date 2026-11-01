import { useState } from "react";
import { Field } from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import { SearchIcon } from "lucide-react";

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
      <Field orientation="horizontal" className="bg-accent rounded-md">
        <InputGroup>
          <InputGroupInput
            type="search"
            placeholder="Search city name (eg: New York, London)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <InputGroupText>
              <SearchIcon />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="default"
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
