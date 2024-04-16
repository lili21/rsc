let BandList = ["Coldplay", "Radiohead", "Maroon 5", "BTS", "Blackpink"];

const MIN_DELAY = 200;
const MAX_DELAY = 500;

export async function getBandList(
  delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY,
) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return BandList;
}
