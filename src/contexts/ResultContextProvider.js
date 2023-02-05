import React, {createContext, useContext, useState} from 'react'

const ResultContext = createContext()
const baseUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/"

export const ResultContextProvider = ({children}) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // /videos, /search, /images
    const getResults = async(type) => {
        setIsLoading(true);
        // console.log(type)
        const endpoint = `${baseUrl}${type}`
        console.log(endpoint)
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key':  process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        });

        const data = await response.json();

        

        setResults(data.value);
        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    );

}


export const useResultContext = () => useContext(ResultContext);