import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/utils/i18n';
import type { TranslationKey } from '@/utils/i18n';

export function useTranslation() {
  const { language } = useLanguage();
  const t = (key: TranslationKey) => translate(key, language);
  return { t, language };
}
