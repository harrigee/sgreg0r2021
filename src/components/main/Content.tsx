import { useParams } from "react-router-dom";

export function Content({ value, user }: { value?: string, user?: string }) {

  const { wie_viel_geheim_parameter_id } = useParams();

  return <div className="text-white text-shadow self-center max-w-[50%] my-32 hover:opacity-80" >
    {value &&
      <div className="mobile:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-left">
        {value}
      </div>
    }
    {wie_viel_geheim_parameter_id &&
      <div className="mobile:text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed font-bold text-center">
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
