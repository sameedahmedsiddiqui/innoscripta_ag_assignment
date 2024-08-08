import { formatArticleDate } from "../utils"
import { ArticleTileProps } from "../utils/interfaces"


const ArticleTile = (props: ArticleTileProps) => {
  const {articles} = props

  return (
    <div className='grid grid-cols-4 gap-8'>
      {articles.map((x, i) => (
        <div key={i} className='flex flex-col gap-10 '>
          <div>
            <img className='h-[200px] w-full' src={x.urlToImage} alt={x.title} />
            <div className='flex flex-col gap-3 pt-5 text-left'>
              <p className='text-xl font-bold'>{`${x?.title?.slice(0,40)}${x?.title?.length > 40 ? '...' : ''}`}</p>
              <p className='text-sm'>{`${x?.description?.slice(0,100)}${x?.description?.length > 100 ? '...':''}`}</p>
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='text-xs'>{x.author}</p>
            <p className='text-xs'>{formatArticleDate({date: x.publishedAt})}</p>
          </div>
        </div>
      ))}

    </div>
  )
}

export default ArticleTile