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
                <h1 className="font-bagel-fat-one text-6xl ml-4 cursor-pointer" onClick={clickLogo}>JAT</h1>
                <h1 className="text-2xl font-allerta-stencil text-center self-end">Job Application Tracker</h1>
            </header>
            <Outlet />
        </div>
    );
};