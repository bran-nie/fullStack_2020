import React from 'react';

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};
const Header = ({ course }) => <h2>{course}</h2>;
const Content = (props) => {
    const { parts } = props;
    return (
        <div>
            {parts.map((part) => {
                return (
                    <Part
                        name={part.name}
                        exercises={part.exercises}
                        key={part.id}
                    />
                );
            })}
        </div>
    );
};
const Total = ({ parts }) => {
    const total = parts.reduce((pre, next) => {
        return pre + next.exercises;
    }, 0);
    return <h4>Total of {total} exercises</h4>;
};

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

export default Course;
