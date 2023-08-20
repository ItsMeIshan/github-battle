import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function fetchPopularRepos() {
  return fetch(
    "https://api.github.com/search/repositories?q=stars:>1+language:All&sort=stars&order=desc&type=Repositories"
  ).then((res) => res.json());
}

export async function getServerSideProps({ req, res }) {
  const repos = await fetchPopularRepos();
  return {
    props: {
      repos,
    },
  };
}
export default function Home({ repos }) {
  const reposQuery = useQuery(["repos"], () => fetchPopularRepos(), {
    initialData: repos,
  });
  console.log(reposQuery.data);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-2xl">Github Battle! 🚀</h1>
      {reposQuery.isError && <span>Oops Something Went Wrong!</span>}
      <ul>
        {reposQuery.data?.items?.map((item, idx) => {
          return <li key={idx}>{item?.name}</li>;
        })}
      </ul>
    </main>
  );
}
