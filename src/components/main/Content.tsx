import { useParams } from "react-router-dom";

export function Content({ value, user }: { value?: string, user?: string }) {

    const { wie_viel_geheim_parameter_id } = useParams();

    return <div className="self-center m-10 bg-pink-600 text-white rounded-full mx-20 px-12 py-8 shadow-xl">
        <div className="text-4xl font-bold text-center">
            {`${value}${wie_viel_geheim_parameter_id ? ` ${wie_viel_geheim_parameter_id}` : ''}`}
        </div>
        {user &&
            <div>
                {'' + user}
            </div>
        }
    </div>
}