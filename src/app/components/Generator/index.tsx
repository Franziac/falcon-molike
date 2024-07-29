'use client'
import Image from 'next/image';
import React, { useState , useRef} from 'react';

export default function Generator() {
    const [items, setItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState(null);

    const requestRecommendations = async (inputs) => {
        setResponse(null);
        const apiKey = process.env.FALCON_API_KEY;
        const url = '/api/falcon';

        const body = {
        model: 'tiiuae/falcon-180b-chat',
        messages: [
            {
            role: 'system',
            content: 'You are an excellent movie recommendation engine. You give personalized movie recommendations based on the movies the user inputs. Recommend 5 movies. Make sure you do not recommend movies the user has entered as input! VERY IMPORTANT: Respond in this exact format with all the properties mentioned: {"movies": [{"title": "movie title (year)", "director": "director", "description": "short description of the movie", "reasoning": "short explanation of why you recommended this movie"}, ...]}',
            },
            {
            role: 'user',
            content: inputs.join("\n"),
            },
        ],
        };

        try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        setResponse(data);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    const addItem = (value: string) => {
    const newItem = `${value}`;
    setItems([...items, newItem]);
    };
    const removeItem = (value: string) => {
    setItems(items.filter(item => item != value))
    };

    const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        if (/\S/.test(inputValue)) {
            //First condition to check if string is not empty
            //Second condition checks if string contains just whitespace
            addItem(inputValue);
            setInputValue("");
        }
        event.preventDefault();
    };
    return (
    <div className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/10 title-shadow p-6 rounded-lg w-1/2 h-fit min-w-[300px] mb-8">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"></link>
        <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">What kind of movie are you looking for?</h1>
        <p className='text-slate-400 p-2'>Enter movies that represent the vibe, storyline, visuals, or other trait that you are craving right now. The suggestion engine will recommend you movies that it thinks you would enjoy based on the movies you enter.</p>
        <form onSubmit={handleSubmit} className='m-1'>
            <div className='mb-4'>
                <input type="text" id="textField" className="border border-indigo-300/80 p-2 rounded float-left w-9/12" placeholder="Enter a movie you like" value={inputValue} onChange={handleChange}></input>
                <button type="submit" className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 float-right w-1/6 min-w-[50px]">Add</button>
            </div>
            <br className='m-4'></br>
            <ul>
            {items.map((item, index) => (
                <li key={index}>
                <div className='bg-slate-100 p-2 mb-1 rounded hover:bg-slate-200 w-full h-12'>
                    <p className='text-indigo-500 float-left w-5/6 min-w-[150px]'>{item}</p>
                    <button type='button' className='bg-red-400 rounded-md w-9 h-9 text-white float-right flex justify-center items-center' onClick={() => removeItem(items[index])}>
                        <Image src='../trash.svg' alt='-' width={18} height={18}></Image>
                    </button>
                </div>
                </li>
            ))}
            </ul>
            <br className='mb-1'></br>
            <button type="button" onClick={()=>requestRecommendations(items)} className="bg-indigo-500 text-white p-2 w-full rounded hover:bg-indigo-600">Get recommendations</button>
        </form>
        {response &&
        <ul className='mt-4'>
            {JSON.parse(response.data.choices[0].message.content.replace("\n", "").replace("\\", "")).movies.map((item, index) => (
                <li key={index}>
                    <div className='flex flex-col bg-slate-100 p-2 mb-2 rounded hover:bg-slate-200 w-full h-fit'>
                        <p className='text-indigo-500 float-left w-5/6 min-w-[150px]'>{item.title}</p>
                        <p><b>Description: </b>{item.description}</p>
                        <p><b>Reasoning: </b>{item.reasoning}</p>
                    </div>
                </li>
            ))}
        </ul>
        }
    </div>
    );
}
