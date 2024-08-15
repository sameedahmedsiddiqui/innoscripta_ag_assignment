import axios from "axios"
import { NEWS_API_KEY, NEWS_API_URL, NYT_API_KEY, NYT_API_URL, NYT_IMG_URL, TG_API_KEY, TG_API_URL } from "../../../constants"
import { NewsArticles, NewsArticlesProps } from "../interfaces"
import { errorPop } from ".."

const getNewsApiArticles = async (props: NewsArticlesProps) => {
  try {
    const url = `${NEWS_API_URL}v2/everything`
    const options = {
      params: {
        apiKey: NEWS_API_KEY,
        pageSize: 10,
        ...props
      }
    }

    const result = await getRequest({
      reqUrl: url,
      options: options
    })
    console.log('articles', result)
    
    if (result?.data?.status === 'ok') {
      const resultData: NewsArticles[] = result?.data?.articles
      return resultData
      // return result?.data?.articles
    } else {
      throw new Error(result?.data?.message)
    }

  } catch (error: any) {
    errorPop(`NewsAPI error: ${error?.message}`)
  }
}

const getNewsApiSources = async () => {
  try {
    const getNewApiSources = await axios.get(`${NEWS_API_URL}v2/top-headlines/sources`, {
      params: {
        apiKey: NEWS_API_KEY
      }
    })
    if (getNewApiSources?.data?.status === 'ok') {
      return getNewApiSources?.data?.sources?.map((x: any) => {
        return {
          id: x.id,
          value: x.name
        }
      })
    } else {
      errorPop(`Sources: ${getNewApiSources?.data?.message}`)
    }
  } catch (error: any) {
    errorPop(`Sources: ${error?.message}`)
  }
}

const getTGArticles = async (props) => {
  try {
    const result = await getRequest({
      reqUrl: `${TG_API_URL}search`, 
      options: {
        params: {
          'api-key': TG_API_KEY,
          'page-size': 10,
          'show-fields': 'thumbnail',
          ...props
        }
      }
    })
    if (result?.data?.response?.status === 'ok') {
      const resultData: NewsArticles[] = result?.data?.response?.results?.map((x) => {
        return {
          title: x.webTitle,
          author: 'The Guardian',
          description: x.webTitle,
          publishedAt: x.webPublicationDate,
          urlToImage: x.fields.thumbnail
        }
      })
      return resultData
    }
  } catch (error) {
    errorPop(`The Guradian error: ${error}`)
  }
}

const getNYTArticles = async (props) => {
  try {
    const result = await getRequest({
      reqUrl: `${NYT_API_URL}articlesearch.json`, 
      options: {
        params: {
          'api-key': NYT_API_KEY,
          ...props
        }
      }
    })
    
    if (result?.data?.status === 'OK') {
      const resultData: NewsArticles[] = result?.data?.response?.docs?.map((x) => {
        return {
          title: x.headline.main,
          author: x.byline.original,
          description: x.abstract,
          publishedAt: x.pub_date,
          urlToImage: x.multimedia?.length > 0 ? `${NYT_IMG_URL}${x.multimedia[0]?.url}` : ``
        }
      })
      return resultData
    }
  } catch (error) {
    errorPop(`The NYT error: ${error}`)
  }
}

const getRequest = async (props) => {
  const {reqUrl, options} = props
  return await axios.get(reqUrl, options)
}

export {
  getNewsApiArticles,
  getNewsApiSources,
  getTGArticles,
  getNYTArticles
}