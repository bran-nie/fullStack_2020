import React, { useState, useImperativeHandle } from 'react';

const Toggleabel = React.forwardRef((props, ref) => {
    const { buttonLabel, children } = props;
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="toggleable-content">
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    );
});

Toggleabel.displayName = 'Toggleable';

export default Toggleabel;
