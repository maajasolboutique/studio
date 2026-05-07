'use server';
/**
 * @fileOverview A Genkit flow for handling conversational product search.
 *
 * - conversationalProductSearch - A function that processes a natural language query
 *   to provide relevant product suggestions or a refined search query.
 * - ConversationalProductSearchInput - The input type for the conversationalProductSearch function.
 * - ConversationalProductSearchOutput - The return type for the conversationalProductSearch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ConversationalProductSearchInputSchema = z.object({
  query: z.string().describe('The natural language query from the user.'),
});
export type ConversationalProductSearchInput = z.infer<
  typeof ConversationalProductSearchInputSchema
>;

const ProductSuggestionSchema = z.object({
  id: z.string().describe('A unique identifier for the product (can be a placeholder).'),
  name: z.string().describe('The name of the product.'),
  description: z
    .string()
    .describe('A brief description of the product, highlighting key features.'),
  price: z
    .string()
    .describe('The price of the product, formatted as a string (e.g., "$29.99").'),
});

const ConversationalProductSearchOutputSchema = z.object({
  refinedQuery: z
    .string()
    .describe('A refined search query optimized for an e-commerce search engine.'),
  productSuggestions: z
    .array(ProductSuggestionSchema)
    .optional()
    .describe(
      'An optional array of product suggestions, provided if the user query is specific enough.'
    ),
});
export type ConversationalProductSearchOutput = z.infer<
  typeof ConversationalProductSearchOutputSchema
>;

export async function conversationalProductSearch(
  input: ConversationalProductSearchInput
): Promise<ConversationalProductSearchOutput> {
  return conversationalProductSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conversationalProductSearchPrompt',
  input: { schema: ConversationalProductSearchInputSchema },
  output: { schema: ConversationalProductSearchOutputSchema },
  prompt: `You are an AI assistant for an e-commerce platform, specialized in helping users find products.
Your goal is to interpret natural language queries and provide helpful output for product search.

Based on the user's query, you must always provide a 'refinedQuery' that is optimized for an e-commerce search engine. This query should be concise and use relevant keywords.

If the user's query is specific enough and seems to be asking for direct examples or suggestions (e.g., "show me some examples of...", "what kind of...", "do you have..."), you should also provide 'productSuggestions'. These should be plausible, representative examples of products that fit the refined query. For product suggestions, include a placeholder 'id', a 'name', a 'description', and a 'price'. If the query is too general or doesn't explicitly ask for examples, omit the 'productSuggestions' array.

User Query: {{{query}}}`,
});

const conversationalProductSearchFlow = ai.defineFlow(
  {
    name: 'conversationalProductSearchFlow',
    inputSchema: ConversationalProductSearchInputSchema,
    outputSchema: ConversationalProductSearchOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate conversational product search response.');
    }
    return output;
  }
);
