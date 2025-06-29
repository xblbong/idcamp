export async function withViewTransition(renderPageFn) {
  if (document.startViewTransition) {
    await document.startViewTransition(async () => {
      await renderPageFn();
    });
  } else {
    await renderPageFn();
  }
}