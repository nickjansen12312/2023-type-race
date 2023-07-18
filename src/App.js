import React, { useState, useEffect } from 'react';
import SnippetSelector from './SnippetSelector';

function App() {
  const buttonTextItems = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hang out? The Foo Bar'
  ];

  const initialGameState = {
    victory: false,
    startTime: null,
    endTime: null
  };

  const [userText, setUserText] = useState('');
  const [snippet, setSnippet] = useState('');
  const [gameState, setGameState] = useState(initialGameState);
  const [wins, setWins] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [films, setFilms] = useState([]);

    useEffect(() => {
    document.title = gameState.victory ? 'Victory!' : '';
  }, [gameState.victory]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://ghibliapi.vercel.app/films?limit=3");
      const filmsData = await response.json();
      
      setFilms(filmsData);
    } catch (err) {
       setHasError(true)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const updateUserText = (event) => {
    setUserText(event.target.value);

    if(event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
    console.log(`updating user text to ${event.target.value}`)
  };

  const chooseSnippet = selectedSnippet => {
    console.log('Chose snippet!')
    console.log(selectedSnippet);
    setSnippet (selectedSnippet);
    setGameState({...gameState, startTime: new Date().getTime() });
  }



  return (
    <div>
      <h2>TypeRace</h2>
      <hr />
      <h3>Snippet</h3>
      <div>{snippet}</div>
      <h4>{gameState.victory ? `Done! Woot! Time: ${gameState.endTime}ms` : null}</h4>
      <input onChange={updateUserText} value = {userText}/>
      <hr />
      {buttonTextItems.map((textItem, index) => <button onClick={() => chooseSnippet(index)}>{textItem}</button>)}
      <SnippetSelector
      films={films}
      chooseSnippet={chooseSnippet}
      />
    </div>
  );
}



export default App;
