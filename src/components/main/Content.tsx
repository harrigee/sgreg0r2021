import { useParams } from "react-router-dom";

export function Content({ value, user }: { value?: string, user?: string }) {

  const { wie_viel_geheim_parameter_id } = useParams();

  return <div className="text-white self-center max-w-[50%] my-32 hover:opacity-80" >
    {value &&
      <div className="sm:text-4xl md:text-5xl lg:text-7xl font-bold text-left">
        {value}
      </div>
    }
    {wie_viel_geheim_parameter_id &&
      <div className="sm:text-2xl md:text-4xl lg:text-6xlfont-bold text-center">
        {wie_viel_geheim_parameter_id}
      </div>
    }
    {user &&
      <div className="mt-4">
        {user}
      </div>
    }
  </div>
}
