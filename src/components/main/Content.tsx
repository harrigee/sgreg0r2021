import { useParams } from "react-router-dom";

export function Content({ name }: { name: string }) {

    const { parameter } = useParams();

    return <div className="flex my-10 bg-pink-500/100 text-white rounded-full p-10 hover:blur shadow-xl">
        <h1 className="text-4xl font-bold">
            {`${name}${parameter ? ` ${parameter}` : ''}`}
        </h1>
    </div>
}