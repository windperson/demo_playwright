import { test, expect } from "@playwright/test";
 
test("Google Flight Search - New York to London", async ({ page }) => {
  // Navigate to Google Flights homepage
  await page.goto("https://www.google.com/travel/flights");
 
  // Verify the Flights landing page is loaded
  await expect(page).toHaveTitle("Find Cheap Flights Worldwide & Book Your Ticket - Google Flights");
 
  // Enter "Where from?" and select the first auto-suggested option
  await page.getByLabel("Where from?").fill("New York");
  await page.getByRole("listbox").getByRole("option").first().click();
 
  // Enter "Where to?" and select the first auto-suggested option
  await page.getByLabel("Where to?").fill("London");
  await page.getByRole("listbox").getByRole("option").first().click();
 
  // Calculate departure date as tomorrow
  const departureDate = new Date();
  departureDate.setDate(departureDate.getDate() + 1);
 
  // Calculate return date as 5 days after departure date
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 6);
 
  // Format dates to DD Month YYYY format - example: 17 August 2025
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const departureDateFormatted = departureDate.toLocaleDateString("en-GB", options);
  const returnDateFormatted = returnDate.toLocaleDateString("en-GB", options);
 
  // Click on the Departure field, so that date picker modal is opened
  await page.getByRole("textbox", { name: "Departure" }).click();
  await page.waitForTimeout(1000); // Small wait to allow date picker modal animation to complete
 
  // Enter departure date and confirm selection
  await page.getByRole("textbox", { name: "Departure" }).fill(departureDateFormatted);
  await page.getByRole("textbox", { name: "Departure" }).press("Enter");
 
  // Enter return date and confirm selection
  await page.getByRole("textbox", { name: "Return" }).fill(returnDateFormatted);
  await page.getByRole("textbox", { name: "Return" }).press("Enter");
 
  // Close the date picker modal
  await page.getByRole("button", { name: "Done" }).click();
  await page.waitForTimeout(1000); // Wait for overlays / transitions to fully disappear
 
  // Trigger flight search
  await page.getByRole("button", { name: "Search" }).click();
 
  // Verify search results page reflects correct route
  await expect(page).toHaveTitle("New York to London | Google Flights");
});