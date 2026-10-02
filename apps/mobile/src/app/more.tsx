import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';

const COMMANDMENTS = [
  'Do jednoho záchodu sráti budeš!',
  'Během sraní nebudeš záchody střídati!',
  'Pomni, abys záchod spláchnul i v den sváteční!',
  'Budeš ctít ostatní sráče!',
  'Po potřebě splachovati budeš!',
  'Nebudeš nakukovati do kabinky vedlejší!',
  'Nebudeš krást papír toaletní!',
  'Budeš hodnotit vždy pravdivě a objektivně!',
  'Nebudeš žádostivě dychtit po roličce toaletního papíru svého bližního!',
  'Aniž požádáš štětky jeho!',
];

// Phase 1 splits this into proper About / Desatero screens with the audio report.
export default function MoreScreen() {
  return (
    <Screen title="O projektu">
      <ThemedText>
        Deník sráčů je Open-Source projekt, který si dává za úkol vytvořit mapu záchodů s hodnocením
        jejich kvality.
      </ThemedText>
      <ThemedText type="smallBold">Sráčovo desatero</ThemedText>
      {COMMANDMENTS.map((c, i) => (
        <ThemedText key={c}>
          {i + 1}. {c}
        </ThemedText>
      ))}
    </Screen>
  );
}
