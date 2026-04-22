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
    <footer
      className="w-full py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-5">
        {LINKS.map(({ icon: Icon, href, event, self: isSelf }) => (
          <button
            key={event}
            className="social-btn"
            onClick={() => {
              window.open(href, isSelf ? '_self' : '_blank');
              tracker.logEvent(event);
            }}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
      <span
        className="text-xs"
        style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: 'var(--text-2)', letterSpacing: '0.02em', fontSize: '0.6875rem' }}
      >
        Stefan Gregor © 2026
      </span>
    </footer>
  );
}
