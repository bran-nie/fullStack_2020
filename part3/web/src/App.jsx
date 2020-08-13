import React, { useState } from 'react';
import NoteApp from './pages/note';
import PhoneBook from './pages/phoneBook';
import CourseInfo from './pages/course';
import Country from './pages/countries';

const App = () => {
    const defaultPage = {
        note: false,
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
    const [showPageObj, setShowPageObj] = useState(getPage('note'));
    const changePage = (k) => {
        console.log(getPage(k));
        setShowPageObj(getPage(k));
    };
    return (
        <>
            <nav className="list">
                {Object.keys(showPageObj).map((k) => {
                    return (
                        <button key={k} onClick={() => changePage(k)}>
                            show {k}
                        </button>
                    );
                })}
            </nav>
            {showPageObj.phoneBook && <PhoneBook />}
            {showPageObj.note && <NoteApp />}
            {showPageObj.course && <CourseInfo />}
            {showPageObj.country && <Country />}
        </>
    );
};

export default App;
