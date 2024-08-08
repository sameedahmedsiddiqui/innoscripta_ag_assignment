
export interface NewsArticles {
	title: string,
	author: string,
	description: string,
	publishedAt: Date,
	urlToImage: string
}

export interface ArticleTileProps {
	articles: Array<NewsArticles>
}

export interface ArticlesProps {
	articles: Array<NewsArticles>
	itemsPerPage: number
}

