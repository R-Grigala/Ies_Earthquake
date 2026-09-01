import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import languagesList from '@/src/i18n/languagesList.json';
import type { AppLanguage } from '@/src/i18n';
import { SUPPORTED_LANGUAGES } from '@/src/i18n';

const BRAND_COLOR = '#7a0002';

type LanguagePickerModalProps = {
  visible: boolean;
  currentLanguage: AppLanguage;
  onClose: () => void;
  onSelect: (language: AppLanguage) => void;
};

export function LanguagePickerModal({
  visible,
  currentLanguage,
  onClose,
  onSelect,
}: LanguagePickerModalProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({ light: '#8e8e93', dark: '#9BA1A6' }, 'icon');
  const cardBorderColor = useThemeColor({ light: '#e3e3e3', dark: '#3a3a3c' }, 'icon');
  const selectedBackground = useThemeColor(
    { light: 'rgba(122, 0, 2, 0.08)', dark: 'rgba(255, 159, 154, 0.12)' },
    'background'
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={styles.dismissArea} onPress={onClose} />

        <View
          style={[
            styles.sheet,
            {
              backgroundColor,
              paddingBottom: Math.max(insets.bottom, 16),
            },
          ]}>
          <View style={[styles.handle, { backgroundColor: mutedColor }]} />

          <View style={styles.headerRow}>
            <ThemedText style={[styles.sheetTitle, { color: textColor }]}>
              {t('settings.changeLanguage')}
            </ThemedText>
            <Pressable onPress={onClose} hitSlop={8} style={styles.closeButton}>
              <ThemedText style={[styles.closeText, { color: BRAND_COLOR }]}>
                {t('common.close')}
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.options}>
            {SUPPORTED_LANGUAGES.map((language) => {
              const selected = language === currentLanguage;
              const meta = languagesList[language];

              return (
                <Pressable
                  key={language}
                  style={({ pressed }) => [
                    styles.optionCard,
                    {
                      borderColor: selected ? BRAND_COLOR : cardBorderColor,
                      backgroundColor: selected ? selectedBackground : backgroundColor,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                  onPress={() => onSelect(language)}>
                  <View style={styles.optionTextBlock}>
                    <ThemedText
                      style={[
                        styles.nativeName,
                        { color: textColor },
                        selected && styles.nativeNameSelected,
                      ]}>
                      {meta.nativeName}
                    </ThemedText>
                    <ThemedText style={[styles.languageCode, { color: mutedColor }]}>
                      {meta.name}
                    </ThemedText>
                  </View>

                  <Image
                    source={
                      selected
                        ? require('@/assets/icons/radio-button-on-outline.png')
                        : require('@/assets/icons/radio-button-off-outline.png')
                    }
                    style={[
                      styles.radioIcon,
                      { tintColor: selected ? BRAND_COLOR : mutedColor },
                    ]}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dismissArea: {
    flex: 1,
  },
  sheet: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 16,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 14,
    opacity: 0.45,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  closeButton: {
    paddingVertical: 4,
    paddingLeft: 12,
  },
  closeText: {
    fontSize: 15,
    fontWeight: '600',
  },
  options: {
    gap: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionTextBlock: {
    gap: 2,
    flex: 1,
    paddingRight: 12,
  },
  nativeName: {
    fontSize: 17,
    fontWeight: '500',
  },
  nativeNameSelected: {
    fontWeight: '700',
  },
  languageCode: {
    fontSize: 13,
    fontWeight: '500',
  },
  radioIcon: {
    width: 24,
    height: 24,
  },
});
