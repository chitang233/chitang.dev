import zhCN from "./zh-CN.json";
import enUS from "./en-US.json";

const messages = {
	"zh-CN": zhCN,
	"en-US": enUS,
};

const STORAGE_KEY = "lang";
const SUPPORTED = Object.keys(messages);

function detectLang() {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved && SUPPORTED.includes(saved)) return saved;

	const nav = navigator.language || navigator.languages?.[0] || "en-US";
	if (nav.startsWith("zh")) return "zh-CN";
	return "en-US";
}

let currentLang = detectLang();

export function t(key) {
	return messages[currentLang]?.[key] ?? messages["en-US"][key] ?? key;
}

export function getLang() {
	return currentLang;
}

export function setLang(lang) {
	if (!SUPPORTED.includes(lang)) return;
	currentLang = lang;
	localStorage.setItem(STORAGE_KEY, lang);
	document.documentElement.lang = lang;
	applyTranslations();
}

export function applyTranslations() {
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		el.textContent = t(el.dataset.i18n);
	});
	document.querySelectorAll("[data-i18n-title]").forEach((el) => {
		el.title = t(el.dataset.i18nTitle);
	});
}

export function initI18n() {
	document.documentElement.lang = currentLang;
	applyTranslations();
}
