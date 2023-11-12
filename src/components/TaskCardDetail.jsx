import React, { useCallback, useState } from "react";
import { Trash2, Heart, Edit, ArrowLeft } from "react-feather";
import EditEvent from "./EditEvent";
import { useSession } from "@supabase/auth-helpers-react";

const TaskCardDetail = ({ event, setIsOpenDetail, setDisplayDay }) => {

    const { id, title, start, end, description, location } = event;
    const [isEditOpen, setIsEditOpen] = useState(false);
    const session = useSession(); // tokens, when session exists we have a user

    const handleEventEdit = useCallback(() => {
        setIsEditOpen((prev) => !prev)
    }, [])

    async function deleteCalendarEvent(id) {
        
        await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + session.provider_token,
                },
            }
        )
            .then((data) => {
                return data;
            })
            .then((data) => {
                console.log(data);
            });
        setDisplayDay(false)
    }

    return (
        <>
            {isEditOpen ? (
                <><EditEvent event={event} handleEventEdit={handleEventEdit} setIsOpenDetail={setIsOpenDetail} setDisplayDay={setDisplayDay}/></>
            ) : (
                <>
                    <div className="flex flex-col items-center p-5 mx-3 w-4/5 bg-gradient-to-r from-slate-200/30 to-slate-300/40 rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.2)]">
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-2xl font-extrabold w-1/5 mr-3">
                                Title
                            </h2>

                            <h2 className="text-2xl bg-slate-50/80 text-gray-700 rounded-md w-full py-2 shadow-[inset_0px_2px_11px_2px_#00000040]">
                                {title}
                            </h2>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-2xl font-extrabold w-1/5 mr-3">
                                Time
                            </h2>
                            <div className="text-gray-700 lg:px-2 px-5 py-2 mt-3 w-full text-xl text-start bg-slate-50/80 rounded-md shadow-[inset_0px_2px_11px_2px_#00000040]">
                                <div className="flex items-center">
                                    <div className="flex items-center w-12 h-8 justify-center my-2 text-xl rounded-md bg-red-100/80 shadow-[inset_0px_2px_11px_2px_#00000040]">
                                        Start
                                    </div>{" "}
                                    <p className="px-2 my-2">
                                        {new Date(start).toLocaleString(
                                            "ja-JP"
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center w-12 h-8 justify-center my-2 rounded-md bg-blue-100/80 shadow-[inset_0px_2px_11px_2px_#00000040]">
                                        End
                                    </div>{" "}
                                    <p className="px-2 my-2">
                                        {new Date(end).toLocaleString("ja-JP")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-2xl font-extrabold w-1/5 mr-3">
                                Location
                            </h2>
                            <div className="text-gray-700 lg:px-2 px-5 py-2 mt-3 w-full text-xl text-start bg-slate-50/80 rounded-md shadow-[inset_0px_2px_11px_2px_#00000040]">
                                <div className="flex">
                                    <p className="px-2 my-2">{location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-2xl font-extrabold w-1/5 mr-3">
                                Desc
                            </h2>
                            <div className="text-gray-700 lg:px-2 px-5 py-2 mt-3 w-full text-xl text-start bg-slate-50/80 rounded-md shadow-[inset_0px_2px_11px_2px_#00000040]">
                                <div className="flex">
                                    <p className="px-2 my-2">{description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-2xl font-extrabold w-1/5 mr-3">
                                {" "}
                            </h2>
                            <div className="flex lg:px-2 py-2 mt-2 w-full justify-between text-xl ">
                                <div>
                                    <button
                                        onClick={() => setIsOpenDetail(false)}
                                        className="bg-slate-300/30 px-3 py-3 mr-3 rounded-md hover:bg-sky-700/80"
                                    >
                                        <ArrowLeft />
                                    </button>
                                    <button
                                        onClick={handleEventEdit} 
                                        className="bg-slate-300/30 px-3 py-3 rounded-md hover:bg-sky-700/80">
                                        <Edit />
                                    </button>
                                </div>
                                <div>
                                    <button className="bg-slate-300/30 px-3 py-3 mr-3 rounded-md hover:bg-sky-700/80">
                                        <Heart />
                                    </button>
                                    <button onClick={() => deleteCalendarEvent(id)} className="bg-slate-300/30 px-3 py-3 rounded-md hover:bg-sky-700/80">
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default TaskCardDetail;
