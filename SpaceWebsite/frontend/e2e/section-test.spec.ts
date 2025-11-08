import { test, expect } from '@playwright/test';

test('AURA Beyond Space section appears correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Check if "AURA Beyond Space" section exists (the second one)
  const sections = page.locator('section:has(h2:has-text("AURA Beyond Space"))');
  await expect(sections.nth(1)).toBeVisible();
  const section = sections.nth(1);

  // Check if it appears after Earth Applications section
  const earthSection = page.locator('section:has(h2:has-text("Earth Applications: AURA Beyond Space"))');
  const beyondSections = page.locator('section:has(h2:has-text("AURA Beyond Space"))');
  const beyondSection = beyondSections.nth(1);

  // Verify Earth Applications section exists
  await expect(earthSection).toBeVisible();

  // Check positioning - AURA Beyond Space should come after Earth Applications
  const earthBox = await earthSection.boundingBox();
  const beyondBox = await beyondSection.boundingBox();

  if (earthBox && beyondBox) {
    expect(beyondBox.y).toBeGreaterThanOrEqual(earthBox.y + earthBox.height);
  }

  // Check poster image
  const posterImage = page.locator('img[alt="AURA Beyond Space Poster"]');
  await expect(posterImage).toBeVisible();

  // Check if image loads properly
  await expect(posterImage).toHaveAttribute('src', /Poster\.png/);

  // Check responsiveness - test on different viewport sizes
  await page.setViewportSize({ width: 768, height: 1024 }); // Tablet
  await expect(section).toBeVisible();
  await expect(posterImage).toBeVisible();

  await page.setViewportSize({ width: 375, height: 667 }); // Mobile
  await expect(section).toBeVisible();
  await expect(posterImage).toBeVisible();

  // Reset to desktop
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Check for console errors
  const errors = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  // Wait a bit and check no errors occurred
  await page.waitForTimeout(2000);
  expect(errors.length).toBe(0);

  // Validate styling matches design - check that title is white
  const titleColor = await section.locator('h2').evaluate((el: Element) => getComputedStyle(el).color);
  expect(titleColor).toBe('rgb(255, 255, 255)'); // white
});