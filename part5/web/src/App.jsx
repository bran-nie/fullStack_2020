import React, { useState } from 'react';
import NoteApp from './pages/note';
import BlogApp from './pages/blog';
import PhoneBook from './pages/phoneBook';
import CourseInfo from './pages/course';
import Country from './pages/countries';
import Login from './pages/login';

const defaultPage = {
    note: false,
    blog: false,
    phoneBook: false,
    course: false,
    country: false,
};
const getPage = (page) => {
    const r = { ...defaultPage };
    if (page) {
        r[page] = true;
    }
    return r;
};

const App = () => {
    const [showPageObj, setShowPageObj] = useState(getPage('note'));

    const changePage = (k) => {
        console.log(getPage(k));
        setShowPageObj(getPage(k));
    };

    return (
        <>
            <Login />
            <nav className="list">
                {Object.keys(showPageObj).map((k) => {
                    return (
                        <button key={k} onClick={() => changePage(k)}>
                            show {k}
                        </button>
                    );
                })}
            </nav>
            {showPageObj.note && <NoteApp />}
            {showPageObj.blog && <BlogApp />}
            {showPageObj.phoneBook && <PhoneBook />}
            {showPageObj.course && <CourseInfo />}
            {showPageObj.country && <Country />}
        </>
    );
};

export default App;
