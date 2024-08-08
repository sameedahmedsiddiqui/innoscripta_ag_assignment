import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './app/store/store';
import { useDispatch } from 'react-redux';
import { decrement, increment } from './app/store/Slicers/counter';
import axios from 'axios';
import { NEWS_API_KEY, NEWS_API_URL } from './constants';
import { formatArticleDate } from './app/utils';
import { NewsArticles } from './app/utils/interfaces';
import ArticleTile from './app/components/ArticleTile';
import Articles from './app/components/Articles';

// interface NewsArticles {
//   title: string,
//   author: string,
//   description: string,
//   publishedAt: Date,
//   urlToImage: string
// }

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  const [articles, setArticles] = useState<NewsArticles[]>([])
  const [articlesPerPage, setArticlesPerPagee] = useState<number>(20)
  // const newsApi = new NewsApi('e497c6e3d02e4999967b7d048588561b')

  useEffect(() => {
    axios.get(`${NEWS_API_URL}v2/everything?q=bitcoin&apiKey=${NEWS_API_KEY}`).then((res) => {
      console.log('fetch everything', res)
      if (res?.data?.status === 'ok') {
        setArticles([...res?.data?.articles])
        
      }
    }).catch(error  => console.log('fetch error', error))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
          <div className='container py-20'>
            <Articles 
              articles={articles}
              itemsPerPage={articlesPerPage}
            />
            {/* <button onClick={() => dispatch(increment())} >+</button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())} >-</button> */}

          </div>
      </header>
    </div>
  );
}

export default App;
