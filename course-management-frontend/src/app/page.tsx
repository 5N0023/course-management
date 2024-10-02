import LogOutButton from "@/components/LogOutButton";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-start">
      <LogOutButton />
      <MainContent />
    </div>
  );
}
