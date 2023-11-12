import "./App.css";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    useSession,
    useSupabaseClient,
    useSessionContext,
} from "@supabase/auth-helpers-react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "./components/MyCalendar";
import CreateEvent from "./components/CreateEvent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState } from "react";
import MyCalendar from "./components/MyCalendar";

function App() {
    const session = useSession(); // tokens, when session exists we have a user
    const supabase = useSupabaseClient();
    const { isLoading } = useSessionContext(); // リロードした時ちらつかないようにする
    const [isOpenCreateEvent, setIsOpenCreateEvent] = useState(false);
    if (isLoading) {
        return <></>;
    }

    const googleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                scopes: "https://www.googleapis.com/auth/calendar",
            },
        });
        if (error) {
            alert("Error logging in to Google provider with Supabase");
            console.log(error);
        }
    };

    const displayCreateEvent = () => {
        setIsOpenCreateEvent((prev) => !prev);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App min-h-fit">
                <Header
                    session={session}
                    supabase={supabase}
                    displayCreateEvent={displayCreateEvent}
                    isOpenCreateEvent={isOpenCreateEvent}
                />
                <main className="m-5">
                    {session ? (
                        <>
                            {isOpenCreateEvent ? (
                                <>
                                    <CreateEvent
                                        displayCreateEvent={displayCreateEvent}
                                    />
                                </>
                            ) : (
                                <>
                                    <BrowserRouter>
                                        <Routes>
                                            <Route
                                                path={`/`}
                                                element={<MyCalendar />}
                                            />
                                            {/* <Route path={`/register/`} element={<Register />} />
                                                <Route path={`/login/`} element={<Login />} /> */}
                                        </Routes>
                                    </BrowserRouter>
                                    {/* <MyCalendar /> */}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <button
                                className="bg-slate-300/30 px-3 py-3 rounded-md hover:bg-sky-700/80"
                                onClick={() => googleSignIn()}
                            >
                                Sign In With Google
                            </button>
                        </>
                    )}
                </main>
                <Footer />
            </div>
        </LocalizationProvider>
    );
}

export default App;
