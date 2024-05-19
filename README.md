# @safeeullah/tavily-api

## Overview

`@safeeullah/tavily-api` is a TypeScript wrapper for the Tavily Search API.

## Installation

To install the package, use npm or pnpm:

```sh
npm install @safeeullah/tavily-api
```

or

```sh
pnpm add @safeeullah/tavily-api
```

## Usage

### Importing the Package

First, import the package in your TypeScript or JavaScript file:

```ts
import TavilySearchAPI from '@safeeullah/tavily-api';
```

### Creating an Instance

Create an instance of the `TavilySearchAPI` class by providing your API key:

```ts
const api = new TavilySearchAPI({
  apiKey: 'your-api-key-here',
});
```

### Performing a Search

Use the `search` method to perform a search query. The method accepts a `TavilySearchParams` object and returns a promise that resolves to a `Response` object.

```ts
api.search({
  query: 'Case laws related to data privacy in Pakistan',
  search_depth: 'basic',
  include_images: true,
  max_results: 5,
})
  .then((response) => {
    if (response.success) {
      console.log(response.data);
    } else {
      console.error(response.errorMessage);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Search Parameters

The `search` method accepts the following parameters:

- `query` (string): The search query.
- `search_depth` (`basic` | `advanced`): The depth of the search (optional).
- `include_images` (boolean): Whether to include images in the results (optional).
- `include_answer` (boolean): Whether to include a direct answer in the response (optional).
- `include_raw_content` (boolean): Whether to include raw content in the results (optional).
- `max_results` (number): The maximum number of results to return (optional).
- `include_domains` (string[]): A list of domains to include in the search (optional).
- `exclude_domains` (string[]): A list of domains to exclude from the search (optional).

### Response Handling

The `Response` type can be either a success or an error response:

#### Success Response

```ts
{
  success: true;
  data: {
    answer: string | null;
    query: string;
    response_time: number;
    follow_up_questions: string[] | null;
    images: string[] | null;
    results: {
      title: string;
      url: string;
      content: string;
      raw_content: string | null;
      score: string | number;
    }[];
  };
}
```

#### Error Response

```ts
{
  success: false;
  errorMessage: string;
  code: number;
}
```

## API Documentation

### `TavilySearchAPI`

#### Constructor

```ts
constructor(config: { apiKey: string });
```

- `apiKey` (string): Your Tavily API key.

#### Methods

##### `search(params: TavilySearchParams): Promise<Response>`

Performs a search query using the provided parameters.

- `params` (TavilySearchParams): The search parameters.
- Returns: `Promise<Response>`

## Examples

### Basic Search

```ts
const api = new TavilySearchAPI({ apiKey: 'your-api-key-here' });

api.search({ query: 'Latest news on AI', max_results: 3 })
  .then((response) => {
    if (response.success) {
      console.log(response.data);
    } else {
      console.error(response.errorMessage);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Advanced Search

```ts
const api = new TavilySearchAPI({ apiKey: 'your-api-key-here' });

api.search({
  query: 'Climate change effects',
  search_depth: 'advanced',
  include_images: true,
  max_results: 10,
  include_domains: ['example.com'],
})
  .then((response) => {
    if (response.success) {
      console.log(response.data);
    } else {
      console.error(response.errorMessage);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## Error Handling

The package provides detailed error handling for various scenarios, including Axios errors and validation errors from Zod. Ensure you handle these errors appropriately in your application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance with using the `@safeeullah/tavily-api` package.