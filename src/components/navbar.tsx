import TodoDialog from "./todo-dialog";
import { ModeToggle } from "./toggle-theme-button";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="bg-secondary sticky top-0 z-10">
      <div className="flex container mx-auto justify-between items-center py-4">
        <h1 className="text-blue-700 font-semibold text-2xl">TODO LIST</h1>
        <div className="flex items-center gap-2">
          <TodoDialog />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
