import "./style.css";
import { initI18n, getLang, setLang, t } from "./i18n/index.js";

// Initialize i18n
initI18n();

// Language switcher
const langBtn = document.getElementById("lang-switch");
langBtn.addEventListener("click", () => {
	const next = getLang() === "zh-CN" ? "en-US" : "zh-CN";
	setLang(next);
	langBtn.textContent = next === "zh-CN" ? "EN" : "中";
});
langBtn.textContent = getLang() === "zh-CN" ? "EN" : "中";

// Copy address helper
window.copyAddr = function (id, btn) {
	const text = document.getElementById(id).textContent;
	navigator.clipboard.writeText(text).then(() => {
		btn.textContent = t("copied");
		btn.classList.add("copied");
		setTimeout(() => {
			btn.textContent = t("copy");
			btn.classList.remove("copied");
		}, 2000);
	});
};
