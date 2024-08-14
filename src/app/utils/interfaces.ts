
export interface NewsArticles {
	title: string,
	author: string,
	description: string,
	publishedAt: Date,
	urlToImage: string
}

export interface ArticleTileProps {
	articles: Array<NewsArticles>
	emptyString: string
}

export interface ArticlesProps {
	articles: Array<NewsArticles>
	emptyString: string
}

export interface Sources {
	id: string
	valule: string
}

export interface NewsArticlesProps {
  q?: string
  sources?: string
  from?: string
  to?: string
	sortBy?: string
	pageSize?: number
	page?: number
}



export interface FeedFilterState {
	query: string
	fromDate: string
	toDate: string
	category: string
	source: string
}

