export function SideBar({ items }: { items: { uid: string, displayName: string, isOnline: boolean }[] }) {
  return <div className="w-8 bg-green-400 transition-all ease-in-out duration-500 hover:w-80 hover:bg-zinc-800 pt-8 overflow-y-scroll overflow-x-hidden">
    <div>
      {items.map((item, i) =>
        <div
          className="flex w-80 tems-center content-center py-2 px-8 hover:animate-pulse"
          key={item.displayName + i}>
          <div className={`flex p-2 rounded-full bg-zinc-600 border-4 ${item.isOnline ? 'border-green-400' : 'border-pink-500'}`}>
            <img
              width={48}
              height={48}
              alt="avatar"
              src={`https://avatars.dicebear.com/api/avataaars/${item.uid}.svg`} />
          </div>
          <h1 className="text-white font-medium text-left self-center ml-4">
            {item.displayName}
          </h1>
        </div>
      )}
    </div>
  </div>;
}
