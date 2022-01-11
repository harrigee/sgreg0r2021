export function SideBar({ items }: { items: { displayName: string, isOnline: boolean }[] }) {
    return <div className="absolute flex flex-col left-0 pt-8 pb-8 px-8 bg-slate-800">
        {items.map((item, i) =>
            <div
                className="flex flex-row place-items-center p-2"
                key={item.displayName + i}>
                {item.isOnline && <div className="h-2 w-2 rounded-full bg-green-400" />}
                {!item.isOnline && <div className="h-2 w-2 rounded-full bg-pink-400" />}
                <button
                    onClick={() => false}
                    className="text-white rounded-md ml-2">
                    {item.displayName}
                </button>
            </div>
        )}
    </div>;
}