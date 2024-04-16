let BandList = ["Coldplay", "Radiohead", "Maroon 5", "BTS", "Blackpink"];

const MIN_DELAY = 500;
const MAX_DELAY = 1000;

export async function getBandList(
  delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY,
) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return BandList;
}

export async function addBand(
  name,
  delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY,
) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  BandList = [name, ...BandList];
  return BandList;
}
