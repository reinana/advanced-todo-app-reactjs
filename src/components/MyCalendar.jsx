import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import TodaysTaskList from "./TodaysTaskList";

import { XSquare } from "react-feather";
import { colors } from "../Color";

const MyCalendar = () => {
    const session = useSession();
    const [eventList, setEventList] = useState([]); // googleから取得した全部のイベント
    const [displayDay, setDisplayDay] = useState(false); // 選択した日のモーダルを表示するかしないか
    const [selectedDaysEvents, setSelectedDaysEvents] = useState(); // 日付クリックした日のイベントリスト
    const [selectedEvent, setSelectedEvent] = useState(); // クリックしたイベント
    const colorMap = colors;

    const getCalendarEvent = async () => {
        const res = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + session.provider_token,
                    "Content-Type": "application/json",
                },
            }
        );

        const items = await res.json();
        console.log(items);
        const list = items.items.map((e) => {
            const o = {
                id: e.id,
                title: e.summary,
                start: e.start.dateTime,
                end: e.end.dateTime,
                description: e.description,
                color: colorMap[e.colorId],
                location: e.location
            };
            return o;
        });
        setEventList(list);
    };

    const handleDateSelect = useCallback(
        (selectionInfo) => {
            // console.log("selectionInfo: ", selectionInfo.dateStr); // 選択した範囲の情報をconsoleに出力
            const calendarApi = selectionInfo.view.calendar;
            console.log(calendarApi);

            // googleから取得したイベントにstartが存在する かつ 選択した日付と同じ日をfilter
            const events = eventList.filter((event) => {
                return (
                    event.start && event.start.startsWith(selectionInfo.dateStr)
                );
            });
            setSelectedDaysEvents(events);
            setDisplayDay(true); // モーダルを表示
            // setSelectedDaysEvents(null);

            calendarApi.unselect(); // 選択した部分の選択を解除(表示のみらしい イベントは消さないとだめ)
        },
        [eventList]
    );

    const handleEventSelect = useCallback((selectInfo) => {
        const calendarApi = selectInfo.view.calendar;

        setSelectedEvent(selectInfo);
        setDisplayDay(true);

        calendarApi.unselect(); // 選択した部分の選択を解除 きいてない
    }, []);

    // // 現在の表示を取得 1回だけ呼ばれる
    // const handleEvents = useCallback((events) => {
    //   console.log("events:", events);  // 確認用
    //   setCurrentEvents(events);
    // }, []);

    useEffect(() => {
        // googleにアクセスしてイベント取得
        getCalendarEvent();
    }, [displayDay]);

    return (
        <div className="p-5 border-t-2 border-l-2 rounded-md shadow-lg  shadow-gray-500/80 bg-white/20 backdrop-blur-sm">
            {displayDay ? (
                <div className="relative p-3 m-3">
                    <button
                        className="hover:bg-sky-700/80 absolute z-50 top-0 right-0"
                        onClick={() => {
                            setDisplayDay(false);
                            setSelectedEvent(null);
                        }}
                    >
                        <XSquare />
                    </button>
                    <TodaysTaskList
                        daysEvents={selectedDaysEvents}
                        selectedEvent={selectedEvent}
                        setDisplayDay={setDisplayDay}
                    />
                </div>
            ) : (
                <>
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            googleCalendarPlugin,
                        ]} // pluginsにlistGridPluginを設定する
                        initialView="dayGridMonth" // 初期表示のモードを設定する
                        dateClick={handleDateSelect} // 日付クリック
                        eventClick={handleEventSelect} // イベントクリック
                        selectable={true} // 日付の選択ができる
                        selectMirror={true}
                        events={eventList}
                        eventColor={"#039be5"}
                        dayMaxEvents={true}
                        // events={"https://fullcalendar.io/api/demo-feeds/events.json"}
                        // eventContent={renderEventContent}
                        // eventsSet={handleEvents} // 今日を取得？
                        googleCalendarApiKey={
                            "AIzaSyDPvc7_R9l9UYVXsu3U3Ec9-zvRXbubv6Q"
                        }
                        eventSources={[
                            {
                                googleCalendarId:
                                    "ja.japanese#holiday@group.v.calendar.google.com",
                                deisplay: "background",
                                color: "rgb(3 105 161 / 0.8)",
                                success: function (events) {
                                    events.map((event) => (event.url = null));
                                },
                            },
                        ]}
                    />
                </>
            )}
        </div>
    );
};

export default MyCalendar;
