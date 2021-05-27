import html from "./main";

const makeCtx = () => ({ path: "", filename: "" });

const example = `
<!doctype html>
<html>
<head>
	<title><% APP_TITLE /></title>
</head>
<body>
	<script type="application/javascript">
		(function(){
			var s = document.createElement('script');
			s.src = 'analytics.js?k=<% ANALYTICS_KEY />';
			document.body.appendChild(s);
		})();
	</script>

	<script>
		config.init({
			secret: '<% process.env.CONFIG_SECRET />'
		});
	</script>
</body>
</html>
`;

test("plugin correctly replaces undefined variables", () => {
	const htmlPlugin = html();

	expect(htmlPlugin.transformIndexHtml(example, makeCtx())).toMatchSnapshot();
});

test("plugin correctly replaces variables", () => {
	const htmlPlugin = html({
		"APP_TITLE": "App Title",
		"ANALYTICS_KEY": "analytics_key",
		"process.env.CONFIG_SECRET": JSON.stringify("config_key"),
	});

	expect(htmlPlugin.transformIndexHtml(example, makeCtx())).toMatchSnapshot();
});

const spacingExample = `
<%NO_SPACES/>
<%EAST_SPACES     />
<%     SPACES_WEST/>
<%     SPACES     />
5
<%
	TABS_AND_NEW_LINES
/>
7
<%

    SPACES_AND_MORE_NEW_LINES

/>
`;

test("plugin correctly handles spacing", () => {
	const htmlPlugin = html({
		NO_SPACES: "1",
		EAST_SPACES: "2",
		SPACES_WEST: "3",
		SPACES: "4",
		TABS_AND_NEW_LINES: "6",
		SPACES_AND_MORE_NEW_LINES: "8",
	});

	expect(htmlPlugin.transformIndexHtml(spacingExample, makeCtx())).toMatchSnapshot();
});
