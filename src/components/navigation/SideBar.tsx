export function SideBar({ items }: { items: { uid: string, displayName: string, isOnline: boolean }[] }) {
  return <div className="p-4 w-64 bg-slate-700 overflow-y-scroll">
    {items.map((item, i) =>
      <div
        className="flex items-center content-center p-2 m-2 hover:animate-pulse"
        key={item.displayName + i}>
        <div className="flex">
          <div className="flex w-[48px] h-[48px]">
            <img
              width={48}
              height={48}
              alt="avatar"
              src={`https://avatars.dicebear.com/api/human/${item.uid}.svg`} />
          </div>
          {item.isOnline && <div className="relative right-2 w-[12px] h-[12px] rounded-full bg-green-400" />}
          {!item.isOnline && <div className="relative right-2 w-[12px] h-[12px] rounded-full bg-pink-400" />}
        </div>
        <p className="text-white text-left">
          {item.displayName}
        </p>
      </div>
    )}
  </div>;
}
