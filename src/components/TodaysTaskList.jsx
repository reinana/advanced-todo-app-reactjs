import React, { useCallback, useState } from "react";
import TaskCard from "./TaskCard";
import TaskCardDetail from "./TaskCardDetail";
import { ChevronDown } from "react-feather";

const TodaysTaskList = ({ daysEvents, selectedEvent, setDisplayDay }) => {
    console.log(daysEvents);
    console.log(selectedEvent);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(selectedEvent);

    const handleEvent = useCallback((event) => {
        setCurrentEvent(event);
        setIsOpenDetail(true);
    }, []);
    return (
        <>
            {isOpenDetail ? (
                <>
                    {/* showMoreを押すと詳細が開く */}
                    <div className="flex justify-center">
                        <TaskCardDetail
                            event={currentEvent}
                            setIsOpenDetail={setIsOpenDetail}
                            setDisplayDay={setDisplayDay}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-center">
                        {/* イベントをclickした場合にはそのイベント１個が開く */}
                        {selectedEvent ? (
                            <div className="flex flex-col justify-center p-5 bg-gradient-to-r from-slate-200/30 to-slate-300/40 rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.2)]">
                                <TaskCard event={selectedEvent.event} />
                                <div className="flex flex-col justify-center items-center">
                                    <p>Show More</p>
                                    <button onClick={() => handleEvent(selectedEvent.event)}>
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // 日にちをclickしたらその日のイベントリストが全部開く
                            <div className="flex flex-wrap justify-center">
                                {daysEvents.map((event) => {
                                    return (
                                        <div key={event.id} className="flex flex-col w-100 justify-between m-5 p-5 bg-gradient-to-r from-slate-200/30 to-slate-300/40 rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.2)] text-gray-700">
                                            <TaskCard event={event} />
                                            <div className="flex flex-col justify-center items-center">
                                                <p>Show More</p>
                                                <button
                                                    onClick={() =>
                                                        handleEvent(event)
                                                    }
                                                >
                                                    <ChevronDown />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default TodaysTaskList;
