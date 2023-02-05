import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Loading from './Loading'
import { useResultContext } from '../contexts/ResultContextProvider';

const Results = () => {
  const {results, isLoading, getResults, searchTerm} = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if(searchTerm){
      if(location.pathname === '/news'){
        console.log(location.pathname);
        getResults(`search/NewsSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=40&autoCorrect=true`);
      // }else if(location.pathname === '/images'){
      //   console.log(location.pathname);
      //   getResults(`Search/ImageSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`);
      }else{
        console.log(location.pathname);
        getResults(`Search/WebSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=40&autoCorrect=true`);
      }
    }

  }, [searchTerm, location.pathname])

  if(isLoading) return <Loading />

  // const names = results?.results?.map(item => item.url)
  // console.log(names)
  switch(location.pathname){
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.map((items, index) => (        
            <div key={index} className="md:w-2/5 w-full">
              <a href={items.url} target="_blank" rel="noreferrer">
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>{items.title}</p>
              </a>
              <p>{items.description.length > 100 ? items.description.substring(0, 100)+'...': items.description}</p>
            </div>
          )
          )}
        </div>
      );
    case '/news':
      return(
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.map((items, index) => (        
            <div key={index} className="md:w-2/5 w-full">
              <a href={items.url} target="_blank" rel="noreferrer">
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>{items.title}</p>
              </a>
              <p>{items.description.length > 100 ? items.description.substring(0, 100)+'...': items.description}</p>
            </div>
          )
          )}
      </div>
      );
    case '/images':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.map((items, index) => (        
            <div key={index} className="md:w-2/5 w-full">
              <a className='sm:p-3 p-5' href={items.webpageUrl} target="_blank" rel="noreferrer">
                <img src={items.url} alt={items.title} loading="lazy"/>
                <p className='w-36 break-words text-sm mt-2'>
                  {items.title}
                </p>
              </a>
            </div>
          )
          )}
        </div>
      );
    default:
      return 'ERROR';
  }
}

export default Results
