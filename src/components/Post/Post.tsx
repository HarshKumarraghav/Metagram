import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useRef } from "react";
import PostCard from "./PostCard";
import { UnsplashPhotoData } from "../../../types/UnsplashPhotoData";

const Post = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteFetch();
  const lastPostRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  // useEffect(() => {
  //   console.log("entry");
  //   if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [hasNextPage, isFetchingNextPage, entry]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((post: UnsplashPhotoData, j: any) => {
            const isLastItem =
              i === data.pages.length - 1 && j === group.length - 1;
            return (
              <div key={post.id} ref={isLastItem ? ref : null}>
                <PostCard Item={post} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );
};

export default Post;