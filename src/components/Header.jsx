import React from "react";

const Header = ({
    session,
    supabase,
    displayCreateEvent,
    isOpenCreateEvent,
}) => {
    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <header className="p-6 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-extrabold">
                    <a href="/">Advanced Todo App</a>
                </h1>
            </div>
            {session ? (
                <>
                    <div>
                        {!isOpenCreateEvent && (
                            <button
                                className="bg-slate-300/30 px-3 py-3 mr-5 rounded-md hover:bg-sky-700/80"
                                onClick={() => displayCreateEvent()}
                            >
                                Create Event
                            </button>
                        )}
                        <button
                            className="bg-slate-300/30 px-3 py-3 rounded-md hover:bg-sky-700/80"
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </header>
    );
};

export default Header;
