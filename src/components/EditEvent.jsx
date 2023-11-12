import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { useSession } from "@supabase/auth-helpers-react";
import { colors } from "../Color";

const EditEvent = ({ event, handleEventEdit, setIsOpenDetail, setDisplayDay }) => {
    const { id,title, start, end, description, location, color } = event;

    const [startEdit, setStartEdit] = useState(start);
    const [endEdit, setEndEdit] = useState(end);
    const [eventName, setEventName] = useState(title);
    const [eventDescription, setDescription] = useState(description);
    const [eventLocation, setLocation] = useState(location);
    const [eventColor, setEventColor] = useState(color);

    const session = useSession(); // tokens, when session exists we have a user

    async function updateCalendarEvent() {
        const event = {
            summary: eventName,
            description: eventDescription,
            start: {
                dateTime: startEdit,
                timeZone: "Asia/Tokyo",
            },
            end: {
                dateTime: endEdit,
                timeZone: "Asia/Tokyo",
            },
            location: eventLocation,
            colorId: eventColor
        };
        await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
            {
                method: "PUT",
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
        // handleEventEdit();
        setDisplayDay(false)
    }


    return (
        <div className="grid gap-4 item-start w-80 m-auto">
            <div>
                <h3>Start of your event</h3>
                <DateTimePicker
                    className="bg-gray-50 text-slate-900 rounded-md shadow-inner w-full"
                    value={dayjs(startEdit)}
                    onChange={(newValue) => setStartEdit(newValue)}
                />
            </div>
            <div>
                <h3>End of your event</h3>
                <DateTimePicker
                    className="bg-gray-50 text-slate-500 rounded-md shadow-inner w-full"
                    value={dayjs(endEdit)}
                    onChange={(newValue) => setEndEdit(newValue)}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="title">Event title</label>
                <input
                    id="title"
                    type="text"
                    value={eventName}
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
                    value={eventDescription}
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
                    onClick={() => handleEventEdit()}
                >
                    Cancel
                </button>
                <button
                    className="bg-slate-300/30 px-4 py-3 rounded-md"
                    onClick={() => updateCalendarEvent()}
                >
                    Update Event
                </button>
            </div>
        </div>
    );
};

export default EditEvent;
