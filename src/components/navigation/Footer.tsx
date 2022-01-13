import { BsGithub, BsLinkedin, BsTwitch, BsInstagram, BsMailbox2, BsTwitter } from 'react-icons/bs';

export function Footer() {
  return <div className="flex flex-col place-items-center">
    <div className="flex flex-row flex-wrap place-items-center justify-center text-white text-center mt-6 mb-2">
      <div className='mx-3 my-3'>
        <a target="_blank" rel="noopener noreferrer" href='https://github.com/harrigee'>
          <BsGithub size={32} />
        </a>
      </div>
      <div className='mx-3 my-3'>
        <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/stefan-gregor/'>
          <BsLinkedin size={28} />
        </a>
      </div>
      <div className='mx-3 my-3'>
        <a target="_blank" rel="noopener noreferrer" href='https://www.twitch.tv/sgreg0r'>
          <BsTwitch size={28} />
        </a>
      </div>
      <div className='mx-3 my-3'>
        <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/sgreg0r'>
          <BsTwitter size={28} />
        </a>
      </div>
      <div className='mx-3 my-3'>
        <a target="_blank" rel="noopener noreferrer" href='http://instagram.com/sgreg0r/'>
          <BsInstagram size={28} />
        </a>
      </div>
      <div className='mx-3 my-3'>
        <a target="_blank" rel="noopener noreferrer" href='mailto:rogfan@icloud.com'>
          <BsMailbox2 size={28} />
        </a>
      </div>
    </div>
    <div className="flex text-sm text-white mb-6">
      Stefan Gregor 2022
    </div>
  </div>;
}
