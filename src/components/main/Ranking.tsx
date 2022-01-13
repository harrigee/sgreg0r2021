import { FaCrown } from 'react-icons/fa';

export function Ranking({ items, type }: { items: { uid: string, displayName: string, isOnline: boolean, charCount: number }[], type: 'horizontal' | 'vertical' }) {

  if (type === "horizontal") {
    return <div className="flex flex-row min-w-screen shadow-2xl scrollbar-hide bg-zinc-800 overflow-x-scroll">
      {items.map((item, i) =>
        <div
          className="flex flex-shrink-0 w-48 mx-4 my-4 items-center content-center hover:animate-pulse"
          key={item.displayName + i}>
          <div className={`flex-shrink-0 relative p-1 justify-center rounded-full bg-zinc-600 border-4 ${item.isOnline ? 'border-green-400' : 'border-pink-500'}`}>
            {i === 0 &&
              <div className="absolute -translate-y-4 translate-x-3 rotate-12">
                <FaCrown size={28} color='yellow' />
              </div>
            }
            <img
              width={40}
              height={40}
              alt="avatar"
              src={`https://avatars.dicebear.com/api/adventurer/${item.uid}.svg`} />
          </div>
          <div className="flex flex-col self-center">
            <p className="text-white text-sm text-left ml-4">
              {'#' + (i + 1) + ' ' + item.displayName}
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
        className="flex w-80 items-center content-center py-5 px-8 hover:animate-pulse"
        key={item.displayName + i}>
        <div className={`relative p-1 rounded-full bg-zinc-600 border-4 ${item.isOnline ? 'border-green-400' : 'border-pink-500'}`}>
          {i === 0 &&
            <div className="absolute -translate-y-5 translate-x-8 rotate-12">
              <FaCrown size={48} color='yellow' />
            </div>
          }
          <img
            width={i === 0 ? 92 : i === 1 ? 72 : 48}
            height={i === 0 ? 92 : i === 1 ? 72 : 48}
            alt="avatar"
            src={`https://avatars.dicebear.com/api/adventurer/${item.uid}.svg`} />
        </div>
        <div className="flex flex-col self-center grow">
          <p className="text-white text-m text-left ml-4">
            {'#' + (i + 1) + ' ' + item.displayName}
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
