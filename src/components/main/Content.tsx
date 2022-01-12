import { useParams } from "react-router-dom";

export function Content({ value, user }: { value?: string, user?: string }) {

    const { wie_viel_geheim_parameter_id } = useParams();

    return <div className="text-white self-center max-w-[50%] m-8">
        {value &&
            <div className="text-5xl font-bold text-left">
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