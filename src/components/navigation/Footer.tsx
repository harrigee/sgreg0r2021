import { BsGithub, BsLinkedin, BsTwitch, BsInstagram, BsMailbox2, BsTwitter } from 'react-icons/bs';

export function Footer() {
  return <div className="flex flex-col place-items-center">
    <div className=" text-white text-center flex flex-row mt-8 mb-4">
      <div className='mr-3'>
        <a target="_blank" rel="noopener noreferrer" href='https://github.com/harrigee'>
          <BsGithub size={32} />
        </a>
      </div>
      <div className='mx-3'>
        <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/stefan-gregor/'>
          <BsLinkedin size={32} />
        </a>
      </div>
      <div className='mx-3'>
        <a target="_blank" rel="noopener noreferrer" href='https://www.twitch.tv/sgreg0r'>
          <BsTwitch size={32} />
        </a>
      </div>
      <div className='mx-3'>
        <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/sgreg0r'>
          <BsTwitter size={32} />
        </a>
      </div>
      <div className='mx-3'>
        <a target="_blank" rel="noopener noreferrer" href='http://instagram.com/sgreg0r/'>
          <BsInstagram size={32} />
        </a>
      </div>
      <div className='ml-3'>
        <a target="_blank" rel="noopener noreferrer" href='mailto:rogfan@icloud.com'>
          <BsMailbox2 size={32} />
        </a>
      </div>
    </div>
    <div className="flex text-white mb-4">
      Stefan Gregor 2022
    </div>
  </div>;
}
