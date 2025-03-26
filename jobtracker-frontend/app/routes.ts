import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("routes/auth/layout.tsx", [
        route("signup", "routes/auth/signup.tsx"),
        route("signup/password", "routes/auth/password.tsx"),
        route("signup/user-info", "routes/auth/userinfo.tsx"),
        route("login", "routes/auth/login.tsx"),
        
    ]),
    ...prefix("dashboard", [
        layout("routes/dashboard/layout.tsx", [
            route("profile", "routes/dashboard/profile.tsx"),
            route("applications", "routes/dashboard/applications.tsx"),
            route("edit-application", "routes/dashboard/applicationEdit.tsx"),
            ...prefix("settings", [
                layout("routes/dashboard/settings.tsx", [
                    route("profile", "routes/dashboard/settings/profile.tsx"),
                    route("privacy", "routes/dashboard/settings/privacy.tsx"),
                    route("automatic", "routes/dashboard/settings/automatic.tsx"),
                ])
            ])
        ]),
    ]),
] satisfies RouteConfig;
