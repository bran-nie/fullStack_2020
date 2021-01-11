import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Note from './NoteItem';

test('randers content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true,
    };

    const component = render(<Note note={note} />);

    // component.debug();

    // const li = component.container.querySelector('li');

    // console.log(prettyDOM(li));

    // react-testing-library 包提供了许多不同的方法来研究被测试组件的内容
    // method 1
    expect(component.container).toHaveTextContent(note.content);

    // method 2
    const element = component.getByText(note.content);
    expect(element).toBeDefined();

    // method 3
    const div = component.container.querySelector('.note-item');
    expect(div).toHaveTextContent(note.content);
});

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true,
    };

    const mockHandler = jest.fn();

    const component = render(
        <Note note={note} toggleImportance={mockHandler} />
    );
    // component.debug();
    const button = component.getByText('make not important');
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
});
