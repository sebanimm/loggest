import Post from "@/components/post";

const blogList = [
  {
    id: 0,
    title: "gentle",
    createdAt: "5/12/2053",
    content:
      "essential begun agree building bare dark dog sometime rabbit putting yourself see there verb old fruit summer bag watch concerned smoke additional take control",
    comments: 69,
    stars: 16,
  },
  {
    id: 1,
    title: "which",
    createdAt: "8/26/2075",
    content:
      "table guide tongue person run busy dollar satisfied everywhere previous mass hollow planet behind whose how face putting enter human passage indeed sink transportation",
    comments: 19,
    stars: 36,
  },
  {
    id: 2,
    title: "age",
    createdAt: "2/13/2074",
    content:
      "coming settlers thought thin stop give jump amount grandfather price path nearby folks put basic lay combination second silence baby soft corner however no",
    comments: 21,
    stars: 57,
  },
  {
    id: 3,
    title: "feet",
    createdAt: "5/2/2050",
    content:
      "terrible whispered road live double cheese sometime ten certain particularly instant including stepped thank thumb bar gun thee why whose adjective blind chance other",
    comments: 13,
    stars: 46,
  },
  {
    id: 4,
    title: "of",
    createdAt: "11/7/2108",
    content:
      "street me blind region design process against creature tightly daily forgotten title society ranch sell west partly mouse health getting control except art run",
    comments: 88,
    stars: 62,
  },
  {
    id: 5,
    title: "list",
    createdAt: "5/17/2050",
    content:
      "policeman task crack regular allow breeze probably differ planning boy atomic piano company information crop hay have welcome skill doll airplane worker population chart",
    comments: 6,
    stars: 59,
  },
];

export default function PostList() {
  return (
    <>
      {blogList.map((item) => (
        <Post key={item.id} {...item} />
      ))}
    </>
  );
}
