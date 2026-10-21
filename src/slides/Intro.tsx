import SpeakerNotes from "../components/SpeakerNotes";
import PasswordGlitchTypeEffectText from "../components/CyberpunkPasswordEffect";

function Slide() {
  return (
    <section data-transition="slide">
      <section>
        <h3>
          <a>
            <PasswordGlitchTypeEffectText reanimateEveryMs={7000} toReanimateChildren={'Welcome to'}>
              Ri-Hack
            </PasswordGlitchTypeEffectText>
          </a>
        </h3>
        <h3>
          Hack the project, not your{" "}
          <a>
            <PasswordGlitchTypeEffectText reanimateEveryMs={5000} toReanimateChildren={'machine'}>
              laptop
            </PasswordGlitchTypeEffectText>
          </a>
        </h3>

        <div style={{
          marginBottom: "150px"
        }}></div>
        <SpeakerNotes>
          Pozdrav svima, dobrodošli na prezentaciju "Hack the project, not your laptop".


          Pripremio sam ovu prezentaciju kako bih podijelio neke dobre prakse i lekcije iz svijeta sigurnosti.

          - Nadam se da će vam se svidjeti i biti zanimljivo.
        </SpeakerNotes>
      </section>
      <section>
        <h4>
          .. ili ti ... što se dogodi na hackathonu, ostaje u kontejneru
        </h4>
        <div style={{
          marginBottom: "150px"
        }}></div>
      </section>
    </section>
  );
}

export default Slide;
