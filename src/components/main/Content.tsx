import { useParams } from "react-router-dom";

export function Content({ name }: { name: string }) {

    const { wie_viel_daheim_parameter_id } = useParams();

    return <div className="flex m-10 bg-pink-500/100 text-white rounded-full px-10 py-8 hover:blur shadow-xl">
        <h1 className="text-4xl font-bold">
            {`${name}${wie_viel_daheim_parameter_id ? ` ${wie_viel_daheim_parameter_id}` : ''}`}
        </h1>
    </div>
}