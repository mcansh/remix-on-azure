import { RouteComponent, MetaFunction, Link } from "remix";

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
