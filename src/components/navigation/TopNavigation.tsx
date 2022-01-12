export interface ITopNavigationItem {
  name: string;
  onClick: () => void;
}

export function TopNavigation({ items }: { items: ITopNavigationItem[] }) {
  return <div className="flex justify-end">
    {items.map((item, i) => <button
      onClick={item.onClick}
      key={item.name + i}
      className=" bg-sky-500 text-white hover:bg-pink-500 py-2 px-4 m-4 rounded-md">
      {item.name}
    </button>
    )}
  </div>;
}
