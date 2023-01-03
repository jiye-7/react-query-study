import { useQuery, useMutation } from '@tanstack/react-query';

/**
 * issue: 각 게시글에 달린 댓글로 새로고침 되지 않는 이유 -> useQuery를 구현하는 방식의 결함때문
 */

const fetchComments = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
};

const deletePost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
};

const updatePost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
};

const PostDetail = ({ post }) => {
  /**
   * solution:
   * queryKey를 query에 대한 의존성 배열로 취급 -> queryKey가 update되면(post.id) react-query가 새 쿼리를 생성해서 staleTime과 cacheTime을 가지게 되고, 의존성 배열이 다르다면 완전히 다른 것으로 간주된다.
   * 데이터를 가져올 때 사용하는 queryFn에 있는 값이 queryKey에 포함되어야 한다.
   * -> 모든 comments 쿼리가 같은 쿼리로 간주되는 상황을 막고 각기 다른 쿼리로 다뤄진다.
   */
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comments', post.id], // 문자열 'comments'에 식별자(post.id)가 추가된 셈
    queryFn: () => fetchComments(post.id),
    staleTime: 2000,
  });

  /**
   * delete 버튼 클릭 시
   * 객체를 반환하는 deleteMutation과 속성 함수인 mutate를 실행하여 props에서 받은 postId가 무엇이든 상관없이 실행하게 된다.
   */
  /**
   * useMutation이 반환하는 객체와 속성(상태) 사용, 처리하는 방법 익히기
   */
  const deleteMutation = useMutation({
    // queryKey x: queryKey와 관련있는 cache 내부의 데이터와는 상관 없기 때문에 생략
    // useQuery에 인수로서 전달하는 queryFn과는 달리 인수로 전달하는 mutationFn의 경우 그 자체를 인수로 받을 수 있다.
    // useMutation에서 객체는 mutation 함수를 반환하게 된다.
    mutationFn: (postId) => deletePost(postId),
  });

  const updateMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
  });

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && (
        <>
          <h2>something error...</h2>
          <p>{error}</p>
        </>
      )}
      <h3 style={{ color: 'skyblue' }}>Title: {post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <span style={{ color: 'red' }}>Error deleting the post...</span>
      )}
      {deleteMutation.isLoading && (
        <span style={{ color: 'purple' }}>Deleting the post...</span>
      )}
      {deleteMutation.isSuccess && (
        <span style={{ color: 'green' }}>Post has (not) been deleted...</span>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isError && <span>Error updating the post...</span>}
      {updateMutation.isLoading && <span>Updating the post...</span>}
      {updateMutation.isSuccess && <span>Post has (not) been updated...</span>}
      <p>content: {post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
};

export default PostDetail;
