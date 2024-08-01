'use client'
import React, { useState, useEffect, useRef} from 'react';
import { ScheduleEvent } from './ScheduleEvent';

interface Props {
    schedule: ScheduleEvent[]
}


export default function DynamicTitle(props: Props) {
    const blurTime = 300;
    const optionSwitchTime = 2500;
    const maxHeight = 50;
    const animateThreshold = 0.3;
    const [titleState, setTitleState] = useState({
        text: "",
        schedule: props.schedule,
        startTime: Date.now()
        })

    const [options, setOptions] = useState([""]);

    const title = useRef<HTMLHeadingElement>(null);
    const [lastOption, setLastOption] = useState(0);
    const [hoverState, setIsHovered] = useState(
        {
            isHovering: false,
            optionIndex: 0,
        });
    var currentOptionIndex = 0;
    const onMouseEnter = () => setIsHovered(()=>{return {isHovering: true, optionIndex: currentOptionIndex}});
    const onMouseLeave = () => {
        setIsHovered(()=>{return {isHovering: false, optionIndex: currentOptionIndex}});
        setTitleState(prev=>{return {...prev, startTime: Date.now() - (hoverState.optionIndex+1)*optionSwitchTime + optionSwitchTime*animateThreshold}});
    }


    function getText()
    {
        if(title.current == null) return;

        if(titleState.text.includes("{centered}")) title.current.style.textAlign = 'center';
        else title.current.style.textAlign = 'left';
    
        if(options.length != 1)
        {
            currentOptionIndex = Math.floor((Date.now()-titleState.startTime)/optionSwitchTime % (options.length-1));
            var donePercentage = (Date.now()-titleState.startTime)/optionSwitchTime % (options.length-1) - currentOptionIndex;

            if(hoverState.isHovering)
            {
                currentOptionIndex = hoverState.optionIndex;
                donePercentage = 0.3;
            }
            const currentOption = options[currentOptionIndex];

            var opacity =  1;
            var height = 0;
            if(donePercentage < animateThreshold && Date.now()-titleState.startTime > optionSwitchTime)
            {
                opacity =  donePercentage/animateThreshold;
                height = maxHeight-donePercentage/animateThreshold*maxHeight;
            }
            if(donePercentage > 1-animateThreshold)
            {
                opacity =  1-(donePercentage-(1-animateThreshold))/animateThreshold;
                height = (1-(donePercentage-(1-animateThreshold))/animateThreshold*maxHeight);
            }
            const regex = /{options}.*?{end-options}/;
            title.current.innerHTML = titleState.text.replace(regex, "").replace("{centered}", "").trim() + ` <a style='opacity:${opacity}; position: relative; top: ${-height}px; right: -10px' class='underline decoration-dashed decoration-pink-500/[.66] bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 bg-clip-text font-main'>${currentOption}</a>`;

            //const optionText = document.getElementById("option-text");
            //console.log(optionText);
            //if(optionText != null) optionText.style.opacity = 10;
        }
        else
        {
            title.current.innerHTML = titleState.text.replace("{centered}", "").trim();
        }
    }
    useEffect(() =>{
        function parseText(text: string)
        {
            const regex = /{options}(.*?){end-options}/;
            var optionsMatch = text.match(regex);
            if(text.includes("{options}") && optionsMatch)
            {
                setOptions(optionsMatch[1].split("*;*"));
            }

        }
        function showNext()
        {
            var text = titleState.text;
            var schedule = [...titleState.schedule];
            var startTime = titleState.startTime;
            schedule.splice(0, 1);
            if(schedule.length != 0)
            {
                text = schedule[0].text;
                parseText(text);
                startTime = Date.now();
            }
            setTitleState(prev => {return {text: text, schedule:schedule, startTime: startTime}});
        }
        function applyStyling(state: number)
        {
            if(title.current)
            {
                title.current.style.filter = `blur(${Math.round(Math.abs(state)/500 * 5)}px)`;
            }
            //title.current.style.fontSize = `${Math.round((500-Math.abs(state))/500 * 24 + 12)}px`;
            //title.current.style.lineHeight = `${Math.round(500-(Math.abs(state))/500 * 24 + 16)}px`;

            return Math.round((Math.abs(state))/500 * 5);
        }

        function animate()
        {
            getText();
            if(title.current != null && titleState.schedule.length != 0 && titleState.startTime != 0)
            {
                var state = -blurTime + Date.now() - titleState.startTime;

                if(state > titleState.schedule[0].duration + blurTime)
                {
                    showNext();
                }
                else
                {
                    global.requestAnimationFrame(animate);
                    if(state < 0) // Unblurring
                    {
                        applyStyling(state);
                    }
                    else if(state >= 0 && state < titleState.schedule[0].duration) // Make sure text is completely unblurred
                    {
                        title.current.style.filter = `blur(0px)`;
                    }
                    else if(titleState.schedule[0].duration != -1 && state > titleState.schedule[0].duration)
                    {
                        applyStyling(state-titleState.schedule[0].duration);
                    }
                }
            }
            else {
                global.requestAnimationFrame(animate);
            }
        }

        animate();
    }, );
    return(
        <div className='w-full h-48'>
            <h1 ref={title} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="w-full h-full content-center align-middle bg-gradient-to-r from-indigo-500 via-violet-450 to-violet-500 inline-block text-transparent bg-clip-text font-main text-4xl font-semibold text-left subpixel-antialiased "></h1>
        </div>
    );
}
