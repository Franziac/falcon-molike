//@ts-nocheck
'use client'
import Image from 'next/image';
import React, { useEffect, useState, useRef, useReducer } from 'react';
import { useSession } from "next-auth/react"

interface Recommendation {
    title: string,
    director: string,
    description: string,
    reasoning: string
    isMovie: boolean
}
interface Choice {
    finishReason: string,
    index: number,
    message: {
        content: string
        role: string
    }
}
interface ApiResponse {
    data: {
        id: string,
        created: number,
        model: string,
        usage: {
            completion_tokens: number,
            prompt_tokens: number,
            total_tokens: number
        },
        choices: Choice[],
        object: string
    };
}

export default function Generator() {
    const [items, setItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState<object | null>();
    const [requesting, setRequesting] = useState(false);
    const [tokens, setTokens] = useState<number>(0);
    const { data: session } = useSession()
    const moviesCheckbox = useRef();
    const seriesCheckbox = useRef();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    async function updateTokens()
    {
        const body = {email: session?.user?.email};
        const res = await fetch("/api/user/getUser", {
            method: 'POST',
            body: JSON.stringify(body)
        })
        if(res.status == 200)
        {
            const user = await res.json();
            setTokens(user.tokens);
        }
    }
    useEffect( () =>
        {
            updateTokens();
        })
    const requestRecommendations = async (inputs: string[], includeMovies: boolean, includeSeries: boolean) => {
        if(!includeMovies && !includeSeries) return;
        if(inputs.length == 0) return;
        setRequesting(true);
        setResponse(null);

        const url = '/api/falcon';

        var systemPrompt = 'You are an excellent movie and tv series recommendation engine. You give personalized recommendations based on the movies and tv series the user inputs. Recommend 5 movies or tv series. Make sure you do not recommend movies or tv series the user has entered as input! VERY IMPORTANT: Respond in this exact format with all the properties mentioned: {"recommendations": [{"title": "title (year)", "director": "director (on tv series leave empty)", "description": "short description of the movie or tv series", "reasoning": "short explanation of why you recommended this movie/tv series", "isMovie": true/false}, ...]}';
        if(includeMovies && !includeSeries) systemPrompt = 'You are an excellent movie recommendation engine. You give personalized movie recommendations based on the movies the user inputs. Recommend 5 movies. Make sure you do not recommend movies the user has entered as input! VERY IMPORTANT: Respond in this exact format with all the properties mentioned: {"recommendations": [{"title": "movie title (year)", "director": "director", "description": "short description of the movie", "reasoning": "short explanation of why you recommended this movie", "isMovie": true}, ...]}';
        else if (!includeMovies && includeSeries) systemPrompt = 'You are an excellent tv series recommendation engine. You give personalized series recommendations based on the tv series the user inputs. Recommend 5 tv series. Make sure you do not recommend tv series the user has entered as input! VERY IMPORTANT: Respond in this exact format with all the properties mentioned: {"recommendations": [{"title": "title (year)", "director": "", "description": "short description of the tv series", "reasoning": "short explanation of why you recommended this tv series", "isMovie": false}, ...]}';

        var body = {
        email: session?.user?.email,
        model: 'tiiuae/falcon-180b-chat',
        messages: [
            {
            role: 'system',
            content: systemPrompt,
            },
            {
            role: 'user',
            content: inputs.join("\n"),
            },
        ],
        };
        var res = null;
        try {
        res = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(30000)
        });

        var data = await res.json();
        try
        {
            data = JSON.parse(data.data.choices[0].message.content.replace("\n", "").replace("\\", ""));
            setResponse({data: data, status: res.status});
        }
        catch (error)
        {
            console.log(error);
            setResponse({data: null, status: 500});
        }
        setRequesting(false);
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (/\S/.test(inputValue)) {
            //First condition to check if string is not empty
            //Second condition checks if string contains just whitespace
            addItem(inputValue);
            setInputValue("");
        }
        event.preventDefault();
    };
    return (
    <div className="flex backdrop-blur-md bg-gradient-to-br from-white/10 to-white/10 title-shadow p-6 rounded-lg w-2/3 h-fit min-w-[300px] mb-8">
        {requesting
        ? <div className='w-full flex justify-center content-center'><Image unoptimized={true} src={'../loading.gif'} alt="Loading..." height={125} width={125} /></div>
        : <div className='flex flex-col'>
            <div>
                <h1 className="float-left text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-500 to-indigo-500 bg-clip-text text-transparent">What kind of entertainment are you looking for?</h1>
                <p className='float-left md:float-right text-right ml-2 md:ml-0 font-bold text-slate-400/80'>{tokens} tokens left</p>
            </div>
            
            <p className='float-left text-slate-400/80 p-2'>Enter movies or tv shows that match the vibe, storyline, visuals, or other trait that you are craving right now. The recommendation engine will use your selections to suggest titles that you might love. For optimal results, choose 3-5 movies/shows that most align with your preferences. </p>
            <form onSubmit={handleSubmit} className='w-full m-1'>
                <div className='flex flex-col md:flex-row mb-3 p-2'>
                    <div className='flex'>
                        <p className='mr-2 text-indigo-500/85 font-bold'>Include movies</p>
                        <input className="mr-6" type="checkbox" id="movies-checkbox" ref={moviesCheckbox} onChange={()=> forceUpdate()} defaultChecked={true}></input>
                    </div>
                    <div className='flex'>
                        <p className='mr-2 text-indigo-500/85 font-bold'>Include TV Series</p>
                        <input className="" type="checkbox" id="series-checkbox" ref={seriesCheckbox} onChange={()=> forceUpdate()} defaultChecked={true}></input>
                    </div>
                </div>

                {
                    (moviesCheckbox.current && seriesCheckbox.current && !moviesCheckbox.current.checked && !seriesCheckbox.current.checked) &&
                    <p className='text-red-500 font-semibold p-2'>At least one has to be checked!</p>
                }
                { //Check if message failed
                (items.length >= 7)
                ?   <p className='text-red-500 font-semibold'>Max movies reached</p>
                :   <div className='mb-4'>
                        <input type="text" id="textField" className="border border-indigo-300/80 p-2 rounded float-left w-9/12" placeholder="Enter a title you like" value={inputValue} onChange={handleChange} maxLength={60}></input>
                        <button type="submit" className="secondary-color-bg p-2 rounded float-right w-1/6 min-w-[50px]"><p className='main-text'>Add</p></button>
                    </div>
                }

                <ul className='mt-20'>
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
                <button type="button" onClick={()=>requestRecommendations(items, moviesCheckbox?.current?.checked, seriesCheckbox?.current?.checked)} className="secondary-color-bg p-2 w-full rounded mt-5"><p className='main-text'>Get recommendations</p></button>
            </form>
            <div>
            {(response && response.status == 200) &&
                <ul className='mt-4'>
                    {response.data.recommendations.map((item: Recommendation, index:string) => (
                        <li key={index}>
                            <div className='flex flex-col bg-slate-100 p-2 mb-2 rounded hover:bg-slate-200 w-full h-fit'>
                                <p className='text-indigo-500 float-left w-5/6 min-w-[150px] mb-1'>{item.title}</p>
                                {item.isMovie
                                ? <b>Movie</b>
                                : <b>TV Series</b>}
                                {item.isMovie && <p><b>Director: </b>{item.director}</p>}
                                <p><b>Description: </b>{item.description}</p>
                                <p><b>Reasoning: </b>{item.reasoning}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            }
            {(response && response.status == 403) &&
                <div className='mt-4'>
                    <p className='text-red-500 p-2'>Not enough tokens!</p>
                </div>
            }
            {(response && response.status != 200 && response.status != 403) &&
                <div className='mt-4'>
                    <p className='text-red-500 p-2'>Something went wrong...</p>
                </div>
            }
            </div>
        </div>
    }

    </div>
    );
}
