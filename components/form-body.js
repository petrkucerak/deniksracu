import LocalTitle from "./local-title";
import Section from "./section";
import SectionBody from "./section-body";
import SectionHeader from "./section-header";
import { sracLocation } from "../lib/srac-location";
import { useState } from "react";
import FromToggleQuestion from "./form-toggle-question";
import TagsInput from "react-tagsinput";
import { Form2JSONToilet } from "../lib/toilet";
import { toiletTypes } from "./toilet-types";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";

export default function FormBody() {
  // const FormMapPreviewSSR = dynamic(() => import("./form-map-preview"), { ssr: false });
  const { latitude, longitude, error } = sracLocation();
  const [longT, setSracLong] = useState(null);
  const [latT, setSracLat] = useState(null);

  const setSracLocation = () => {
    setSracLat(latitude);
    setSracLong(longitude);
  };

  const [bonusTags, setBonusTags] = useState([]);

  // parse url parametrs
  const router = useRouter();
  const { lat, lng, diseabledButton } = router.query;
  const query = router.query;

  function trueFalseHandler(input) {
    if (input == "true") return true;
    else return false;
  }

  return (
    <main className="flex flex-col items-center">
      <Section>
        <SectionHeader title="Lokace" />
        <SectionBody>
          <LocalTitle
            title="Souřadnice"
            subtitle="Přesné místo každé svatyně sraní je třeba určit přesnými informacemi o poloze. Pokud jsi na místě, využij možnost automatického vyplnění."
          />
          <button
            onClick={() => setSracLocation()}
            className={
              !trueFalseHandler(query.diseabledButton)
                ? `mb-3 bg-yellow-400 text-white p-2 uppercase font-semibold text-sm rounded-xl hover:shadow duration-200 hover:bg-yellow-500`
                : `mb-3 bg-yellow-400 text-white p-2 uppercase font-semibold text-sm rounded-xl hover:shadow duration-200 hover:bg-yellow-500 cursor-not-allowed`
            }
            title="Získat aktuální polohu zařízení z GPS"
            disabled={trueFalseHandler(query.diseabledButton)} // disable button if position is in the URL
          >
            získat polohu
          </button>
          <ul className="mb-8 w-full font-semibold">
            <li className="mb-2">
              {" "}
              Šířka:{" "}
              <input
                type="number"
                className="rounded border-0 text-gray-600"
                defaultValue={latT || query.lat}
                id="latitude"
                placeholder=""
                disabled={trueFalseHandler(query.diseabledButton)} // disable if position is in the URL
              />
            </li>
            <li className="">
              {" "}
              Délka:{" "}
              <input
                type="number"
                className="rounded border-0 text-gray-600"
                defaultValue={longT || query.lng}
                id="longtitude"
                placeholder=""
                disabled={trueFalseHandler(query.diseabledButton)} // disable if position is in the URL
              />
            </li>
          </ul>
          {/* <FormMapPreviewSSR lat={latT || query.lat} lng={longT || query.lng} /> */}
          <LocalTitle
            title="Název místa"
            subtitle="Každý správný trůní sál musí mít i svůj název. To, jak ji pojmenuješ, je jenom na tobě. Pamatuj, že název by měl být jedinečný, originální a popisovat dané místo."
          />
          <input
            type="text"
            className="rounded border-0 text-gray-600 outline-none w-full mb-8"
            id="placeName"
            placeholder="např. Hospůdka Pod Zelenou lípou"
          />
          <LocalTitle
            title="Typ toalety"
            subtitle="Nachází se trůn v hospodě, na úřadě nebo se snad jedná o veřejnou toaletu? Podle tvojí volby se přiřadí konkrétní ikonka."
          />
          <select
            id="toiletType"
            className="rounded border-0 text-gray-600 outline-none w-full mb-8"
          >
            <option>{toiletTypes[0]}</option>
            <option>{toiletTypes[1]}</option>
            <option>{toiletTypes[2]}</option>
            <option>{toiletTypes[3]}</option>
            <option>{toiletTypes[4]}</option>
            <option>{toiletTypes[5]}</option>
            <option>{toiletTypes[6]}</option>
          </select>
          <LocalTitle
            title="Pospis cesty"
            subtitle="Časovou tíseň při hledání království pro sraní zažil určitě každý. Prosím popiš, kde se trůn nachází, patro, dveře, jaké heslo říci na recepci, ..."
          />
          <textarea
            className="rounded border-0 h-20 text-gray-600"
            id="wayDescription"
            placeholder="např. Na toaletu se lze dostat průchodem při skrze pasáž, která se nachzí napravo od vchodových dveří ..."
          ></textarea>
        </SectionBody>
      </Section>
      <Section>
        <SectionHeader title="Hodnocení" />
        <SectionBody>
          <LocalTitle
            title="Hlavní kategorie"
            subtitle="Vědeckým výzkumem jsme vyspecifikovali 5 hlavních základních kategorií, které u každého místa hodnotíme."
          />
          <FromToggleQuestion
            title="Je záchod čistý?"
            description="nesmrdí to tam, nejsou na zemi loužičky, zachod je v pořádku"
            id="isClean"
          />
          <FromToggleQuestion title="Je u záchodu toaleťák?" id="hasPaper" />
          <FromToggleQuestion title="Lze zamknout dveře?" id="canLock" />
          <FromToggleQuestion
            title="Je u záchoda umyvadlo s tekoucí vodou a mýdlem?"
            id="hasWater"
          />
          <FromToggleQuestion title="Jsou záchody zdarma?" id="isFree" />
          <LocalTitle
            title="Bonusové kategorie"
            subtitle="Zaujalo tě na místních záchodech něco zajímavého? Pěkná hudba, inspirativní výhled, bezdrátové nabíječky či originální výzdoba? Neváhej a přidej speciální tagy."
          />
          <TagsInput
            value={bonusTags}
            onChange={setBonusTags}
            maxTags={10}
            inputProps={{ placeholder: "Přidej katogorii..." }}
          />
          <LocalTitle
            title="Slovní komentář"
            subtitle="Pro hodnocení ti nestačili výše zmíněné kategorie? Nevadí, všechno ostatní můžeš napsat sem!"
          />
          <textarea
            className="rounded border-0 h-24 text-gray-600"
            id="comment"
            placeholder="Tvůj komentář ..."
          ></textarea>
        </SectionBody>
      </Section>
      <Section>
        <SectionHeader title="Sráč" />
        <SectionBody>
          <LocalTitle
            title="Přezdívka"
            subtitle="Pokud se chceš zařadit do síně slávy a stát se legendárním sráčem, nezapomeň se podepsat pod své hodnocení."
          />
          <input
            type="text"
            className="rounded border-0 text-gray-600 outline-none w-full mb-8"
            placeholder="Tvoje přezdívka ...."
            id="nickName"
          />
        </SectionBody>
      </Section>
      <div className="flex w-full flex-row justify-center max-w-screen-md px-5 mb-8">
        <button
          className="rounded-xl m-3 bg-yellow-500 w-full py-2 text-white font-bold uppercase hover:bg-yellow-600 duration-200"
          onClick={() => {
            let tags = bonusTags;
            Form2JSONToilet(tags, `download`);
          }}
          title="Stáhnout soubor s informacemi o toaletě"
        >
          Stáhnout
        </button>
        <button
          className="rounded-xl m-3 w-full py-2 bg-yellow-500 text-white font-bold uppercase hover:bg-yellow-600 duration-200"
          onClick={() => {
            let tags = bonusTags;
            Form2JSONToilet(tags, `request`);
          }}
          title="Vytvořit žádost o přidání záchodu do mapy"
        >
          Vytvořit request
        </button>
      </div>
    </main>
  );
}
