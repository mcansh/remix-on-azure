import * as React from "react";
import { RouteComponent, MetaFunction } from "remix";
import { Link } from "react-router-dom";

const meta: MetaFunction = () => ({
  title: "Page 2",
});

const Page: RouteComponent = () => {
  return (
    <>
      <p>Welcome to Page 2👋</p>
      <Link to="/">Go back home.</Link>
    </>
  );
};

export default Page;
export { meta };
