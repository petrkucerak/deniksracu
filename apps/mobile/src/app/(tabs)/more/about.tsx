import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Brand, BottomTabInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const BONUSES =
  'větrání, věšáček, vícevrstvý toaleťák, rezerva toaleťáku, štětka, zásuvka, wifi, noviny, výhled, polička, hudba, stálé světlo, vtipy na záchodě…';

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

export default function AboutScreen() {
  const theme = useTheme();
  const player = useAudioPlayer(require('@/assets/audio/uhnava-report.mp3'));
  const status = useAudioPlayerStatus(player);
  const progress = status.duration ? status.currentTime / status.duration : 0;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.content, { paddingBottom: BottomTabInset + 24 }]}>
      <Stack.Screen options={{ title: 'O projektu', headerLargeTitle: false }} />
      <ThemedText>
        Deník sráčů je open-source projekt, který si dává za úkol vytvořit mapu záchodů s hodnocením jejich kvality.
      </ThemedText>
      <ThemedText>
        Myšlenka stvořit rajon pro trůnící gurmány se zrodila v hlavě dvou vášnivých expertů – Jakuba Jíry a Petra
        Kučery. Do vývoje se můžeš zapojit i ty, mrkni do repa na GitHubu.
      </ThemedText>

      <ThemedText type="smallBold" style={styles.h}>
        Jak hodnotíme
      </ThemedText>
      <ThemedText>
        Tvrdou vědeckou prací a dlouhými diskuzemi vznikl systém objektivně subjektivního hodnocení. Pět základních
        kritérií má odpověď ano/ne: čistota, toaletní papír, zámek, umyvadlo s vodou a mýdlem a jestli je záchod
        zdarma. K tomu lze přidat bonusové kategorie: {BONUSES}
      </ThemedText>

      <ThemedText type="smallBold" style={styles.h}>
        Píše se o nás
      </ThemedText>
      <View style={[styles.player, { backgroundColor: theme.backgroundElement }]}>
        <Pressable
          onPress={() => (status.playing ? player.pause() : player.play())}
          style={styles.play}
          accessibilityLabel={status.playing ? 'Pozastavit' : 'Přehrát'}>
          <Icon
            name={status.playing ? { ios: 'pause.fill', android: 'pause', web: 'pause' } : { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' }}
            size={22}
            color="#fff"
          />
        </Pressable>
        <View style={styles.grow}>
          <ThemedText type="smallBold">Reportáž o Deníku sráčů</ThemedText>
          <View style={[styles.track, { backgroundColor: theme.separator }]}>
            <View style={[styles.fill, { width: `${progress * 100}%` }]} />
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {formatTime(status.currentTime)} / {formatTime(status.duration || 0)}
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 12 },
  h: { marginTop: 12, fontSize: 17 },
  player: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16 },
  play: { width: 48, height: 48, borderRadius: 24, backgroundColor: Brand.brown, alignItems: 'center', justifyContent: 'center' },
  grow: { flex: 1, gap: 6 },
  track: { height: 4, borderRadius: 2, overflow: 'hidden' },
  fill: { height: 4, backgroundColor: Brand.brown },
});
