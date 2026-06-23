import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/Login.tsx"),

    layout("routes/protected/layout.tsx", [
        route("dashboard", "routes/protected/Dashboard.tsx"),
        route("admins", "routes/protected/Admins.tsx"),

    ])
] satisfies RouteConfig;
