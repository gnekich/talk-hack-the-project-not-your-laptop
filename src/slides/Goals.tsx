import SpeakerNotes from "../components/SpeakerNotes";
import { PRESENTATION_SOURCE_CODE_URL } from "../config";

function getDaysSinceReport() {
  const reportDate = new Date("2025-03-24T00:00:00");
  const now = new Date();
  const diffMs = now.getTime() - reportDate.getTime();

  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

function Slide() {
  const daysSinceReport = getDaysSinceReport();

  return (
    <>
      <section>
        <section>

        
        <h3 style={{ textAlign: "left" }}>
          <a>$</a> goals <a>-i</a> ./prezentacija.pdf.coruna.exe
        </h3>
        <ol style={{ marginBottom: "40px" }}>
          {/* <li>Spark discussion on prevention/remediation</li>
      
          <li>...it's the journey not the destination</li>
  */}
          <li>Upoznati se sa servisima (GCP Cloud, Firebase, etc.)</li>

          <li>
            Vidjeti kako bi ti servisi trebali funkcionirati.
          </li>

          <li>Kako ti servisi zaista funkcioniraju.</li>

          <li>
            Definirati uzrok problema, tko je zapravo kriv?
          </li>

          <li>Pronaći i izraditi fix.</li>

          <li>Zagolicati maštu oko relativno nove klase napada.<br/>(Jesu li agenti koji imaju pristup mailu još gori ili su to novi scanneri?)</li>

          <li>
            Naučiti svašta nešto novo iz mog iskustva u prijavi ovog problema.
          </li>

          <li>???</li>

          <li>
            <a>Hack the planet!</a> We'll do a live demo of the <a style={{ color: "red" }}> {daysSinceReport}-day</a> vulnerability
            in GCP production that is <a>"fixed"</a>. (Zero click authentication verification bypass)
          </li>
        </ol>
        <SpeakerNotes>
          okej, pa da vidimo, što su naši golovi za ovu prezentaciju.

          Prvo ćemo se upoznati sa servisima, zatim vidjeti kako bi oni trebali funkcionirati, a potom kako oni zapravo funkcioniraju.
          Nakon toga ćemo definirati uzrok problema, pronaći ili izraditi fix, 
          zapaliti raspravu o novoj klasi napada, 
          naučiti nešto novo iz mog iskustva i na kraju, 
          možda, hakirati planet.
        </SpeakerNotes>
        </section>
        <section>

<h3 style={{ textAlign: "left" }}>
          <a>$</a> man <a>.</a>
        </h3>

 <h3 style={{ textAlign: "left" }}>
          NAME
        </h3>
        <p style={{ textAlign: "left" }}>
          talk-hack-the-project-not-your-laptop [OPTIONS]... {'{firebase-public-credentials.json}'}
        </p>
        <h3 style={{ textAlign: "left" }}>
          SYNOPSIS
        </h3>
        <p style={{ textAlign: "left" }}>
          Ova prezentacija ima za cilj prikazati sigurnosne propuste Google Cloud Platforme, posebno u kontekstu Firebase servisa.
        </p>
        <h3 style={{ textAlign: "left" }}>
          DESCRIPTION
        </h3>
        <p style={{ textAlign: "left" }}>
          Prezentacija je potpuno interaktivna i kreirana pomoću Reveal.js-a.<br />
          Potpuno je Open Source i možete pregledati izvorni kod na <a href={`${PRESENTATION_SOURCE_CODE_URL}`}>GitHub-u</a>.
          <br />Oh da i sadrži live demo, PoC ranjivosti :)
        </p>
        <SpeakerNotes>
          
        </SpeakerNotes>
        </section>
      </section>
    </>
  );
}

export default Slide;
