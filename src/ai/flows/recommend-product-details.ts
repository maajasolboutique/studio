'use server';
/**
 * @fileOverview A Genkit flow for generating product recommendations based on a viewed product.
 *
 * - recommendProductDetails - A function that handles the product recommendation process.
 * - RecommendProductDetailsInput - The input type for the recommendProductDetails function.
 * - RecommendProductDetailsOutput - The return type for the recommendProductDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const RecommendProductDetailsInputSchema = z.object({
  productId: z.string().describe('The ID of the product the user is currently viewing.'),
  productName: z.string().describe('The name of the product the user is currently viewing.'),
  productDescription: z.string().describe('The description of the product the user is currently viewing.'),
  productCategory: z.string().describe('The category of the product the user is currently viewing.'),
});
export type RecommendProductDetailsInput = z.infer<typeof RecommendProductDetailsInputSchema>;

// Output Schema
const RecommendedProductSchema = z.object({
  id: z.string().describe('A unique identifier for the recommended product (e.g., "prod_XYZ").'),
  name: z.string().describe('The name of the recommended product.'),
  reason: z.string().describe('A brief explanation of why this product is recommended (e.g., "similar style", "often bought together", "completes the look").'),
});

const RecommendProductDetailsOutputSchema = z.object({
  recommendations: z.array(RecommendedProductSchema).describe('A list of recommended products.'),
});
export type RecommendProductDetailsOutput = z.infer<typeof RecommendProductDetailsOutputSchema>;

// Exported wrapper function
export async function recommendProductDetails(input: RecommendProductDetailsInput): Promise<RecommendProductDetailsOutput> {
  return recommendProductDetailsFlow(input);
}

// Prompt definition
const recommendProductDetailsPrompt = ai.definePrompt({
  name: 'recommendProductDetailsPrompt',
  input: {schema: RecommendProductDetailsInputSchema},
  output: {schema: RecommendProductDetailsOutputSchema},
  prompt: `You are an expert e-commerce product recommendation assistant. Your goal is to suggest 3-5 products that are either similar to the product being viewed or complement it, enhancing the user's shopping experience.

Provide a brief reason for each recommendation. The product IDs should be placeholders like "prod_XYZ" as you do not have access to a real product database. Focus on creative and relevant product suggestions.

Here is the product the user is currently viewing:
Product Name: {{{productName}}}
Product Category: {{{productCategory}}}
Product Description: {{{productDescription}}}

Based on this information, recommend 3-5 similar or complementary products.`,
});

// Flow definition
const recommendProductDetailsFlow = ai.defineFlow(
  {
    name: 'recommendProductDetailsFlow',
    inputSchema: RecommendProductDetailsInputSchema,
    outputSchema: RecommendProductDetailsOutputSchema,
  },
  async (input) => {
    const {output} = await recommendProductDetailsPrompt(input);
    return output!;
  }
);
