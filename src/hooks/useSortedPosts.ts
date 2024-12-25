import { useMemo } from "react";

function useSortedPosts(posts, filter) {
  return useMemo(() => {
    if (!posts) return [];

    let sorted = [...posts];

    if (filter.sort) {
      sorted = sorted.sort((a, b) => {
        let comparison = 0;

        switch (filter.sort) {
          case "date":
            comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            break;
          case "title":
            comparison = a.title.localeCompare(b.title);
            break;
          case "body":
            comparison = a.description.localeCompare(b.description);
            break;
          default:
            return 0;
        }

        return filter.direction === "asc" ? comparison : -comparison;
      });
    }

    return sorted;
  }, [posts, filter]);
}

export default useSortedPosts;
