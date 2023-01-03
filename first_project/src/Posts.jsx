import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PostDetail from './PostDetail';

/**
 * pagination을 구현 -> loading indicator로인해 사용자 경험이 좋지 않은 이슈 -> 페이지에 캐시가 없기 때문에 next page를 누를 때 마다 페이지가 로딩되길 기다려야 했다.
 * 해결: 데이터를 미리 가져와 캐시에 넣어서 사용자가 기다릴 필요 없도록 해결
 * Prefetching: data를 cache에 추가하며 구성할 수 있지만 기본값으로 stale(만료) 상태, queryClient의 prefetchQuery 메소드를 사용
 */

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

  const queryClient = useQueryClient();

  useEffect(() => {
    // 9페이지 이전이라면 prefetching이 이루어지지만 10페이지라면 미리 가져올 데이터가 없다.
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery({
        queryKey: ['posts', nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);

  // 기본값으로 3번 시도(횟수는 변경 가능)
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 2000,
    // queryKey가 바뀔 때도 지난 데이터를 유지해서 이전 페이지로 돌아갔을 경우에 Cache에 해당 데이터가 있도록 만들고 싶다.
    keepPreviousData: true,
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
