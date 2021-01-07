import { lazy } from 'react';
import Login from '../pages/login';
const NoteApp = lazy(() => import('../pages/note'));
const BlogApp = lazy(() => import('../pages/blog'));
const PhoneBook = lazy(() => import('../pages/phoneBook'));
const CourseInfo = lazy(() => import('../pages/course'));
const Country = lazy(() => import('../pages/countries'));

const routes = [
    {
        path: '/',
        expect: true,
        component: NoteApp,
    },
    {
        path: '/blog',
        expect: true,
        component: BlogApp,
    },
    {
        path: '/note',
        expect: true,
        component: NoteApp,
    },
    {
        path: '/phoneBook',
        expect: true,
        component: PhoneBook,
    },
    {
        path: '/courseInfo',
        expect: true,
        component: CourseInfo,
    },
    {
        path: '/country',
        expect: true,
        component: Country,
    },
    {
        path: '/login',
        expect: true,
        component: Login,
    },
];

export default routes;
