import i18n from '@/i18n';

const trans = (key: string, options: Record<string, unknown> = {}): string => {
    return i18n.t(key, options);
};

export default trans;
