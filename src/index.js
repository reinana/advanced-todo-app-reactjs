import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
    "https://naxcijjmlxpotjhbrjua.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heGNpamptbHhwb3RqaGJyanVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzODk2MjcsImV4cCI6MjAxMzk2NTYyN30.1Esi0mHThAXmS0Jl8F1DxNGwCASzipNpKrIoayhVngs"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <SessionContextProvider supabaseClient={supabase}>
            <App />
        </SessionContextProvider>
    </React.StrictMode>
);
