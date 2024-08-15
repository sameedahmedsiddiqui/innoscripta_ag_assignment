import { useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { errorPop } from '../utils';
import Articles from '../components/Articles';
import { NewsArticles } from '../utils/interfaces';
import { getNewsApiArticles, getNYTArticles, getTGArticles } from '../utils/Api/newsApi';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/Slicers/config';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const Feed = () => {
  const dispatch = useDispatch()
  const feedFilters = useSelector((state: RootState) => state.feedFilters)

  const {query, fromDate, toDate, source, category} = feedFilters

  const [articles, setArticles] = useState<NewsArticles[]>([])

  useEffect(() => {
    const feedFiltersValues = Object.values(feedFilters)
    if (feedFiltersValues.filter(x => x === '').length !== feedFiltersValues.length) {
      fetchArticlesData()
    }
  }, [])

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

  const fetchArticlesData = async () => {
    dispatch(setLoading(true))
    const newsArticles = getNewsApiArticles({
      q: query,
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
      q: query,
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
      q: query,
      ...nytDateFilter
    }).then((res) => res)

    serachFromAllSources({
      newsArticles: newsArticles,
      tgArticles: tgArticles,
      nytArticles: nytArticles
    })
  }
  
  return (
    <div className='flex gap-20 flex-col w-full'>
      <Articles 
        articles={articles}
        emptyString={<p className="w-full text-sm">No Feeds. Click <Link to={'/settings'} className='underline text-[#2563eb]'>here</Link> to generate feeds</p>}
      />
    </div>
  )
}