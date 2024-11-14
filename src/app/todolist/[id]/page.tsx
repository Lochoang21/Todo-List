'use client'
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR, {Fetcher} from "swr";


const ViewDetail = ({ params }: { params: { id: string } }) => {

    const fetcher : Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
      `http://localhost:8000/todos/${params.id}`,
      fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }
    );
    if(isLoading){
        return <div>loading...</div>
      }
    console.log("check id: ", params.id);
    return (
        <div>
            ViewDetail = {params.id}
            <Card className="text-center">
                <Card.Header>Title: {data?.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                    {data?.content}
                    </Card.Text>
                </Card.Body>
               
            </Card>
            <Link className="btn btn-primary mt-3" href={'/todos'}>Back</Link>
        </div>
    )
}

export default ViewDetail;