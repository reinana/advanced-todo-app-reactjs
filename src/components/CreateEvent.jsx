import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { colors } from "../Color";

const CreateEvent = ({ displayCreateEvent }) => {
    const today = new Date();
    const [start, setStart] = useState(today);
    const [end, setEnd] = useState(today);
    const [eventName, setEventName] = useState("");
    const [eventDescription, setDescription] = useState("");
    const [eventLocation, setLocation] = useState("");
    const [eventColor, setEventColor] = useState("");

    const session = useSession(); // tokens, when session exists we have a user

    async function createCalendarEvent() {
        console.log("create calendar");
        const event = {
            summary: eventName,
            description: eventDescription,
            start: {
                dateTime: start.toISOString(),
                timeZone: "Asia/Tokyo",
            },
            end: {
                dateTime: end.toISOString(),
                timeZone: "Asia/Tokyo",
            },
            location: eventLocation,
            colorId: eventColor,
        };
        await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + session.provider_token,
                },
                body: JSON.stringify(event),
            }
        )
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
            });
        displayCreateEvent();
    }
    return (
        <div className="grid gap-4 item-start w-80 m-auto">
            <div>
                <h3>Start of your event</h3>
                <DateTimePicker
                    className="bg-gray-50 text-slate-900 rounded-md shadow-inner w-full"
                    onChange={(newValue) => setStart(newValue)}
                />
            </div>
            <div>
                <h3>End of your event</h3>
                <DateTimePicker
                    className="bg-gray-50 text-slate-500 rounded-md shadow-inner w-full"
                    onChange={(newValue) => setEnd(newValue)}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="title">Event title</label>
                <input
                    id="title"
                    type="text"
                    className="bg-gray-50 text-slate-500 rounded-md shadow-inner p-3.5"
                    onChange={(e) => setEventName(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="location">Event Location</label>
                <input
                    id="location"
                    type="text"
                    className="bg-gray-50 text-slate-500 rounded-md shadow-inner p-3.5"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="desp">Event description</label>
                <input
                    id="desp"
                    type="text"
                    className="bg-gray-50 text-slate-500 rounded-md shadow-inner p-3.5"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="color">Event Color</label>
                <select
                    id="color"
                    className="bg-gray-50 text-slate-500 rounded-md shadow-inner p-3.5"
                    onChange={(e) => setEventColor(e.target.value)}
                >
                    {Object.keys(colors).map((id) => (
                        <option
                            value={id}
                            style={{ backgroundColor: colors[id] }}
                        >
                            {colors[id]}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-between my-3">
                <button
                    className="bg-slate-300/30 px-4 py-3 rounded-md"
                    onClick={() => displayCreateEvent()}
                >
                    Cancel
                </button>
                <button
                    className="bg-slate-300/30 px-4 py-3 rounded-md"
                    onClick={() => createCalendarEvent()}
                >
                    Create Event
                </button>
            </div>
        </div>
    );
};

export default CreateEvent;
