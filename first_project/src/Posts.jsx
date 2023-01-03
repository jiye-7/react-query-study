import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PostDetail from './PostDetail';

const maxPostPage = 10; // 100개의 data만 제공해주는데 limit을 10으로 요청하기 때문에 마지막 페이지를 10으로 설정

const fetchPosts = async (pageNum) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0${pageNum}`
  );
  return response.json();
};

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  // 기본값으로 3번 시도(횟수는 변경 가능)
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 2000,
  });

  console.log(data);

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
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((previousValue) => previousValue - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => setCurrentPage((previousValue) => previousValue + 1)}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
};

export default Posts;
