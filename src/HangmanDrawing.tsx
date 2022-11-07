import "./app.css";

const HEAD = <div className="head" key="1" />;

const BODY = <div className="body" key="2" />;

const RIGHT_ARM = <div className="right-arm arm" key="3" />;

const LEFT_ARM = <div className="left-arm arm" key="4" />;

const RIGHT_LEG = <div className="right-leg leg" key="5" />;

const LEFT_LEG = <div className="left-leg leg" key="6" />;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
	numberOfGuesses: number;
};

export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps) {
	return (
		<div style={{position: "relative"}}>
			<div className="hangman">{BODY_PARTS.slice(0, numberOfGuesses)}</div>
			<div className="right-bar" />
			<div className="top-bar" />
			<div className="left-bar" />
			<div className="bottom-bar" />
		</div>
	);
}
