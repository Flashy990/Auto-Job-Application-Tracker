import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const links = [
    {
        name: 'Profile',
        path: '/dashboard/settings/profile',
    },
    {
        name: 'Security and Privacy',
        path: '/dashboard/settings/privacy'
    },
];

export default function Settings() {
    const location = useLocation();
    const currentPath = location.pathname;
    const currentLink = links.find(link => link.path === currentPath);
    const [clicked, setClicked] = useState(currentLink?.name || '');


    return (
        <main className="flex flex-col md:flex-row gap-8">
            <aside className="flex flex-row md:flex-col justify-between md:justify-start px-10 items-center md:min-h-[calc(100vh-85px)] py-1 md:py-0 md:px-7 md:gap-3 md:pt-3 bg-[#BAD8C6]/50">
                {links.map((link, index) => {
                    return <Link key={link.name} to={link.path} onClick={() => setClicked(link.name)} className={`${clicked === link.name ? 'bg-[#90ab9a]' : ''} rounded-xl px-3 w-max`}>{link.name}</Link>
                })}
            </aside>
            <Outlet />
        </main>
    );
}