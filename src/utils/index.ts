export const compareByTitle = (a: { title: string }, b: { title: string }) => {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

export const compareByPriority = (
  a: { priority: string },
  b: { priority: string }
) => {
  if (a.priority < b.priority) return -1;
  if (a.priority === "média") return -1;
  if (a.priority > b.priority) return 1;
  return 0;
};
