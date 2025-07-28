import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import "./header.css";

export function Header() {
  const router = useRouter();
  const handleClick = () => {
    router.navigate({ to: "/create" });
  };
  return (
    <header>
      <Link to="/">
        <h1>Mycelium</h1>
      </Link>
      <Button buttonText="create" clickHandler={handleClick} />
    </header>
  );
}
