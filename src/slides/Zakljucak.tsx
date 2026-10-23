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
          blast radius i standardizirati development environment.
        </p>
        <ul>
          <li>
            Pretpostavi da <a>npm install</a> i <a>pip install</a> mogu
            izvršavati neprovjeren kod.
          </li>
          <li>Izoliraj dev environment kroz devcontainere.</li>
          <li>Koristi non-root setup i minimalne ovlasti.</li>
          <li>Zaključaj dependency graph (lockfile).</li>
          <li>Preferiraj pnpm jer je sigurniji.</li>
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
            <br />Have fun! Hack the world!</p>
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
          QR vodi na aktualni URL prezentacije i osvježava se periodički.
        </SpeakerNotes>
      </section>

      <section>
        <section>
          <h2>A sada zadatak!</h2>
          <p>Pogledaj ispod!</p>

        </section>

        <section>
          <pre>
            <code className="language-text" data-noescape>{`
# Naši stručnjaci presreli su čudnu poruku, možeš li je dešifrirati?

QnJhdm8hIEFrbyBvdm8gxI1pdGHFoSB1c3BpbyBzaSEgCgpaYWRhdGFrIGplOiAKcG9zbGF0aSBtYWlsIG5hIHphZGF0YWtAZWxpeGlyci5jb20KbmFzbG92YTogIlphZGF0YWsgYmFzZTY0IDxpbWVfcHJlemltZT4iIGkgCnNhZHLFvmFqYSAiZDN2YzBudGFpbmVyaSBzdSBjMDBsIiAKClBydmloIDUgb3N2YWphIEVsaXhpcnIgc3dhZyBpIG5ham5vdmlqZSBpbmZvcm1hY2lqZSBvIEVsaXhpcnIgYWthZGVtaWppLgo=

`}</code></pre>

<p>Možda će ti pomoći <a href="https://gchq.github.io/CyberChef/" target="_blank">Cyber Chef</a></p>

        </section>

      </section>
    </>
  );
}

export default Slide;
