import React, { useState } from 'react';

const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>{text}</button>
);

const Anecdotes = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    ];
    const len = anecdotes.length;
    const pointsArr = Array(len).fill(0);

    const [points, setPoints] = useState(pointsArr);
    const [selected, setSelected] = useState(0);
    const [mostVote, setMostVote] = useState(0);

    const random = (min, max) => {
        if (max < min) {
            [min, max] = [max, min];
        }
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const rangeSelected = () => {
        let r = selected;
        while (r === selected) {
            r = random(0, len - 1);
        }
        setSelected(r);
    };

    const voteAnecdote = () => {
        const tmp = [...points];
        tmp[selected] += 1;
        setPoints(tmp);
        const max = Math.max(...tmp);
        setMostVote(tmp.findIndex((v) => v === max));
    };

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <div>has {points[selected]} votes</div>
            <Button text="vote" handleClick={voteAnecdote} />
            <Button text="next anecdotes" handleClick={rangeSelected} />
            <h1>Anecdote with most votes</h1>
            <div>{anecdotes[mostVote]}</div>
            <div>has {points[mostVote]} votes</div>
        </>
    );
};

export default Anecdotes;
