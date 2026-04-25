import { useState } from "react";
import "./App.css";
import Anthropic from "@anthropic-ai/sdk";

function App() {
	const [inputText, setInputText] = useState<string>("");
	const [outputText, setOutputText] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [totalTokens, setTotolTokens] = useState<number>(0);

	const summarizeText = async (): Promise<void> => {
		setIsLoading(true);
		const client = new Anthropic({
			apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
			dangerouslyAllowBrowser: true
		});
		try {
			const res = await client.messages.create({
				model: "claude-haiku-4-5",
				max_tokens: totalTokens,
				system:
					"You are an text summarizer, when asked to summarize a text, send back the summary",
				messages: [
					{
						role: "user",
						content: [
							{
								type: "text",
								text: `Summarize this ${inputText}`
							}
						]
					}
				]
			});
			console.log(res);
			setOutputText(res.content[0]?.text || "");
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : String(err);
			console.error(`there was some error - ${errorMessage}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="contianer">
			<h1>Text Summarizer</h1>
			<textarea
				className="input-text"
				value={inputText}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					setInputText(e.target.value)
				}
				rows={10}
			/>
			<div className="buttons">
				<button
					onClick={(e: React.MouseEvent<HTMLButtonElement>) => summarizeText()}
					className="btn"
				>
					Summarize
				</button>
				<div className="max-tokens-container">
					<span>Word Limit :</span>
					<div className="slider-container">
						<input
							className="slider"
							type="range"
							min={0}
							max={300}
							value={totalTokens}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setTotolTokens(Number(e.target.value))
							}
						/>
						<p className="token-size">{totalTokens}</p>
					</div>
				</div>
			</div>
			<div className={`spinner ${isLoading ? "" : "hidden"} `}></div>
			<div className={`output-text ${isLoading ? "hidden" : ""} `}>
				{outputText}
			</div>
		</div>
	);
}

export default App;
