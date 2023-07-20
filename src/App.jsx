import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [ingredients, setIngredients] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const query = ingredients.split(' ').join(',');

    const options = {
      
      method: 'GET',
      url: 'https://yummly2.p.rapidapi.com/feeds/auto-complete',
      params: { q: query },
      headers: {
        'X-RapidAPI-Key': 'e0613d3684msh60179f304e328a4p1dbc0ejsnd856fa83806f',
        'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setResults(response.data.searches);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      <input type="text" value={ingredients} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      {isLoading ? (
        <p>Generating Dishes with {ingredients} . . .</p>
      ) : (
        results.map((result, index) => (
          <p key={index}>{result}</p>
        ))
      )}
    </div>
  );
  
  
}


export default App;
