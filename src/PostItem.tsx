import { graphql, useFragment } from "react-relay"
import { PostItem_post$key } from "./__generated__/PostItem_post.graphql"
import { DeletePostItemButton } from "./DeletePostItemButton"

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
    <div>
      <p>
        {post.title}
      </p>
      <span>
        {post.content}
      </span>
      <DeletePostItemButton
        id={post.id}
      />
    </div>
  )
}
