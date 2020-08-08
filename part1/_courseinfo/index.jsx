import React from 'react';

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};
const Header = ({ course }) => <h1>{course}</h1>;
const Content = (props) => {
    const { parts } = props;
    return (
        <div>
            <Part name={parts[0].name} exercises={parts[0].exercises} />
            <Part name={parts[1].name} exercises={parts[1].exercises} />
            <Part name={parts[2].name} exercises={parts[2].exercises} />
        </div>
    );
};
const Total = ({ parts }) => {
    const total = parts.reduce((pre, next) => {
        return pre + next.exercises;
    }, 0);
    return <footer>Number of exercises {total}</footer>;
};

const CourseInfo = () => {
    const course = {
        name: 'Half Stack application development __ course info',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    };

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

export default CourseInfo;
