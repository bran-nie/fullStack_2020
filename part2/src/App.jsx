import React from 'react';
import NoteApp from './pages/note';
import PhoneBook from './pages/phoneBook';
import CourseInfo from './pages/course';
import Country from './pages/countries';

const App = () => {
    const showNote = false;
    const showPhoneBook = false;
    const showCourse = false;
    const showCountry = true;
    return (
        <>
            {showPhoneBook && <PhoneBook />}
            {showNote && <NoteApp />}
            {showCourse && <CourseInfo />}
            {showCountry && <Country />}
        </>
    );
};

export default App;
