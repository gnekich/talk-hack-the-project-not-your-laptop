import SpeakerNotes from "../components/SpeakerNotes";

function Slide() {
  return (
    <>
      <section>
        <h3>Pa krenimo redom...</h3>
        <SpeakerNotes>
          Krenimo od toga što se stvarno događa kad lokalno instaliramo
          dependencyje i pokrenemo projekt.
        </SpeakerNotes>
      </section>

      <section>
        <h3 style={{ textAlign: "left" }}>Story Chapter 1: The Problem</h3>
        <ul style={{ textAlign: "left" }}>
          <li>
            Dev laptop često ima: env secrete, SSH ključeve, .env file-ove, cloud tokene, browser sessione
            i pristup internim repoima.
          </li>
          <li>
            Kad radimo <a>npm install</a> ili <a>pip install</a>, izvršavamo
            tuđi kod.
          </li>
          <li>
            Želim developati brzo i jednostavno ali i sigurno, ali kako ?
          </li>
        </ul>
        <SpeakerNotes>
          Većina timova štiti produkciju, ali development endpoint je često
          puno slabije zaštićen i ima previše ovlasti.
        </SpeakerNotes>
      </section>

      <section>
        <section>
          <h3>Supply chain rizici</h3>
          <ul>
            <li>Typosquatting (npr. <a>react-domm</a>, <a>reqeust</a>, itd.)</li>
            <li>Dependency confusion (interni paket vs javni registry)</li>
            <li>Compromised maintainer / account takeover</li>
            <li>Maliciozni postinstall ili setup skripte</li>
          </ul>
          <SpeakerNotes>
            Sama instalacija dependencyja može pokrenuti kod s pravima trenutnog
            korisnika. To je ključna točka napada.
          </SpeakerNotes>
        </section>

        <section>
          <h3 style={{ textAlign: "left" }}>
            <a>$</a> cat package.json | grep scripts
          </h3>
          <pre>
            <code className="language-json" data-noescape>{`{
  "scripts": {
    "postinstall": "node scripts/bootstrap.js"
  }
}`}</code>
          </pre>
          <p style={{ textAlign: "left" }}>
            Isto vrijedi i za Python build/install hookove.
          </p>
          <SpeakerNotes>
            Nije problem samo JS. Python paketi također mogu imati skripte koje
            se izvršavaju pri instalaciji.
          </SpeakerNotes>
        </section>
      </section>

      <section>
        <section>
          <h3>Što je blast radius?</h3>
          <p>
            Blast radius = maksimalna šteta koju incident može napraviti iz
            kompromitirane točke.
          </p>
          <ul>
            <li>Koje tajne su dostupne?</li>
            <li>Koji mrežni resursi su dostupni?</li>
            <li>Koliko brzo možemo vratiti okolinu?</li>
          </ul>
          <SpeakerNotes>
            Ako incident ne možemo 100% spriječiti, onda ga moramo učiniti
            jeftinim i lokalnim.
          </SpeakerNotes>
        </section>

        <section>
          <h3>Laptop vs Devcontainer</h3>
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "48%", textAlign: "left" }}>
              <h4>Host laptop</h4>
              <ul>
                <li>Dugotrajan state i sessioni</li>
                <li>Shared credential cache</li>
                <li>Teško reproducirati i resetirati</li>
              </ul>
            </div>
            <div style={{ width: "48%", textAlign: "left" }}>
              <h4>Devcontainer</h4>
              <ul>
                <li>Izoliran filesystem i toolchain</li>
                <li>Jasan, verzioniran setup</li>
                <li>Brz rebuild i clean state</li>
              </ul>
            </div>
          </div>
          <SpeakerNotes>
            Devcontainer nije silver bullet, ali drastično smanjuje blast radius
            i povećava reproducibilnost.
          </SpeakerNotes>
        </section>
      </section>

      <section>
        <section>
          <h3>Devcontainer hardening baseline</h3>
          <ul>
            <li>Pinan base image (bez latest taga)</li>
            <li>Run as non-root user</li>
            <li>Minimalni alati i scope tokena</li>
            <li>Jasan lifecycle: rebuild umjesto “popravljanja” ručno</li>
          </ul>
          <SpeakerNotes>
            Cilj je da environment bude disposable, dokumentiran i ograničen.
          </SpeakerNotes>
        </section>

        <section>
          <h3 style={{ textAlign: "left" }}>
            <a>$</a> cat .devcontainer/devcontainer.json
          </h3>
          <pre>
            <code className="language-json" data-noescape>{`{
  "name": "secure-dev",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:22-bookworm",
  "remoteUser": "node",
  "postCreateCommand": "pnpm install --frozen-lockfile"
}`}</code>
          </pre>
          <SpeakerNotes>
            Ovdje je poanta: setup je standardiziran i ne ovisi o stanju
            pojedinog laptopa.
          </SpeakerNotes>
        </section>
      </section>

      <section>
        <section>
          <h3>Zašto pnpm?</h3>
          <ul>
            <li>Content-addressable store i manji disk footprint</li>
            <li>
              Strict node_modules layout smanjuje “phantom dependency” bugove
            </li>
            <li>Brži CI i lokalni install kroz cache reuse</li>
            <li>Bolja reproducibilnost uz lockfile discipline</li>
          </ul>
          <SpeakerNotes>
            Pnpm nije samo “brži npm”. Daje stroži dependency model i manje
            iznenađenja.
          </SpeakerNotes>
        </section>

        <section>
          <h3 style={{ textAlign: "left" }}>
            <a>$</a> pnpm install --frozen-lockfile
          </h3>
          <ul style={{ textAlign: "left" }}>
            <li>Faila ako lockfile nije usklađen s manifestom</li>
            <li>Smanjuje “works on my machine” drift</li>
            <li>Jasno signalizira neautorizirane promjene dependency graph-a</li>
          </ul>
          <SpeakerNotes>
            Frozen lockfile je mali guardrail koji jako puno pomaže i lokalno i
            u CI-u.
          </SpeakerNotes>
        </section>
      </section>

      <section>
        <h3 style={{ textAlign: "left" }}>Story Chapter 2: Pragmatic playbook</h3>
        <ol style={{ textAlign: "left" }}>
          <li>Standardiziraj razvoj kroz devcontainer.</li>
          <li>Koristi pnpm + lockfile discipline u CI-u.</li>
          <li>Review dependency diffove kao kod.</li>
          <li>Scopeaj tokene i tajne po principu least privilege.</li>
          <li>Vježbaj incident reset: rebuild, rotate, verify.</li>
        </ol>
        <SpeakerNotes>
          Ovo nisu “enterprise-only” mjere. Većina se može uvesti u jednom
          sprintu bez velikog overhead-a.
        </SpeakerNotes>
      </section>
    </>
  );
}

export default Slide;
