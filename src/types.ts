import { z } from "zod";
import { responseSchema } from "./validator";

export interface TavilySearchParams {
	query: string;
	search_depth?: "basic" | "advanced";
	include_images?: boolean;
	include_answer?: boolean;
	include_raw_content?: boolean;
	max_results?: number;
	include_domains?: string[];
	exclude_domains?: string[];
}

export type ApiResponseType = z.infer<typeof responseSchema>;

export type Response =
	| {
			success: true;
			data: ApiResponseType;
	  }
	| {
			success: false;
			errorMessage: string;
			code: number;
	  };
