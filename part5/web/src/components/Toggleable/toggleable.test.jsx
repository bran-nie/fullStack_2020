import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Toggleabel from './index';

describe('<Toggleable />', () => {
    let component;

    beforeEach(() => {
        component = render(
            <Toggleabel buttonLabel="show...">
                <div className="test-div"></div>
            </Toggleabel>
        );
    });

    test('renders its children', () => {
        expect(component.container.querySelector('.test-div')).toBeDefined();
    });

    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.toggleable-content');
        expect(div).toHaveStyle('display: none');
    });

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...');
        fireEvent.click(button);

        const div = component.container.querySelector('.toggleable-content');
        expect(div).not.toHaveStyle('display: none');
    });
});
