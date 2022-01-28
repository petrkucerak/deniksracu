import FormLocalTitle from "./form-local-title";
import FormSection from "./form-section";
import FormSectionBody from "./form-section-body";
import FormSectionHeader from "./form-section-header";
import { sracLocation } from "../lib/srac-location";
import { useState } from "react";

export default function FormBody() {

    const { latitude, longitude, error } = sracLocation();
    const [long, setSracLong] = useState();
    const [lat, setSracLat] = useState();

    const setSracLocation = () => {
        setSracLat(latitude);
        setSracLong(longitude);
    }

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
                        className="mb-3 bg-yellow-400 text-white p-2 uppercase font-semibold text-sm rounded-xl hover:shadow duration-200"
                    >
                        získat polohu
                    </button>
                    <ul className="mb-8">
                        <li className="mb-2"> Šířka:{" "}
                            <input
                                type="number"
                                className="rounded border-0 outline-none text-gray-600"
                                defaultValue={lat}
                            />
                        </li>
                        <li> Délka:{" "}
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

                </FormSectionBody>
            </FormSection>
            <FormSection>
                <FormSectionHeader title="Sráč" />
                <FormSectionBody>

                </FormSectionBody>
            </FormSection>
        </main>
    )
}