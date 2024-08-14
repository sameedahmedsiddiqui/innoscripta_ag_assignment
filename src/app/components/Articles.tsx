import { ArticlesProps } from "../utils/interfaces"
import ArticleTile from "./ArticleTile"

const Articles = (props: ArticlesProps) => {
  const {articles, emptyString} = props

  return (
    <>
      <div className="flex flex-col gap-10 pb-10">
        <ArticleTile articles={articles} emptyString={emptyString} />
      </div>
    </>
  )
}

export default Articles