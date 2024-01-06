import { graphql, useFragment } from "react-relay"
import { PostItem_post$key } from "./__generated__/PostItem_post.graphql"
import { DeletePostItemButton } from "./DeletePostItemButton"
import { ListDivider, ListItem, ListItemContent, Typography } from "@mui/joy"

type PostItemProps = {
  postRef: PostItem_post$key
}

export const PostItem: React.FC<PostItemProps> = ({ postRef }) => {
  const post = useFragment(
    graphql`
      fragment PostItem_post on Post {
        id
        title
        content
      }
    `,
    postRef
  )

  return (
    <>
      <ListItem
        endAction={<DeletePostItemButton id={post.id} />}
      >
        <ListItemContent>
          <Typography level="title-sm">
            {post.title}
          </Typography>
          <Typography level="body-sm" noWrap>
            {post.content}
          </Typography>
        </ListItemContent>
      </ListItem>
      <ListDivider />
    </>
  )
}
