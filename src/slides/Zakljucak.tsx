import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import SpeakerNotes from "../components/SpeakerNotes";

const SITE_URL = window.location.href;

function Slide() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [qrValue, setQrValue] = useState(`${SITE_URL}?ts=${Date.now()}`);

  useEffect(() => {
    const refreshQr = () => {
      const nextTimestamp = Date.now();
      setTimestamp(nextTimestamp);
      setQrValue(`${SITE_URL}?ts=${nextTimestamp}`);
    };

    refreshQr();
    const intervalId = window.setInterval(refreshQr, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  const formattedTimestamp = new Date(timestamp).toLocaleTimeString("hr-HR", {
    hour12: false,
  });

  return (
    <>
      <section>
        <h2>Zaključak</h2>
        <p>
          Kombinacija više sigurnih sustava može rezultirati nesigurnim
          ponašanjem.
        </p>
        <ul>
          <li>Mailboxes are alive, and they can act autonomously!</li>
          <li>Design for scanners, agents, not just humans!</li>
          <li>Require explicit intent for sensitive actions!</li>
          <li>Coordinate across vendors!</li>
          <li>Don't use Firebase! (Well sometimes you can't)</li>
          <li>
            Don't trust big tech blindly, that the systems they provide are
            safe!
          </li>
          <li>
            To mitigate this security issue implement{" "}
            <a href="https://github.com/gnekich/firebase-auth-safe-ui">
              your own verification frontend
            </a>
            .
          </li>
          <li>Don't do magic side effects!</li>
          <li>
            <a>"Don't be evil!"</a> - <strike>Google 1998-2015</strike>{" "}
          </li>
          <li>
            <a>Appeal rewards</a>, ask AI to help you be objective
          </li>
          <li>VRP's are drowning in slop.</li>
          <li>
            "Nobody cares. The safe internet is no more." - Friedrich Nietzsche
          </li>
        </ul>
        <SpeakerNotes>
          Zaključak je da sigurni sustavi mogu postati nesigurni kada se
          kombiniraju. Ključne smjernice su: - Dizajnirajte za skenere, agente,
          ne samo za ljude! - Za osjetljive akcije zahtijevajte eksplicitnu
          namjeru! - Koordinirajte se među dobavljačima!
        </SpeakerNotes>
      </section>
      <section>
        <section>
          <h1>Thank you</h1>
          <p>Questions?</p>
          <SpeakerNotes>
            Invite Q&A and revisit the two opening questions.
          </SpeakerNotes>
        </section>
         <section>
          <h3>Because you asked the question!</h3>
          <SpeakerNotes>
            Invite Q&A and revisit the two opening questions.
          </SpeakerNotes>
        </section>
        <section>
          <h1>You WON!</h1>
          <p>Unlocked NFC NTAG215 chip, with 540 bytes of storage!
            <br/>Have fun! Hack the world!</p>
          <p></p>
          <SpeakerNotes>
            Invite Q&A and revisit the two opening questions.
          </SpeakerNotes>
        </section>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Happy to discuss after the talk.</p>

        <div style={{ paddingTop: "24px" }}>
          <QRCodeSVG
            value={qrValue}
            size={220}
            bgColor="#ffffff"
            fgColor="#111111"
            includeMargin={true}
            marginSize={1}
          />
        </div>

        <SpeakerNotes>
          Optional closing slide to keep on screen while chatting. QR is link to
          this presentation.
        </SpeakerNotes>
      </section>
    </>
  );
}

export default Slide;
