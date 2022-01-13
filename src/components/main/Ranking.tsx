import { FaCrown } from 'react-icons/fa';

export function Ranking({ items, type }: { items: { uid: string, displayName: string, isOnline: boolean, charCount: number }[], type: 'horizontal' | 'vertical' }) {

  if (type === "horizontal") {
    return <div className="flex flex-row min-w-screen shadow-2xl scrollbar-hide bg-zinc-800 overflow-x-scroll">
      {items.map((item, i) =>
        <div
          className="flex flex-shrink-0 w-36 mx-4 my-4 items-center content-center hover:animate-pulse"
          key={item.displayName + i}>
          <div className={`flex-shrink-0 relative p-2 justify-center rounded-full bg-zinc-600 border-4 ${item.isOnline ? 'border-green-400' : 'border-pink-500'}`}>
            {i === 0 &&
              <div className="absolute -translate-y-3 translate-x-2 rotate-12">
                <FaCrown size={16} color='yellow' />
              </div>
            }
            <img
              width={i === 0 ? 32 : i === 1 ? 24 : 16}
              height={i === 0 ? 32 : i === 1 ? 24 : 16}
              alt="avatar"
              src={`https://avatars.dicebear.com/api/avataaars/${item.uid}.svg`} />
          </div>
          <div className="flex flex-col self-center">
            <p className="text-white text-sm text-left ml-4">
              {item.displayName}
            </p>
            <div className="flex flex-row">
              <p className="text-white text-xl font-bold text-left self-end ml-4">
                {item.charCount ?? 0}
              </p>
              <p className="text-white text-xs ml-1 self-end">
                {'pt'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>;
  }

  return <div className="w-8 bg-green-400 shadow-2xl scrollbar-hide transition-all ease-in-out duration-500 hover:w-80 hover:bg-zinc-800 pt-16 overflow-y-scroll overflow-x-hidden">
    {items.map((item, i) =>
      <div
        className="flex w-80 items-center content-center py-4 px-8 hover:animate-pulse"
        key={item.displayName + i}>
        <div className={`relative p-2 rounded-full bg-zinc-600 border-4 ${item.isOnline ? 'border-green-400' : 'border-pink-500'}`}>
          {i === 0 &&
            <div className="absolute -translate-y-5 translate-x-5 rotate-12">
              <FaCrown size={40} color='yellow' />
            </div>
          }
          <img
            width={i === 0 ? 64 : i === 1 ? 48 : 24}
            height={i === 0 ? 64 : i === 1 ? 48 : 24}
            alt="avatar"
            src={`https://avatars.dicebear.com/api/avataaars/${item.uid}.svg`} />
        </div>
        <div className="flex flex-col self-center grow">
          <p className="text-white text-m text-left ml-4">
            {item.displayName}
          </p>
          <div className="flex flex-row">
            <p className={`text-white ${i === 0 ? 'text-3xl' : i === 1 ? 'text-2xl' : 'text-xl'} font-bold text-left self-end ml-4`}>
              {item.charCount ?? 0}
            </p>
            <p className="text-white text-xs ml-1 self-end">
              {'pt'}
            </p>
          </div>
        </div>
      </div>
    )
    }
  </div >;
}
