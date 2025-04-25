import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";

export default function AuthLayout() {
    const navigate = useNavigate();

    const clickLogo = () => {
        navigate('/');
    }

    return (
        <div>
            <header className="flex flex-row mt-3 border-b-1 pb-3 gap-3">
                <h1 style={{WebkitTextStroke: `1px black`, textShadow:`2px 2px 2px gray`}} className="font-akaya-kanadaka text-6xl ml-4 text-[#BAD8C6] cursor-pointer" onClick={clickLogo}>JAT</h1>
                <h1 className="text-2xl font-allerta-stencil text-center self-end">Job Application Tracker</h1>
            </header>
            <Outlet />
        </div>
    );
};