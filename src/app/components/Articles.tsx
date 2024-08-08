import { useState } from "react";
import { ArticlesProps } from "../utils/interfaces"
import ArticleTile from "./ArticleTile"
import ReactPaginate from "react-paginate";

const Articles = (props: ArticlesProps) => {
  const {articles, itemsPerPage} = props
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState<number>(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = articles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(articles.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % articles.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <ArticleTile articles={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="previous"
          renderOnZeroPageCount={null}
          containerClassName="flex gap-3 justify-center"
          pageLinkClassName="py-2 px-4 border rounded bg-blue-500 border-blue-500 text-base self-center"
          nextLinkClassName="py-2 px-4 border rounded bg-blue-500 border-blue-500 text-base self-center"
          previousLinkClassName="py-2 px-4 border rounded bg-blue-500 border-blue-500 text-base self-center"
          activeLinkClassName="!bg-blue-800 !border-blue-800"
        />
      </div>
    </>
  )
}

export default Articles