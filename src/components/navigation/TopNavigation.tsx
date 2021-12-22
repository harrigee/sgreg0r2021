import { Link, To } from "react-router-dom";

export interface ITopNavigationItem {
    name: string;
    to: To;
}

export function TopNavigation({ items }: { items: ITopNavigationItem[] }) {
    return <nav className="flex p-8">
        {items.map(item => <Link to={item.to} className=" bg-sky-500 text-white hover:bg-pink-600 active:blur py-2 px-4 mx-2 rounded-full">
            {item.name}
        </Link>
        )}
    </nav>;
}