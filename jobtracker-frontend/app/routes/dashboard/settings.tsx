import { useState } from "react";
import { Link, Outlet } from "react-router";

const links = [
    {
        name: 'Profile',
        path: '/dashboard/settings/profile',
    },
    {
        name: 'Security and Privacy',
        path: '/dashboard/settings/privacy'
    },
    {
        name: 'Automatic Mode',
        path:'/dashboard/settings/automatic'
    }
];

export default function Settings() {
    const [clicked, setClicked] = useState('Profile');


    return (
        <main className="flex flex-row gap-8">
            <aside className="flex flex-col items-center min-h-[calc(100vh-85px)] px-7 gap-3 pt-3 bg-[#BAD8C6]/20">
                {links.map((link, index) => {
                    return <Link to={link.path} onClick={() => setClicked(link.name)} className={`${clicked === link.name ? 'bg-[#90ab9a]' : ''} rounded-xl px-3 w-max`}>{link.name}</Link>
                })}
            </aside>
            <Outlet />
        </main>
    );
}