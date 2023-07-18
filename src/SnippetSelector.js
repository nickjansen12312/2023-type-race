import React, { useState } from 'react';
import SelectorButton from './SelectorButton';

const SnippetSelector = ({ films, chooseSnippet }) => {
    const selections = [
        { id: 1, title: 'Film Title'},
        { id: 2, title: 'Description' },
        { id: 3, title: 'Director' }
    ];

    const [whatToType, setWhatToType] = useState(null);

    const chooseWhatToType = (selection) => setWhatToType(selection);

    return(
        <div>
            {!whatToType ?
            <div>
                <h4>What would you like to type?</h4>
                <SelectorButton buttonNames={selections} onSelection={chooseWhatToType} />
                </div>
                : null}
                {whatToType && films ?
                <div>
                    <h4>Choose One</h4>
                    <SelectorButton buttonNames={films} onSelection={chooseSnippet} selectionType={whatToType} />
                    </div>
                    :null
                    }
            </div>
    );
};

import { render, screen, fireEvent } from '@testing-library/react'
export default SnippetSelector;



it('renders buttons with film titles once film title button has been selected', () => {
// Arrange
const films = [{id: 1, title: 'test film'}];
const chooseSnippet = jest.fn();

//Act
render(<SnippetSelector films = {films} chooseSnippet={chooseSnippet} />);
fireEvent.click(screen.getByText('Films Title'));
const newButton = screen.getByText('test film');

//Assert
expect(newButton).toBeInTheDocument();
})

test('clicking Directors works', () =>{
    const testDirectors = { name: 'Test Directors' };
    const chooseSnippetMock = jest.fn();

    render(<SnippetSelector directors={testDirectors} chooseSnippet={chooseSnippetMock} />);
    const directorButton = screen.getByRole('button', {name: /Direcotrs/i });
    fireEvent.click(directorButton);


    const newButton = screen.getByRole('button', {name: testDirectors.name })
    expect(newButton).toBeInTheDocument();
})