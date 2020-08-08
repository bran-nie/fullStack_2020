import React, { useState } from 'react';

const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
    <tbody>
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    </tbody>
);

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    if (!all) {
        return <p>No feedback given</p>;
    }
    const score = good * 1 + neutral * 0 + bad * -1;
    const positive = all && (good * 100) / all;
    return (
        <table>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={all && score / all} />
            <Statistic text="positive" value={positive} />
        </table>
    );
};
const Unicafe2 = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const addGoodCount = () => {
        setGood(good + 1);
    };
    const addNeutralCount = () => setNeutral(neutral + 1);
    const addBadCount = () => setBad(bad + 1);

    return (
        <>
            <div>Unicafe2</div>
            <br />
            <h1>give feedback</h1>
            <Button text="good" handleClick={addGoodCount} />
            <Button text="neutral" handleClick={addNeutralCount} />
            <Button text="bad" handleClick={addBadCount} />
            <br />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    );
};

export default Unicafe2;
