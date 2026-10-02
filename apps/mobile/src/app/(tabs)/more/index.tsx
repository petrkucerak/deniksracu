import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { ListGroup, ListItem } from '@/components/list-group';
import { ThemedText } from '@/components/themed-text';
import { Brand, BottomTabInset } from '@/constants/theme';
import { toilets } from '@/lib/toilets';

export default function MoreScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.content, { paddingBottom: BottomTabInset + 24 }]}>
      <View style={styles.hero}>
        <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
          Mapa {toilets.length} trůnů s objektivně subjektivním hodnocením.
        </ThemedText>
      </View>

      <ListGroup title="Brzy">
        <ListItem first label="Přidat nový trůn" icon={{ ios: 'plus', android: 'add', web: 'add' }} color="#A1A1AA" detail="Fáze 3" />
        <ListItem label="Můj profil" icon={{ ios: 'person.fill', android: 'person', web: 'person' }} color="#A1A1AA" detail="Fáze 4" />
      </ListGroup>

      <ListGroup title="Projekt">
        <ListItem first label="O projektu" icon={{ ios: 'info', android: 'info', web: 'info' }} color={Brand.brown} onPress={() => router.push('/more/about')} />
        <ListItem label="Sráčovo desatero" icon={{ ios: 'book.closed.fill', android: 'menu_book', web: 'menu_book' }} color="#D97706" onPress={() => router.push('/more/desatero')} />
        <ListItem
          label="Zdrojový kód"
          icon={{ ios: 'chevron.left.forwardslash.chevron.right', android: 'code', web: 'code' }}
          color="#18181B"
          onPress={() => Linking.openURL('https://github.com/petrkucerak/deniksracu')}
        />
      </ListGroup>

      <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
        Verze {Constants.expoConfig?.version}
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 24 },
  hero: { alignItems: 'center', gap: 12, marginTop: 8 },
  logo: { width: 88, height: 88, borderRadius: 20 },
  center: { textAlign: 'center' },
});
