import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Bars } from 'react-loader-spinner';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, Route } from 'react-router-dom';
import { errorPop, successPop } from '../utils';
import Articles from '../components/Articles';
import { FeedFilterState, NewsArticles } from '../utils/interfaces';
import { getNewsApiArticles, getNYTArticles, getTGArticles } from '../utils/Api/newsApi';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/Slicers/config';
import { setFeedFilters } from '../store/Slicers/feedFilters';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const Settings = () => {
  const dispatch = useDispatch()
  const feedFilters = useSelector((state: RootState) => state.feedFilters)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [source, setSource] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  useEffect(() => {
    setSearchQuery(feedFilters.query)
    setFromDate(feedFilters.fromDate)
    setToDate(feedFilters.toDate)
    setCategory(feedFilters.category)
    setSource(feedFilters.source)
  }, [])

  const handleFilter = async () => {
    const filtersData: FeedFilterState = {
      query: searchQuery,
      fromDate: fromDate,
      toDate: toDate,
      source: source,
      category: category
    }
    dispatch(setFeedFilters(filtersData))
    successPop('Settings saved successfully')
  }
  
  return (
    // Making functional same filters as on home page due to not find options to search by the fields mentioned in the assignment
    <div className='flex gap-20 flex-col w-full'>
      <div className='grid grid-cols-1 gap-5 place-content-center px-5'>
        <div className='flex bg-white rounded'>
            <input type="text" name="searchQuery" id="searchQuery" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='text-black p-3 w-full rounded text-sm' />
        </div>
        <div className='flex align-left gap-10 mx-sm:!flex-col mx-sm:!gap-5'>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="fromDate" className='text-sm text-left'>From</label>
            <input type="date" name="fromDate" id="fromDate" className='rounded text-black text-sm p-3 w-full' value={fromDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="toDate" className='text-sm text-left'>To</label>
            <input type="date" name="toDate" id="toDate" className='rounded text-black text-sm p-3 w-full' value={toDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setToDate(e.target.value)}  />
          </div>
        </div>
        <div className='flex align-left gap-10 mx-sm:!flex-col mx-sm:!gap-5'>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="category" className='text-sm text-left'>Category</label>
            <input type="text" name="category" id="category" className='rounded text-black text-sm p-3 w-full' value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="source" className='text-sm text-left'>Source</label>
            <input type="text" name="source" id="source" className='rounded text-black text-sm p-3 w-full' value={source} onChange={(e) => setSource(e.target.value)} />
          </div>
        </div>
        <div className='flex align-left gap-2 mx-sm:!flex-col mx-sm:!gap-5'>
          <button type="button" className='text-sm bg-blue-600 p-3 w-full rounded' onClick={handleFilter} >Save Settings</button>
        </div>
      </div>
    </div>
  )
}