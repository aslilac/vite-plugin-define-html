import { IndexHtmlTransformHook, Plugin } from "vite";

type Definitions = Record<string, string>;

interface IndexHtmlTransformPlugin extends Plugin {
	transformIndexHtml: IndexHtmlTransformHook;
}

function vitePluginDefineHtml(definitions: Definitions = {}): IndexHtmlTransformPlugin {
	return {
		name: "vite-plugin-define-html",

		transformIndexHtml(html: string) {
			return html.replace(
				/(['"`])?<%\s*?([\w.]+)\s*?\/>\1/g,
				(match, quote: string | undefined, name: string) => {
					const value = definitions[name];
					return value ? String(value) : quote ? quote.repeat(2) : "";
				},
			);
		},
	};
}

export default vitePluginDefineHtml;
