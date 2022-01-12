export function SideBar({ items }: { items: { uid: string, displayName: string, isOnline: boolean }[] }) {
  return <div className="w-64 p-4 bg-slate-700">
    {items.map((item, i) =>
      <div
        className="flex items-center content-center p-2 m-2"
        key={item.displayName + i}>
        <div className="flex items-end">
          <img
            className="m-1"
            width={40}
            height={40}
            alt="avatar"
            src={`https://avatars.dicebear.com/api/human/${item.uid}.svg`} />
          {item.isOnline && <div className="absolute place-self-end min-w-[12px] min-h-[12px] rounded-full bg-green-400" />}
          {!item.isOnline && <div className="absolute place-self-end min-w-[12px] min-h-[12px] rounded-full bg-pink-400" />}
        </div>
        <p className="text-white ml-4">
          {item.displayName}
        </p>
      </div>
    )}
  </div>;
}
