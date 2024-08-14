import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Bars } from 'react-loader-spinner';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, Route } from 'react-router-dom';
import { errorPop } from '../utils';
import Articles from '../components/Articles';
import { NewsArticles } from '../utils/interfaces';
import { getNewsApiArticles, getNYTArticles, getTGArticles } from '../utils/Api/newsApi';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/Slicers/config';

export const HomePage = () => {
  const dispatch = useDispatch()

  const [articles, setArticles] = useState<NewsArticles[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [source, setSource] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  const serachFromAllSources = (props) => {
    const {newsArticles, tgArticles, nytArticles} = props
    Promise.all([newsArticles, tgArticles, nytArticles]).then(([newsArticles, tgArticles, nytArticles]) => {
      const newsArticlesData: any = newsArticles
      const tgArticlesData: any = tgArticles
      const nytArticlesData: any = nytArticles

      setArticles([...newsArticlesData, ...tgArticlesData, ...nytArticlesData])
    }).catch(error => errorPop(error)).finally(() => {
      dispatch(setLoading(false))
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true))
    const newsArticles = getNewsApiArticles({
      q: searchQuery
    }).then((res) => res)

    const tgArticles = getTGArticles({
      q: searchQuery
    }).then((res) => res)

    const nytArticles = getNYTArticles({
      q: searchQuery
    }).then((res) => res)

    serachFromAllSources({
      newsArticles: newsArticles,
      tgArticles: tgArticles,
      nytArticles: nytArticles
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleFilter = async () => {
    dispatch(setLoading(true))
    const newsArticles = getNewsApiArticles({
      q: searchQuery,
      sources: source,
      from: fromDate,
      to: toDate,
    }).then((res) => res)

    let tgDateFilter = {}
    if (fromDate !== '' && toDate !== '') {
      tgDateFilter = {
        'from-date': fromDate,
        'to-date': toDate,
      }
    } else if (fromDate !== '') {
      tgDateFilter = {
        'from-date': fromDate
      }
    }

    let tgSecFilter = category !== '' ? {section: category} : {}

    const tgArticles = getTGArticles({
      q: searchQuery,
      ...tgSecFilter,
      ...tgDateFilter
    }).then((res) => res)

    let nytDateFilter = {}
    if (fromDate !== '' && toDate !== '') {
      nytDateFilter = {
        'begin_date': fromDate.replaceAll('-', ''),
        'to-date': toDate.replaceAll('-', ''),
      }
    } else if (fromDate !== '') {
      nytDateFilter = {
        'begin_date': fromDate.replaceAll('-', '')
      }
    }

    const nytArticles = getNYTArticles({
      q: searchQuery,
      ...nytDateFilter
    }).then((res) => res)

    serachFromAllSources({
      newsArticles: newsArticles,
      tgArticles: tgArticles,
      nytArticles: nytArticles
    })
  }
  
  return (
    <div className='flex gap-20 flex-col'>
      <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-10 place-content-center px-5'>
        <form onSubmit={(e) => handleSubmit(e)} className=''>
          <div className='flex bg-white rounded'>
              <input type="text" name="searchQuery" id="searchQuery" value={searchQuery} onChange={(e) => handleChange(e)} className='text-black px-3 w-full rounded text-sm' />
              <button type="submit" className='px-3 bg-gray-400 rounded'><FontAwesomeIcon icon={faMagnifyingGlass} size='sm' /></button>
          </div>
        </form>
        <div className='flex align-left gap-2'>
          <div className='flex gap-2 w-full'>
            <label htmlFor="fromDate" className='text-base text-left self-center'>From</label>
            <input type="date" name="fromDate" id="fromDate" className='rounded text-black text-sm px-3 w-full' value={fromDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setFromDate(e.target.value)} />
          </div>
        </div>
        <div className='flex align-left gap-2'>
          <div className='flex gap-2 w-full'>
            <label htmlFor="toDate" className='text-sm text-left self-center'>To</label>
            <input type="date" name="toDate" id="toDate" className='rounded text-black text-sm px-3 w-full' value={toDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setToDate(e.target.value)}  />
          </div>
        </div>
        <div className='flex align-left gap-2'>
          <div className='flex gap-2 w-full'>
            <label htmlFor="category" className='text-sm text-left self-center'>Category</label>
            <input type="text" name="category" id="category" className='rounded text-black text-sm px-3 w-full' value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
        </div>
        <div className='flex align-left gap-2'>
          <div className='flex gap-2 w-full'>
            <label htmlFor="source" className='text-sm text-left self-center'>Source</label>
            <input type="text" name="source" id="source" className='rounded text-black text-sm px-3 w-full' value={source} onChange={(e) => setSource(e.target.value)} />
          </div>
        </div>
        <div className='flex align-left gap-2'>
          <div className='flex gap-2 w-full'>
            <button type="button" className='text-sm bg-blue-600 px-5 rounded' onClick={handleFilter} >Filter</button>
          </div>
        </div>
      </div>
      <Articles 
        articles={articles}
        emptyString='Search to display result'
      />
    </div>
  )
}