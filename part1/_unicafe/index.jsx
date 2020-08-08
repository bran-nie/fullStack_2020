import React from 'react';

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
};
const Header = (props) => <h1>{props.course}</h1>;
const Content = (props) => {
    const { data } = props;
    return (
        <div>
            <Part name={data[0].name} exercises={data[0].exercises} />
            <Part name={data[1].name} exercises={data[1].exercises} />
            <Part name={data[2].name} exercises={data[2].exercises} />
        </div>
    );
};
const Total = (props) => {
    const { total } = props;
    return <footer>Number of exercises {total}</footer>;
};

const Unicafe = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;
    const data = [
        {
            name: part1,
            exercises: exercises1,
        },
        {
            name: part2,
            exercises: exercises2,
        },
        {
            name: part3,
            exercises: exercises3,
        },
    ];
    return (
        <>
            <Header course={course} />
            <Content data={data} />
            <Total total={exercises1 + exercises2 + exercises3} />
        </>
    );
};

export default Unicafe;
