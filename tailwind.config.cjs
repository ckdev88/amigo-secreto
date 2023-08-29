const colors=require("tailwindcss/colors");
const defaultTheme=require("tailwindcss/defaultTheme");

module.exports = {
	content: ['{pages, app,src}/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}','./node_modules/@everybody-gives/ui/**/*.{js,ts}'],
	theme: {
		colors:{
		inherit:'inherit',
		current:'currentColor',
		transparent:'transparent',
		black:'#000',
		white:'#fff',

		red:colors.red,
	gray:colors.stone,
		primary:colors.emerald,
		background:'#ede7e2',
		action:'#f5ff7d',
		},
		fontFamily:{
			sans:['Arima Marudai', ...defaultTheme.fontFamily.sans],
		},
		keyframes:{
			wiggle:{'0%,50%,100%':{transform:'rotate(-3deg) scale(1.2)'},
			'25%, 75%': {transform: "rotate(3deg) scale(1.2)"},
			}, 
		},
		animation:{wiggle:'wiggle 1s ease-in-out infinite'},
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
