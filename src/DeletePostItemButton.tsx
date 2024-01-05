import { graphql, useMutation } from "react-relay"
import { DeletePostItemButtonMutation } from "./__generated__/DeletePostItemButtonMutation.graphql"
import { toast } from "sonner"

type DeletePostItemButtonProps = {
  id: string
}

export const DeletePostItemButton: React.FC<DeletePostItemButtonProps> = ({ id }) => {
  const [mutate, isOnFly] = useMutation<DeletePostItemButtonMutation>(graphql`
    mutation DeletePostItemButtonMutation($input: PostDeleteInput!) {
      postDelete(input: $input) {
        __typename
        ... on PostNotExistError {
          message
        }
        ... on MutationPostDeleteSuccess {
          data {
            post {
              id @deleteRecord
            }
          }
        }
      }
    }
  `)

  return (
    <button
      onClick={() => {
        mutate({
          variables: { input: { id } },
          onCompleted: res => {
            if (res.postDelete.__typename === 'PostNotExistError') {
              toast.error(res.postDelete.message)
            }
          }
        })
      }}
      disabled={isOnFly}
    >
      delete
    </button>
  )
}
