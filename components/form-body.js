import FormLocalTitle from "./form-local-title";
import FormSection from "./form-section";
import FormSectionBody from "./form-section-body";
import FormSectionHeader from "./form-section-header";
import { sracLocation } from "../lib/srac-location";
import { useState } from "react";
import FromToggleQuestion from "./form-toggle-question";
import TagsInput from "react-tagsinput";
import { Form2JSONToilet } from "../lib/toilet";

export default function FormBody() {

    const { latitude, longitude, error } = sracLocation();
    const [long, setSracLong] = useState();
    const [lat, setSracLat] = useState();

    const setSracLocation = () => {
        setSracLat(latitude);
        setSracLong(longitude);
    }

    const [bonusTags, setBonusTags] = useState([]);

    return (
        <main className="flex flex-col items-center">
            <FormSection>
                <FormSectionHeader title="Lokace" />
                <FormSectionBody>
                    <FormLocalTitle
                        title="Souřadnice"
                        subtitle="Přesné místo každé svatyně sraní je třeba určit přesnými informacemi o poloze. Pokud jsi na místě, využij možnost automatického vyplnění."
                    />
                    <button
                        onClick={() => setSracLocation()}
                        className="mb-3 bg-yellow-400 text-white p-2 uppercase font-semibold text-sm rounded-xl hover:shadow duration-200 hover:bg-yellow-500 duration-200"
                    >
                        získat polohu
                    </button>
                    <ul className="mb-8 w-full font-semibold">
                        <li className="mb-2 w-full"> Šířka:{" "}
                            <input
                                type="number"
                                className="rounded border-0 outline-none text-gray-600"
                                defaultValue={lat}
                            />
                        </li>
                        <li className="w-full"> Délka:{" "}
                            <input
                                type="number"
                                className="rounded border-0 text-gray-600"
                                defaultValue={long}
                            />
                        </li>
                    </ul>
                    <FormLocalTitle
                        title="Název místa"
                        subtitle="Každý správný trůní sál musí mít i svůj název. To, jak ji pojmenuješ, je jenom na tobě. Pamatuj, že název by měl být jedinečný, originální a popisovat dané místo."
                    />
                    <input
                        type="text"
                        className="rounded border-0 text-gray-600 outline-none w-full mb-8"
                        defaultValue="např. Hospůdka Pod Zelenou lípou"
                    />
                </FormSectionBody>
            </FormSection>
            <FormSection>
                <FormSectionHeader title="Hodnocení" />
                <FormSectionBody>
                    <FormLocalTitle
                        title="Hlavní kategorie"
                        subtitle="Vědeckým výzkumem jsme vyspecifikovali 5 hlavních základních kategorií, které u každého místa hodnotíme."
                    />
                    <FromToggleQuestion
                        title="Je záchod čistý?"
                        description="nesmrdí to tam, nejsou na zemi loužičky, zachod je v pořádku"
                    />
                    <FromToggleQuestion
                        title="Je u záchodu toaleťák?"
                    />
                    <FromToggleQuestion
                        title="Lze zamknout dveře?"
                    />
                    <FromToggleQuestion
                        title="Je u záchoda umyvadlo s tekoucí vodou a mýdlem?"
                    />
                    <FromToggleQuestion
                        title="Jsou záchody zdarma?"
                    />
                    <FormLocalTitle
                        title="Bonusové kategorie"
                        subtitle="Zaujalo tě na místních záchodech něco zajímavého? Pěkná hudba, inspirativní výhled, bezdrátové nabíječky či originální výzdoba? Neváhej a přidej speciální tagy."
                    />
                    <TagsInput
                        value={bonusTags}
                        onChange={setBonusTags}
                        maxTags={10}
                        inputProps={{ placeholder: "Přidej katogorii..." }}
                    />
                    <FormLocalTitle
                        title="Slovní komentář"
                        subtitle="Pro hodnocení ti nestačili výše zmíněné kategorie? Nevadí, všechno ostatní můžeš napsat sem!"
                    />
                    <textarea
                        className="rounded border-0 h-24 text-gray-600"
                        defaultValue="Tvůj komentář ..."
                    >

                    </textarea>
                </FormSectionBody>
            </FormSection>
            <FormSection>
                <FormSectionHeader title="Sráč" />
                <FormSectionBody>
                    <FormLocalTitle
                        title="Přezdívka"
                        subtitle="Pokud se chceš zařadit do síně slávy a stát se legendárním sráčem, nezapomeň se podepsat pod své hodnocení."
                    />
                    <input
                        type="text"
                        className="rounded border-0 text-gray-600 outline-none w-full mb-8"
                        defaultValue="Tvoje přezdívka ...."
                    />
                </FormSectionBody>
            </FormSection>
            <div className="flex w-full flex-row justify-center max-w-screen-md px-5 mb-8">
                <button
                    className="rounded-xl m-3 bg-yellow-500 w-full py-2 text-white font-bold uppercase hover:bg-yellow-600 duration-200"
                    onClick={() => Form2JSONToilet()}
                >
                    Stáhnout
                </button>
                <button
                    className="rounded-xl m-3 w-full py-2 bg-yellow-500 text-white font-bold uppercase hover:bg-yellow-600 duration-200"
                    onClick={() => Form2JSONToilet()}
                >
                    Vytvořit request
                </button>
            </div>
        </main>
    )
}