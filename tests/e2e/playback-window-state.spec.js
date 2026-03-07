import { test, expect } from "@playwright/test";

async function openBrinkstraat(page) {
  await page.goto("/");
  await page.waitForSelector('[data-enter-library="1"]');
  await page.click('[data-enter-library="1"]');
  await page.click('[data-run-track-exe="t1"]');
  await expect(page.locator('.window[data-id="player-t1"]')).toBeVisible();
  await expect(page.locator('.window[data-id="source-t1"]')).toBeVisible();
}

async function markEditorNode(page) {
  return page.evaluate(() => {
    const replEl = document.querySelector('[data-repl="player-t1"] strudel-editor');
    if (!replEl) return null;
    if (!replEl.dataset.nodeId) replEl.dataset.nodeId = `node-${Math.random().toString(36).slice(2)}`;
    return replEl.dataset.nodeId;
  });
}

test("player preserves REPL state across maximize/restore/minimize/reopen", async ({ page }) => {
  await openBrinkstraat(page);

  await page.click('[data-play="player-t1"]');
  await expect(page.locator('[data-play-section="player-t1"]')).not.toHaveText("Idle");

  const idBefore = await markEditorNode(page);
  expect(idBefore).not.toBeNull();

  await page.click('[data-maximize="player-t1"]');
  await expect(page.locator('.window[data-id="player-t1"]')).toHaveClass(/window-maximized/);
  const idAfterMax = await markEditorNode(page);
  expect(idAfterMax).toBe(idBefore);

  await page.click('[data-maximize="player-t1"]');
  await expect(page.locator('.window[data-id="player-t1"]')).not.toHaveClass(/window-maximized/);
  const idAfterRestore = await markEditorNode(page);
  expect(idAfterRestore).toBe(idBefore);

  await page.click('[data-minimize="player-t1"]');
  await page.click('[data-task="player-t1"]');
  await expect(page.locator('.window[data-id="player-t1"]')).toBeVisible();
  const idAfterMinRestore = await markEditorNode(page);
  expect(idAfterMinRestore).toBe(idBefore);

  await page.click('[data-stop="player-t1"]');
  await expect(page.locator('[data-play-section="player-t1"]')).toHaveText("Idle");

  await page.click('[data-run-track-exe="t1"]');
  const idAfterReopen = await markEditorNode(page);
  expect(idAfterReopen).toBe(idBefore);
});

test("viz reactivity updates UI classes and sample highlight while playing", async ({ page }) => {
  await openBrinkstraat(page);
  await page.click('[data-play="player-t1"]');

  const playerWindow = page.locator('.window[data-id="player-t1"]');
  await expect(playerWindow).toHaveClass(/window-reactive/);

  const sourceHighlights = page.locator('.window[data-id="source-t1"] .is-playing-source');
  await expect(sourceHighlights.first()).toBeVisible();

  await expect(page.locator('[data-play-section="player-t1"]')).toContainText("Section");
});

test("stress: repeated maximize/restore/minimize/reopen keeps player responsive", async ({ page }) => {
  await openBrinkstraat(page);
  const playerWindow = page.locator('.window[data-id="player-t1"]');
  const sectionLabel = page.locator('[data-play-section="player-t1"]');

  await page.click('[data-play="player-t1"]');
  await expect(sectionLabel).not.toHaveText("Idle");

  const initialNodeId = await markEditorNode(page);
  expect(initialNodeId).not.toBeNull();

  for (let i = 0; i < 12; i += 1) {
    await page.click('[data-maximize="player-t1"]');
    await expect(playerWindow).toHaveClass(/window-maximized/);
    await page.waitForTimeout(80);

    await page.click('[data-maximize="player-t1"]');
    await expect(playerWindow).not.toHaveClass(/window-maximized/);
    await page.waitForTimeout(80);
  }

  for (let i = 0; i < 8; i += 1) {
    await page.click('[data-minimize="player-t1"]');
    await page.click('[data-task="player-t1"]');
    await expect(playerWindow).toBeVisible();
    await page.waitForTimeout(80);
  }

  for (let i = 0; i < 8; i += 1) {
    await page.click('[data-run-track-exe="t1"]');
    await expect(playerWindow).toBeVisible();
    await page.waitForTimeout(80);
  }

  const finalNodeId = await markEditorNode(page);
  expect(finalNodeId).toBe(initialNodeId);
  await expect(sectionLabel).not.toHaveText("Idle");

  await page.click('[data-stop="player-t1"]');
  await expect(sectionLabel).toHaveText("Idle");
});
