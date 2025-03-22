import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("routes/auth/layout.tsx", [
        route("signup", "routes/auth/signup.tsx"),
        route("login", "routes/auth/login.tsx"),
    ]),
    ...prefix("dashboard", [
        layout("routes/dashboard/layout.tsx", [
            route("applications", "routes/dashboard/applications.tsx"),
            route("edit-application", "routes/dashboard/applicationEdit.tsx"),
            route("profile", "routes/dashboard/settings.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
