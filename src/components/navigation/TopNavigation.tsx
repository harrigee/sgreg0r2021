export interface ITopNavigationItem {
    name: string;
    onClick: () => void;
}

export function TopNavigation({ items }: { items: ITopNavigationItem[] }) {
    return <nav className="flex p-8">
        {items.map((item, i) => <button
            onClick={item.onClick}
            key={item.name + i}
            className=" bg-sky-500 text-white hover:bg-pink-600 active:blur py-2 px-4 mx-2 rounded-full">
            {item.name}
        </button>
        )}
    </nav>;
}