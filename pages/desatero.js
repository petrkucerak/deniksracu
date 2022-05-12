import Meta from "../components/meta";
import Footer from "../components/footer";
import Section from "../components/section";
import SectionHeader from "../components/section-header";
import SectionBody from "../components/section-body";
import LocalTitle from "../components/local-title";

export default function Desatero() {

  return (
    <>
      <Meta />
      <h1 className="text-center text-4xl font-bold my-2">
        Sráčova desatero
      </h1>
      <Section>
        <SectionHeader title="přikázání" />
        <SectionBody>
          <LocalTitle title="Prolog" subtitle="Jsou dny, kdy se všechno otáčí jako dobře promazaný držák na toaletní papír. Těmito dny proplouváš bez většího problému. Pak se ale stane, že ani v klidu nevysereš. Nestíháš, jsi rozhádaný, zkolí tě nemoc, nepovedla se ti zkouška a tvoje oáza už není klidnou. Právě pro tyto dny slouží desatero, které ti ukáže cestu skrz temný tunel. Díky němu se neztratíš a budeš se držet základních zásad, které z tebe dělají správného sráče." />
          <LocalTitle title="Přikázání" subtitle="" />
          <ol className="list-decimal ml-8">
            <li className="mb-2">Do jednoho záchodu sráti budeš!</li>
            <li className="my-2">Během sraní nebudeš záchody střídati!</li>
            <li className="my-2">Pomni, abys záchod spláchnul i v den sváteční!</li>
            <li className="my-2">Budeš ctít ostatní sráče!</li>
            <li className="my-2">Po potřebě splachovati budeš!</li>
            <li className="my-2">Nebudeš nakukovati do kabinky vedlejší!</li>
            <li className="my-2">Nebudeš krást papír toaletní!</li>
            <li className="my-2">Budeš hodnotit vždy pravdivě a objektivně!</li>
            <li className="my-2">Nebudeš žádostivě dychtit po roličce toaletního papíru svého bližního!</li>
            <li className="mt-2">Aniž požádáš štětky jeho!</li>
          </ol>
        </SectionBody>
      </Section>
      <Footer />
    </>
  );
}
