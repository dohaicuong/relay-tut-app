import { graphql, useLazyLoadQuery } from 'react-relay'
import { AppQuery } from './__generated__/AppQuery.graphql'
import { PostList } from './PostList'

export const App = () => {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        ...PostList_posts
      }
    `,
    {}
  )

  return (
    <PostList
        queryRef={data}
      />
  )
}
