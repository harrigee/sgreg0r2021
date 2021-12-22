import { useParams } from "react-router-dom";

export function Content({ name }: { name: string }) {

    const { wie_viel_geheim_parameter_id } = useParams();

    return <div className="inline-flex self-center m-10 bg-pink-600 text-white rounded-full mx-20 px-12 py-8 hover:blur shadow-xl">
        <h1 className="text-4xl font-bold text-center">
            {`${name}${wie_viel_geheim_parameter_id ? ` ${wie_viel_geheim_parameter_id}` : ''}`}
        </h1>
    </div>
}