import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Unicafe from './_unicafe/index.jsx';
import Unicafe2 from './_unicafe/unicafe';
import CourseInfo from './_courseinfo';
import Anecdotes from './_anecdotes';

const NavListData = [
    {
        name: 'Unicafe(1.1-1.2)',
        component: <Unicafe />,
    },
    {
        name: 'CourseInfo(1.3-1.5)',
        component: <CourseInfo />,
    },
    {
        name: 'Unicafe(1.6-1.13)',
        component: <Unicafe2 />,
    },
    {
        name: 'Anecdotes(1.12-1.14)',
        component: <Anecdotes />,
    },
];

const Content = (props) => {
    const { data } = props;
    return <div className="content">{data.component}</div>;
};

const NavList = (props) => {
    const { data, handleClick } = props;
    const changeContent = (item) => {
        return () => {
            handleClick(item);
        };
    };
    return (
        <nav>
            {data.map((item, index) => {
                return (
                    <button key={index} onClick={changeContent(item)}>
                        {item.name}
                    </button>
                );
            })}
        </nav>
    );
};

const App = (props) => {
    const [curContent, setCurContent] = useState(props.data[3]);

    const changeNavItem = (content) => {
        setCurContent(content);
    };

    return (
        <>
            <header>Part 1</header>
            <NavList data={NavListData} handleClick={changeNavItem} />
            <Content data={curContent} />
        </>
    );
};

ReactDOM.render(<App data={NavListData} />, document.getElementById('root'));
