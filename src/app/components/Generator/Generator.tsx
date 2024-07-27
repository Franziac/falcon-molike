'use client'
import Image from 'next/image';
import React, { useState , useRef} from 'react';

export default function Generator() {
    const [items, setItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

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
        addItem(inputValue);
        event.preventDefault();
        setInputValue("");
    };
    return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-fit min-w-[300px] mb-8">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"></link>
        <h1 className="text-2xl font-bold mb-3">What kind of movie are you looking for?</h1>
        <p className='text-slate-400'>Enter movies that represent the vibe, storyline, visuals, or other trait that you are craving right now. The suggestion engine will recommend you movies that it thinks you would enjoy based on the movies you enter.</p>
        <form onSubmit={handleSubmit} className='m-1'>
            <div className='mb-4'>
                <input type="text" id="textField" className="border border-gray-300 p-2 rounded float-left w-9/12" placeholder="Enter a movie you like" value={inputValue} onChange={handleChange}></input>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700- float-right w-1/6 min-w-[50px]">Add</button>
            </div>
            <br className='m-4'></br>
            <ul>
            {items.map((item, index) => (
                <li key={index}>
                <div className='bg-slate-100 p-2 mb-1 rounded hover:bg-slate-200 w-full h-12'>
                    <p className='text-sky-500 float-left w-5/6 min-w-[150px]'>{item}</p>
                    <button type='button' className='bg-red-400 rounded-md w-9 h-9 text-white float-right flex justify-center items-center' onClick={() => removeItem(items[index])}>
                        <Image src='../trash.svg' alt='-' width={18} height={18}></Image>
                    </button>
                </div>
                </li>
            ))}
            </ul>
            <br className='mb-1'></br>
            <button type="button" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700">Get suggestions</button>
        </form>
    </div>
    );
}
