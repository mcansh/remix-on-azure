import { MetaFunction, RouteComponent } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Page 2",
});

export default function Page2() {
  return (
    <>
      <p>Welcome to Page 2👋</p>
      <Link to="/">Go back home.</Link>
    </>
  );
}
