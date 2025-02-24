export default function OpenSource() {
	return (
		<div id="page-opensource">
			<h1>Open Source Projects</h1>
			<ul>
				<li>
					<a
						href="https://www.npmjs.com/package/react-github-permalink"
						target="_blank"
						rel="noreferrer"
					>
						react-github-permalink
					</a>
					<span>
						Provide a Github permalink and this React component will display the
						codeblock. I use this component regularly in my blog.
					</span>
				</li>
				<li>
					<a
						href="https://www.npmjs.com/package/@blacksheepcode/use-cookie-state"
						target="_blank"
						rel="noreferrer"
					>
						use-cookie-state
					</a>
					<span>
						A useState like React hook that is responsive to cookie changes that
						occur outside of the React context. Includes polyfill for browsers
						that do not support the CookieStore API.
					</span>
				</li>

				<li>
					<a
						href="https://github.com/dwjohnston/ts-tutorial-series"
						target="_blank"
						rel="noreferrer"
					>
						TypeScript Tutorial Series
					</a>
					<span>
						A TypeScript tutorial series, complete with interactive exercises,
						starting from the very basics and going up to generics and mapped
						and index types.
					</span>
				</li>

				<li>
					<a
						href="https://github.com/dwjohnston/javascript-101"
						target="_blank"
						rel="noreferrer"
					>
						Javascript 101
					</a>
					<span>
						A JavaScript tutorial series for people who know nothing about
						coding. Complete with interactive exercises.
					</span>
				</li>
			</ul>
		</div>
	);
}
