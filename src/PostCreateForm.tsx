import { graphql, useMutation } from "react-relay"
import { PostCreateFormMutation, PostCreateInput } from "./__generated__/PostCreateFormMutation.graphql"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button, Input, Stack } from "@mui/joy"

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
      {
        post
        @appendNode(
          connections: [$connection],
          edgeTypeName: "QueryPostsConnectionEdge"
        )
        {
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
      <Stack mt={2} spacing={2}>
        <Input
          placeholder='title'
          disabled={isOnFly}
          {...register('title')}
        />
        <Input
          placeholder='content'
          disabled={isOnFly}
          {...register('content')}
        />
        <Button
          type='submit'
          disabled={isOnFly}
        >
          create
        </Button>
      </Stack>
    </form>
  )
}
