import React from 'react'

interface Props {
    value: number,
    name: string,
    choice: string,
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Choice = ({ value, name, choice, onchange }: Props) => {
    let _value : string = ''

    switch (value) {
        case 0 : _value = 'a';
            break;
        case 1: _value = 'b';
            break;
        case 2: _value = 'c';
            break
    }

    return (
        <>
            <label className="flex items-center gap-2 cursor-pointer border-b-2 py-2 hover:bg-gray-200 duration-300 p-2 rounded-md">
                <input type="radio" name={name} className="radio radio-accent" value={_value}  onChange={onchange}/>
                <span className="">{choice}</span>
            </label>
        </>
    )
}

export default Choice
