import { Search } from 'lucide-react';

type SearchInputProps = {
    value : string;
    onChange : (value : string) => void;
}

export default function SearchInput({value, onChange} : SearchInputProps)
{
    return(
        <div className="lg:w-[500px] flex flex-row justify-between
            h-8 rounded-sm items-center focus-within:ring-1 gap-2 border dark:border-white border-1 border-black
            px-2">
            <Search className="size-4" />
            <input type="text" name="" id="" className="w-full h-full
            focus:outline-none focus:ring-0 " value={value}
            onChange = {(e) => onChange(e.target.value)}>
            </input>
        </div>
    )
}
