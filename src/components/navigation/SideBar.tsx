export function SideBar({ items }: { items: { uid: string, displayName: string, isOnline: boolean, charCount: number }[] }) {
  return <div className="w-8 bg-green-400 scrollbar-hide transition-all ease-in-out duration-500 hover:w-80 hover:bg-zinc-800 pt-16 overflow-y-scroll overflow-x-hidden">
    <div>
      {items.map((item, i) =>
        <div
          className="flex w-80 tems-center content-center py-4 px-8 hover:animate-pulse"
          key={item.displayName + i}>
          <div className={`flex p-2 rounded-full bg-zinc-600 border-4 ${item.isOnline ? 'border-green-400' : 'border-pink-500'}`}>
            <img
              width={40}
              height={40}
              alt="avatar"
              src={`https://avatars.dicebear.com/api/avataaars/${item.uid}.svg`} />
          </div>
          <div className="flex flex-col self-center grow">
            <p className="text-white text-m text-left ml-4">
              {item.displayName}
            </p>
            <div className="flex flex-row">
              <p className="text-white text-3xl font-bold text-left self-end ml-4">
                {item.charCount ?? 0}
              </p>
              <p className="text-white text-xs ml-1 self-end">
                {'pt'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>;
}
