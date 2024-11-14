'use client'
import AppContent from "@/components/app.content";
import useSWR from "swr";
const BlogsPage = () =>{
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/todos",
    fetcher,{
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  if(isLoading){
    return <div>loading...</div>
  }
    return(
        <div className="mt-3">
            <AppContent blogs={data}/>
        </div>
    )
}
export default BlogsPage;