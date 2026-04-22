import firebase from "firebase/compat/app";
import {
  BsGithub,
  BsLinkedin,
  BsTwitch,
  BsInstagram,
  BsTwitter,
  BsEnvelope,
} from "react-icons/bs";

const LINKS = [
  {
    icon: BsGithub,
    href: "https://github.com/harrigee",
    event: "link_clicked_github",
  },
  {
    icon: BsLinkedin,
    href: "https://www.linkedin.com/in/stefan-gregor/",
    event: "link_clicked_linkedin",
  },
  {
    icon: BsTwitch,
    href: "https://www.twitch.tv/sgreg0r",
    event: "link_clicked_twitch",
  },
  {
    icon: BsTwitter,
    href: "https://twitter.com/sgreg0r",
    event: "link_clicked_twitter",
  },
  {
    icon: BsInstagram,
    href: "http://instagram.com/sgreg0r/",
    event: "link_clicked_instagram",
  },
  {
    icon: BsEnvelope,
    href: "mailto:rogfan@icloud.com",
    event: "link_clicked_mail",
    self: true,
  },
];

export function Footer({ tracker }: { tracker: firebase.analytics.Analytics }) {
  return (
    <div className="bottom">
      <div className="left" />
      <div className="center">
        {LINKS.map(({ icon: Icon, href, event, self: isSelf }) => (
          <button
            key={event}
            className="social-btn"
            onClick={() => {
              window.open(href, isSelf ? "_self" : "_blank");
              tracker.logEvent(event);
            }}
            aria-label={event.replace("link_clicked_", "")}
          >
            <Icon size={15} />
          </button>
        ))}
      </div>
      <div className="right">
        <span>
          © stefan gregor · <b>2026</b>
        </span>
      </div>
    </div>
  );
}
