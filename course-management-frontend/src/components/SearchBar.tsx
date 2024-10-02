import { Input } from "@/components/ui/input";

export function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: any;
}) {
  return (
    <div className="w-[60%] md:w-[50%]">
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => {
         setSearch(e.target.value);
        }}
      />
    </div>
  );
}
