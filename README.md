# vite-plugin-define-html

Let's you define variables which can be used in your HTML files!

```typescript
import type { UserConfig } from "vite";
import html from "vite-plugin-define-html";

export default {
	plugins: [
		html({
			APP_TITLE: "App Title",
			ANALYTICS_KEY: "analytics_key",
		}),
	],
} as UserConfig;
```

```html
<!DOCTYPE html>
<html>
	<head>
		<title><% APP_TITLE /></title>
	</head>
	<body>
		<script
			type="application/javascript"
			src="analytics.js?k=<% ANALYTICS_KEY />"
		></script>
	</body>
</html>
```
