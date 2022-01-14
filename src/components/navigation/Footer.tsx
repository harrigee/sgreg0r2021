import firebase from "firebase/compat/app";

import {
  BsGithub,
  BsLinkedin,
  BsTwitch,
  BsInstagram,
  BsMailbox2,
  BsTwitter,
} from "react-icons/bs";

export function Footer({ tracker }: { tracker: firebase.analytics.Analytics }) {
  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-row flex-wrap place-items-center justify-center text-white text-center mt-6 mb-2">
        <div className="mx-3 my-3">
          <button
            onClick={() => {
              window.open("https://github.com/harrigee", "_blank");
              tracker.logEvent("link_clicked_github");
            }}
          >
            <BsGithub size={28} />
          </button>
        </div>
        <div className="mx-3 my-3">
          <button
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/stefan-gregor/",
                "_blank"
              );
              tracker.logEvent("link_clicked_linkedin");
            }}
          >
            <BsLinkedin size={28} />
          </button>
        </div>
        <div className="mx-3 my-3">
          <button
            onClick={() => {
              window.open("https://www.twitch.tv/sgreg0r", "_blank");
              tracker.logEvent("link_clicked_twitch");
            }}
          >
            <BsTwitch size={28} />
          </button>
        </div>
        <div className="mx-3 my-3">
          <button
            onClick={() => {
              window.open("https://twitter.com/sgreg0r", "_blank");
              tracker.logEvent("link_clicked_twitter");
            }}
          >
            <BsTwitter size={28} />
          </button>
        </div>
        <div className="mx-3 my-3">
          <button
            onClick={() => {
              window.open("http://instagram.com/sgreg0r/", "_blank");
              tracker.logEvent("link_clicked_instagram");
            }}
          >
            <BsInstagram size={28} />
          </button>
        </div>
        <div className="mx-3 my-3">
          <button
            onClick={() => {
              window.open("mailto:rogfan@icloud.com", "_self");
              tracker.logEvent("link_clicked_mail");
            }}
          >
            <BsMailbox2 size={28} />
          </button>
        </div>
      </div>
      <div className="flex text-sm text-white mb-6">Stefan Gregor 2022</div>
    </div>
  );
}
