import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader = async () => {
  return { message: "this is awesome 😎" };
};

export default function Index() {
  let data = useLoaderData<typeof loader>();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Welcome to Remix on Azure!</h2>
      <Link to="/page-2">Go to page 2</Link>
      <p>
        <a href="https://docs.remix.run">Check out the docs</a> to get started.
      </p>
      <p>Message from the loader: {data.message}</p>
    </div>
  );
}
