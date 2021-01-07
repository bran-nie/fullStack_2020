import React, { useState, useEffect } from 'react';
import './index.scss';
// import ReactDom from 'react-dom';

export const NotificationType = {
    Success: 'success',
    Error: 'error',
    Warning: 'warning',
};

const Notification = (props) => {
    const { message, type = NotificationType.Success, delay = 3000 } = props;
    const [msg, setMsg] = useState(null);
    useEffect(() => {
        let timer = null;
        if (message) {
            setMsg(message);
            timer = setTimeout(() => {
                setMsg(null);
            }, delay);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [message, delay]);

    if (msg === null) {
        return null;
    }

    return <div className={`notification ${type}`}>{msg}</div>;
};

// export const showMsg = (msg, type) => {
//     console.log(msg, type);
//     return <Notification message={msg} type={type} />;
// };

export default Notification;

// const NotificationDom = document.createElement('div');
// document.body.appendChild(NotificationDom);
// ReactDom.render(<Notification />, NotificationDom);
