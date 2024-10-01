import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="w-[60%] md:w-[50%]">
      <Input type="text" placeholder="Search" />
    </div>
  );
}
