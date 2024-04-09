"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "./Input";
import useDebounce from "@/hooks/useDebounce";
import { set } from "react-hook-form";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue,   
        };

        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        });

        router.push(url);
    }, [debouncedValue, router]);

    return ( 
        <Input 
            placeholder="What do you want to search for?"
            value={value}
            onChange={(e)=>setValue(e.target.value)}/>
    );
}
export default SearchInput;