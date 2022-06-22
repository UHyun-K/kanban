import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { minutesState, hourSelector } from "./atoms";

function App() {
    const [minutes, setMinutes] = useRecoilState(minutesState);
    const [hours, setHours] = useRecoilState(hourSelector);
    const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+event.currentTarget.value);
    };
    const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
        setHours(+event.currentTarget.value);
    };

    return (
        <div>
            <input
                value={minutes}
                onChange={onMinutesChange}
                type="number"
                placeholder="Minutes"
            />
            <input
                onChange={onHoursChange}
                value={hours}
                type="number"
                placeholder="Hours"
            />
        </div>
    );
}

export default App;
