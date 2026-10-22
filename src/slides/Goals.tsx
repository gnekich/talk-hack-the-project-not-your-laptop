import SpeakerNotes from "../components/SpeakerNotes";
import { PRESENTATION_SOURCE_CODE_URL } from "../config";

function Slide() {
  return (
    <>
      <section>
        <section>
          <h4 style={{ textAlign: "left" }}>
            <a>$</a> goals <a>-i</a> ./hack-the-project-not-your-laptop.ppt.exe
          </h4>
          <ol style={{ marginBottom: "40px" }}>
            <li>
              Definirati <a>supply chain</a> rizike u developmentu (npm / pip).
            </li>
            <li>
              Objasniti zašto je <a>developerov laptop</a> često najveći blast radius.
            </li>
            <li>
              Pokazati kako <a>devcontaineri</a> izoliraju runtime i
              ograničavaju štetu.
            </li>
            <li>
              Objasniti razliku između kontejnera i virtualnih mašina.
            </li>
            <li>
              Proći kroz <a>pnpm vs npm</a> prednosti iz perspektive sigurnosti.
            </li>
            <li>
              Složiti praktičan playbook: Što sutra možete uvesti bez velikog
              procesa.
            </li>
            <li>Napraviti mini demo napada iz perspektive napadača.</li>
          </ol>
          <SpeakerNotes>
            Danas ne pričamo o jednom framework bug-u, nego o svakodnevnoj navici
            koju svi imamo: npm install i pip install.
            <br />
            <br />
            Fokus je na blast radiusu: čak i ako se incident dogodi, koliko
            daleko se šteta može proširiti.
          </SpeakerNotes>
        </section>

        <section>
          <h3 style={{ textAlign: "left" }}>
            <a>$</a> man <a>.</a>
          </h3>

          <h3 style={{ textAlign: "left" }}>NAME</h3>
          <p style={{ textAlign: "left" }}>
            talk-hack-the-project-not-your-laptop [OPTIONS]... {"{devcontainer.json}"}
          </p>
          <h3 style={{ textAlign: "left" }}>SYNOPSIS</h3>
          <p style={{ textAlign: "left" }}>
            Ova prezentacija pokazuje kako smanjiti rizik razvoja kroz izoliran
            development environment i sigurniji package
            management.
          </p>
          <h3 style={{ textAlign: "left" }}>DESCRIPTION</h3>
          <p style={{ textAlign: "left" }}>
            Prezentacija je interaktivna i izrađena u Reveal.js-u.
            <br />
            Open Source je i dostupan na{" "}
            <a href={`${PRESENTATION_SOURCE_CODE_URL}`}>GitHub-u</a>.
            <br />
            Fokus: Devcontainers + Supply Chain + practical hardening.
          </p>
          <SpeakerNotes>
            U ovoj verziji predavanja mijenjamo temu: od auth incidenta idemo na
            sistemski problem modernog razvoja i dependency ekosustava.
          </SpeakerNotes>
        </section>
      </section>
    </>
  );
}

export default Slide;
