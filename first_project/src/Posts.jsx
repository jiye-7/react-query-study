import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PostDetail from './PostDetail';

const fetchPosts = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0'
  );
  return response.json();
};

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // 기본값으로 3번 시도(횟수는 변경 가능)
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 2000,
  });

  return (
    <>
      {isLoading && <h2>Loading... :)</h2>}
      {isError && (
        <>
          <h2>something wrong..</h2>/query/v4/docs/react/devtools
          <p>{error.toString()}</p>
        </>
      )}
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
};

export default Posts;
