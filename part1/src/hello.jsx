import React, { useState } from 'react';

const Display = ({ counter }) => <div>counter: {counter}</div>;
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

export const Npc = () => {
    const [counter, setCounter] = useState(0);
    const increaseByOne = () => setCounter(counter + 1);
    const decreaseByOne = () => setCounter(counter - 1);
    const setToZero = () => setCounter(0);

    return (
        <div>
            <Display counter={counter} />
            <Button handleClick={increaseByOne} text="plus" />
            <Button handleClick={decreaseByOne} text="minus" />
            <Button handleClick={setToZero} text="zero" />
        </div>
    );
};
