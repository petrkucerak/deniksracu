import Meta from "../components/meta";
import Footer from "../components/footer";
import Section from "../components/section";
import SectionHeader from "../components/section-header";
import SectionBody from "../components/section-body";
import LocalTitle from "../components/local-title";
import BackButton from "../components/back-button";
import ReactAudioPlayer from "react-audio-player";

export default function About() {

  return (
    <>
      <Meta />
      <BackButton />
      <h1 className="text-center text-4xl font-bold my-2">
        O projektu
      </h1>
      <Section>
        <SectionHeader title="úvod" />
        <SectionBody>
          <LocalTitle title="O projektu" subtitle="" />
          <p className="my-2">Deník sráčů je Open-Source projekt, který si dává za úkol vytvořit mapu záchodů s hodnocením jejich kvality.
          </p>
          <p className="my-2">Myšlenka stvořit rajon pro trůnící gurmány se zrodila v hlavě dvou vášnivých expertů (Jakuba Jíry a Petra
            Kučery), společnými silami zkompletovali myšlenku a nyní se snaží o její realizaci.</p>
          <p className="my-2">Do vývoje projektu se můžeš zapojit i ty. Mrkni do repa na github.</p>
        </SectionBody>
        <SectionHeader title="proces" />
        <SectionBody>
          <LocalTitle title="Jak to celé funguje" subtitle="" />
          <p className="my-2">Tvrdou vědeckou prací a dlouhými diskuzemi byl vytvořen detailní systém objektivně subjektivního hodnocení:</p>
          <p className="my-2">Prvních pět kritérií je možné hodnotit jako ANO nebo NE</p>
          <ul className="list-disc pl-6 my-1">
            <li>čistota (nesmrdí to tam, na zemi nejsou loužičky, záchod je v pořádku, ...)</li>
            <li>toaletní papír</li>
            <li>zámek na zamčení dveří</li>
            <li>uspokojivé umyvadlo (voda + mýdlo)</li>
            <li>placené</li>
          </ul>
          <p className="my-2">V druhé části je možné přidat nějakou bonusovou kategorii</p>
          <p className="my-2">
            větrání, věšáček, vícevrstvý toaleťák, rezerva toaleťáku, štětka do záchodu, zásuvka, wifi, noviny, výhled,
            polička, hudba, stálé světlo, vtipy na záchodě, ...
          </p>
        </SectionBody>
        <SectionHeader title="média" />
        <SectionBody>
          <LocalTitle title="Píše se o nás" subtitle="" />
          <p>Krátká reportáž o našem projektu.</p>
          <ReactAudioPlayer
            src={`/audio/DenikSracu_Uhnava.mp3`}
            controls
            className="w-full my-2"
          />
        </SectionBody>
      </Section>
      <Footer />
    </>
  );
}
