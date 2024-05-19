import axios, { AxiosError } from "axios";
import { Response, TavilySearchParams } from "./types";
import { responseSchema } from "./validator";
import { ZodError } from "zod";

class TavilySearchAPI {
	private baseURL: string;
	private apiKey: string;

	constructor(config: { apiKey: string }) {
		this.baseURL = "https://api.tavily.com";
		this.apiKey = config.apiKey;
	}

	public async search(params: TavilySearchParams): Promise<Response> {
		try {
			const response = await axios.post(`${this.baseURL}/search`, {
				...params,
				api_key: this.apiKey,
			});
			const data = responseSchema.parse(response.data);
			return {
				success: true,
				data,
			};
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorMessage = error.response?.data.detail.error[0];
				const errorCode = error.response?.data.detail.error[1];
				return {
					success: false,
					errorMessage,
					code: errorCode,
				};
			} else if (error instanceof ZodError) {
				const errorMessage = `
				Invalid Response Data from API:
				${error.issues
					.map(
						(issue) =>
							`${issue.path}:${issue.code}:${issue.message}\n`
					)
					.join(", ")}`;
				const errorCode = 400;
				return {
					success: false,
					errorMessage,
					code: errorCode,
				};
			} else if (error instanceof Error) {
				const errorMessage = error.message;
				const errorCode = 500;
				return {
					success: false,
					errorMessage,
					code: errorCode,
				};
			} else {
				const errorMessage = "Unknown error occurred";
				const errorCode = 500;
				return {
					success: false,
					errorMessage,
					code: errorCode,
				};
			}
		}
	}
}