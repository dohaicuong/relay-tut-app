import { graphql, useMutation } from "react-relay"
import { PostCreateFormMutation, PostCreateInput } from "./__generated__/PostCreateFormMutation.graphql"
import { SubmitHandler, useForm } from "react-hook-form"

type PostCreateFormProps = {
  connectionId: string
}

export const PostCreateForm: React.FC<PostCreateFormProps> = ({ connectionId }) => {
  const [mutate, isOnFly] = useMutation<PostCreateFormMutation>(graphql`
    mutation PostCreateFormMutation(
      $input: PostCreateInput!,
      $connection: ID!
    ) {
      postCreate(input: $input)
      @appendNode(
        connections: [$connection],
        edgeTypeName: "QueryPostsConnectionEdge"
      )
      {
        post {
          ...PostItem_post
        }
      }
    }
  `)

  const { register, handleSubmit } = useForm<PostCreateInput>()
  const onSubmit: SubmitHandler<PostCreateInput> = data => {
    mutate({
      variables: {
        input: data,
        connection: connectionId
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder='title'
        disabled={isOnFly}
        {...register('title')}
      />
      <input
        placeholder='content'
        disabled={isOnFly}
        {...register('content')}
      />
      <button
        type='submit'
        disabled={isOnFly}
      >
        create
      </button>
    </form>
  )
}
