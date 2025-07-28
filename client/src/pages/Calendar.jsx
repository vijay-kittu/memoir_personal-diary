import { Fragment, useState, useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon, Plus, PlusCircleIcon, PlusSquareIcon } from "lucide-react";
import { Menu/*, Transition*/ } from "lucide-react";
import { JournalContext } from "../context/JournalContext";
import { startOfToday, format, eachDayOfInterval, endOfMonth, startOfMonth, isToday, endOfWeek, isSameMonth, isEqual, add, parse, getDay, startOfWeek, set } from "date-fns";

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
}

const Example = () => {
    
    let today = startOfToday();

    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    const [isOpen, setIsOpen] = useState(false);
    const [dateIndex, setDateIndex] = useState(0);
    

    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    let newDays = eachDayOfInterval({start: startOfWeek(firstDayCurrentMonth), end: endOfWeek(endOfMonth(firstDayCurrentMonth))});

    const {date, time, handleDate, handleTime, getCombinedDateTime} = useContext(JournalContext);

    
    const previousMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    return (
        <div className=" flex flex-col justify-center h-full">
            <div className="max-w-md px-[16px] mx-auto sm:px-[28px] md:max-w-[896px] md:px-[24px]">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-[gray]">
                    <div className="md:pr-[56px] ">
                        <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-[black]">
                                
                                {format(firstDayCurrentMonth, 'MMMM yyyy')}
                            </h2>
                            <button onClick={previousMonth} className="-my-[6px] flex flex-none items-center justify-center p-[6px] text-[black] hover:text-[darkgray] cursor-pointer">
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon className="h-[20px] w-[20px]" aria-hidden="true" />
                            </button>
                            <button onClick={nextMonth} className="-my-[6px] -mr-[6px] ml-[8px] flex flex-none items-center justify-center p-[6px] text-[black] hover:text-[darkgray] cursor-pointer">
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon className="h-[20px] w-[20px]" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 text-xs leading-[24px] text-center text-[black]">
                            <div>S</div>
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                        </div>
                        <div className="grid grid-cols-7 mt-[8px] text-sm">
                            {newDays.map((day, dayIdx) => (
                                <div key={day.toString()} className={classNames( dayIdx === 0 && colStartClasses[getDay(day)], '')}>
                                    <button type="button" value={day} onClick={() => {
                                        setSelectedDay(day);
                                        handleDate(day);
                                        setDateIndex(dayIdx);
                                        setIsOpen(true);

                                    }} className={classNames(
                                        isEqual(day, selectedDay) && 'text-[white]',
                                        !isEqual(day, selectedDay) && isToday(day) && 'text-[red]',
                                        !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-[black]',
                                        !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-[gray]',
                                        isEqual(day, selectedDay) && isToday(day) && 'bg-[red]',
                                        isEqual(day, selectedDay) && !isToday(day) && 'bg-[black]',
                                        !isEqual(day, selectedDay) && 'hover:bg-[lightgray]',
                                        (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                        ' m-[2px] flex h-[32px] w-[32px] items-center justify-center rounded-full cursor-pointer relative border-[0px]'
                                    )}>
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                        
                                    </button>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>
            {/*<button type="submit" onClick={() => {
                const combinedDateTime = getCombinedDateTime(date, time);
                console.log(combinedDateTime);
                /*isEditing(true);*
                }} className="p-[10px] my-[10px] rounded-[10px] border border-[skyblue] shadow-[0px_0px_12px_rgba(255,0,255,0.4)] bg-[skyblue] text-[white] flex self-center place-content-center w-[80%] cursor-pointer" >
                    Write a Journal
            </button>*/}
        </div>
    );
    
}

const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]

export default Example;