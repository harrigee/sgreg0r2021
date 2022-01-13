export function Content({ value, user }: { value?: string, user?: string }) {
  const text = value && value !== '' ? value : 'Just write...'
  return <div className="text-white text-shadow self-center max-w-[50%] my-32 hover:opacity-80" >
    <p className="break-all text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-left">
      {text}
    </p>
    {user &&
      <p className="mt-4">
        {user}
      </p>
    }
  </div>
}
