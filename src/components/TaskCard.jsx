import { Trash2, Heart } from "react-feather";

const TaskCard = ({ event }) => {

    const { title, start, end } = event;

    return (
        <div className="flex flex-col justify-center ">
            <h2 className="text-gray-700 text-2xl bg-slate-50/80 rounded-md w-full py-2 shadow-[inset_0px_2px_11px_2px_#00000040]">{title}</h2>
            <div className="text-gray-700 lg:px-2 px-5 py-2 mt-3 w-full text-xl text-start bg-slate-50/80 rounded-md shadow-[inset_0px_2px_11px_2px_#00000040]">
                <div className="flex">
                    <div className="w-20 my-2 text-xl text-center rounded-md px-2 bg-red-100/80 shadow-[inset_0px_2px_11px_2px_#00000040]">Start</div>{" "}
                    <p className="px-2 my-2">{new Date(start).toLocaleString("ja-JP")}</p>
                </div>
                <div className="flex">
                    <div className="w-20 my-2 text-xl text-center rounded-md px-2 bg-blue-100/80 shadow-[inset_0px_2px_11px_2px_#00000040]">End</div>{" "}
                    <p className="px-2 my-2">{new Date(end).toLocaleString("ja-JP")}</p>
                </div>
            </div>
            <div className="flex lg:px-2 py-2 mt-2 w-full justify-end text-xl ">
                <button className="mr-3">
                    <Heart />
                </button>
                <button>
                    <Trash2 />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
