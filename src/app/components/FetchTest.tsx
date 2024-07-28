// components/ChatComponent.jsx
import { useState } from 'react';

const FetchTest = () => {
  const [response, setResponse] = useState(null);

  const handleSendMessage = async () => {
    const apiKey = process.env.FALCON_API_KEY;
    const url = '/api/falcon';

    const body = {
      model: 'tiiuae/falcon-180b-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an excellent movie recommendation engine. You give personalized movie recommendations based on the movies based on the movies the user inputs. Recommend 5 movies. Make sure you do not recommend movies the user has entered as input! IMPORTANT: Respond in the format of {movies: [{title: "movie title (year)", director: "director", description: "short description of the movie", reasoning: "short explanation of why you recommended this movie", imdbUrl: "imdb url of this movie (MAKE SURE THIS IS CORRECT!)"}, ...]}',
        },
        {
          role: 'user',
          content: 'Interstellar; Now you see me; Inception',
        },
      ],
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Send Message</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default FetchTest;
