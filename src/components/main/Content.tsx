export function Content({ value, user }: { value?: string, user?: string }) {
  const text = value && value !== '' ? value : 'Just write...'
  return <div className="text-white text-shadow self-center max-w-[50%] my-32 hover:opacity-80" >
    <div className="mobile:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-left">
      {text}
    </div>
    {user &&
      <div className="mt-4">
        {user}
      </div>
    }
  </div>
}
