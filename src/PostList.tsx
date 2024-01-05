import { graphql, usePaginationFragment } from "react-relay"
import { PostList_posts_RefetchQuery } from "./__generated__/PostList_posts_RefetchQuery.graphql"
import { PostList_posts$key } from "./__generated__/PostList_posts.graphql"
import { PostItem } from "./PostItem"
import { useDeferredValue, useEffect, useState } from "react"
import { PostCreateForm } from "./PostCreateForm"

type PostListProps = {
  queryRef: PostList_posts$key
}

export const PostList: React.FC<PostListProps> = ({ queryRef }) => {
  const { data, hasNext, loadNext, isLoadingNext, refetch } = usePaginationFragment<
    PostList_posts_RefetchQuery,
    PostList_posts$key
  >(
    graphql`
      fragment PostList_posts on Query
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 3 }
        cursor: { type: "String" }
        where: { type: "QueryPostConnectionFilter" }
      )
      @refetchable(queryName: "PostList_posts_RefetchQuery")
      {
        posts(
          first: $count
          after: $cursor
          where: $where
        )
        @connection(key: "PostList_posts")
        {
          __id
          edges {
            node {
              id
              ...PostItem_post
            }
          }
        }
      }
    `,
    queryRef
  )

  return (
    <>
      <PostCreateForm
        connectionId={data.posts.__id}
      />

      <SearchInput
        onTitleChange={title => refetch({ where: { title }})}
      />
      {data.posts.edges.map(edge => {
        if (!edge?.node) return null

        return (
          <PostItem
            key={edge.node.id}
            postRef={edge.node}
          />
        )
      })}
      {hasNext && (
        <button
          disabled={isLoadingNext}
          onClick={() => loadNext(3)}
        >
          Load more
        </button>
      )}
    </>
  )
}

type SearchInputProps = {
  onTitleChange: (title: string) => void
}
const SearchInput: React.FC<SearchInputProps> = ({ onTitleChange }) => {
  const [searchTitle, setSearchTitle] = useState('')
  const deferredSearchTitle = useDeferredValue(searchTitle)
  useEffect(() => {
    onTitleChange(deferredSearchTitle)
  }, [deferredSearchTitle])

  return (
    <input
      placeholder="post title..."
      onChange={e => setSearchTitle(e.target.value)}
    />
  )
}
