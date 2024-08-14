import { formatArticleDate } from "../utils"
import { ArticleTileProps } from "../utils/interfaces"


const ArticleTile = (props: ArticleTileProps) => {
  const {articles, emptyString} = props

  return (
    <>
      {articles.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 md:!p-0 lg:!p-0 px-5 gap-8">
          {
            articles.map((x, i) => (
              <div key={i} className='flex flex-col gap-10 '>
                <div>
                  <img className='h-[200px] w-full' src={x.urlToImage} alt={x.title} />
                  <div className='flex flex-col gap-3 pt-5 text-left'>
                    <p className='text-xl font-bold'>{`${x?.title?.slice(0,40)}${x?.title?.length > 40 ? '...' : ''}`}</p>
                    <p className='text-sm'>{`${x?.description?.slice(0,100)}${x?.description?.length > 100 ? '...':''}`}</p>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <p className='text-xs text-left'>{x.author}</p>
                  <p className='text-xs text-right'>{formatArticleDate({date: x.publishedAt})}</p>
                </div>
              </div>
            ))
          }
        </div>
      ) : (
        <div className="justify-content-center w-full items-center h-full">
          <p className="w-full text-sm">{emptyString}</p>
        </div>
      )}

    </>
  )
}

export default ArticleTile