function sortLargeToSmall(firstValue, secondValue) {
  return firstValue > secondValue ? -1 : firstValue < secondValue ? 1 : 0;
}

export default function doSortPosts(sortBy, posts) {
  switch (sortBy) {
    case "best":
      return posts.sort((a, b) => sortLargeToSmall(a.voteScore, b.voteScore));
    case "new":
      return posts.sort((a, b) => sortLargeToSmall(a.timestamp, b.timestamp));
    default:
      return posts;
  }
}
