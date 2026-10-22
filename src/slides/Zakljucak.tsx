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
          Ne možemo eliminirati sve supply chain rizike, ali možemo smanjiti
          blast radius i ubrzati oporavak.
        </p>
        <ul>
          <li>
            Pretpostavi da <a>npm install</a> i <a>pip install</a> mogu
            izvršavati neprovjeren kod.
          </li>
          <li>Izoliraj dev environment kroz devcontainere.</li>
          <li>Koristi non-root setup i minimalne ovlasti.</li>
          <li>Zaključaj dependency graph (lockfile discipline).</li>
          <li>Preferiraj pnpm zbog strožeg modela i reproducibilnosti.</li>
          <li>Redovito vježbaj rebuild + rotate + verify incident flow.</li>
          <li>
            Security nije checkbox nego <a>operativna rutina</a>.
          </li>
        </ul>
        <SpeakerNotes>
          Ključna poruka: sigurnost u razvoju nije alat nego dizajn procesa.
          Devcontainer i pnpm su vrlo praktični prvi koraci.
        </SpeakerNotes>
      </section>

      <section>
        <section>
          <h1>Thank you</h1>
          <p>Questions?</p>
          <SpeakerNotes>
            Pozovi publiku da podijeli kako trenutno izolira development
            okruženja i što im je najveći blocker.
          </SpeakerNotes>
        </section>
        <section>
          <h3>Checklist za ponijeti doma</h3>
          <ol style={{ textAlign: "left" }}>
            <li>Devcontainer baseline</li>
            <li>pnpm + frozen lockfile u CI-u</li>
            <li>Credential scoping i rotacija</li>
            <li>Dependency review kao dio code review-a</li>
          </ol>
          <SpeakerNotes>
            Zaključi s konkretnim akcijama koje tim može odraditi ovaj tjedan.
          </SpeakerNotes>
        </section>
      </section>

      <section>
        <h2>Contact</h2>
        <p>Happy to discuss after the talk.</p>
        <p style={{ fontSize: "0.65em", opacity: 0.75 }}>
          QR refresh: {formattedTimestamp}
        </p>

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
          QR vodi na aktualni URL prezentacije i osvježava se periodički.
        </SpeakerNotes>
      </section>
    </>
  );
}

export default Slide;
