import { graphql, usePaginationFragment } from "react-relay"
import { PostList_posts_RefetchQuery } from "./__generated__/PostList_posts_RefetchQuery.graphql"
import { PostList_posts$key } from "./__generated__/PostList_posts.graphql"
import { PostItem } from "./PostItem"
import React, { useDeferredValue, useEffect, useState } from "react"
import { PostCreateForm } from "./PostCreateForm"
import { Box, CircularProgress, Container, Input, List, ListItem, ListItemButton, ListItemContent, Stack, Typography } from "@mui/joy"

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
    <Stack direction='row' spacing={2}>
      <Box p={2}>
        <Typography level='title-lg'>
          Create your post
        </Typography>
        <PostCreateForm
          connectionId={data.posts.__id}
        />
      </Box>

      <Container maxWidth='xs' sx={{ p: 2 }}>
        <List
          variant='outlined'
          sx={{ borderRadius: 6 }}
        >
          <PostListTitle>
            Post list
          </PostListTitle>
          
          <SearchInput
            onTitleChange={title => refetch({ where: { title }})}
          />

          <Box height={14} />

          {data.posts.edges.map(edge => {
            if (!edge?.node) return null

            console.log(edge.node.id)

            return (
              <PostItem
                key={edge.node.id}
                postRef={edge.node}
              />
            )
          })}
          {hasNext && (
            <LoadMoreButtonItem
              isLoading={isLoadingNext}
              onClick={() => loadNext(3)}
            />
          )}
        </List>
      </Container>
    </Stack>
  )
}

const PostListTitle = ({ children }: { children: React.ReactNode }) => (
  <ListItem>
    <ListItemContent>
      <Typography level='title-md'>
        {children}
      </Typography>
    </ListItemContent>
  </ListItem>
)

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
    <ListItem>
      <Input
        placeholder="post title..."
        onChange={e => setSearchTitle(e.target.value)}
        fullWidth
      />
    </ListItem>
  )
}

type LoadMoreButtonItemProps = {
  onClick?: () => void
  isLoading?: boolean
}
const LoadMoreButtonItem: React.FC<LoadMoreButtonItemProps> = ({
  isLoading,
  onClick
}) => {
  return (
    <ListItem
      endAction={isLoading && <CircularProgress size='sm' />}
    >
      <ListItemButton
        disabled={isLoading}
        onClick={onClick}
      >
        <ListItemContent>
          Load more
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  )
}
