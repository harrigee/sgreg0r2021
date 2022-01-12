import { useParams } from "react-router-dom";

export function Content({ value, user }: { value?: string, user?: string }) {

    const { wie_viel_geheim_parameter_id } = useParams();

    return <div className="bg-pink-600 text-white self-center max-w-[50%] min-w-[300px] rounded-2xl px-12 py-8 m-8 shadow-xl">
        {value &&
            <div className="text-4xl font-bold text-center">
                {value}
            </div>
        }
        {wie_viel_geheim_parameter_id &&
            <div className="text-4xl font-bold text-center">
                {wie_viel_geheim_parameter_id}
            </div>
        }
        {user &&
            <div className="mt-2">
                {'- ' + user}
            </div>
        }
    </div>
}