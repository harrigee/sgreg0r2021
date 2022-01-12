export function SideBar({ items }: { items: { uid: string, displayName: string, isOnline: boolean }[] }) {
  return <div className="w-64 p-6 bg-zinc-800 overflow-y-scroll">
    {items.map((item, i) =>
      <div
        className="flex items-center content-center my-4 mx-2 hover:animate-pulse"
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
        <p className="text-white text-left ml-2">
          {item.displayName}
        </p>
      </div>
    )}
  </div>;
}
