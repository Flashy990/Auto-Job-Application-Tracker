import { Link } from "react-router";
import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auto Job Application Tracker App" },
    { name: "description", content: "This app is for tracking job applications' information" },
  ];
}

export default function Home() {

  return (
  <div>
    <header className="flex flex-row mt-3 border-b-1 pb-3">
      <h1 className="font-bagel-fat-one text-6xl ml-4">JAT</h1>
      <h1 className="text-5xl font-allerta-stencil flex-grow text-center self-center">Job Application Tracker</h1>
      <div className="flex gap-6 items-end mr-4">
        <Link to={'/signup'} className="border-2 px-2 py-1 rounded-xl hover:text-gray-900 hover:bg-gray-400 hover:border-gray-400">Sign up</Link>
        <Link to={'/login'} className=" border-2 px-3 py-1 rounded-xl hover:text-gray-900 hover:bg-gray-400 hover:border-gray-400">Log in</Link>
      </div>
    </header>
  </div>);
}
