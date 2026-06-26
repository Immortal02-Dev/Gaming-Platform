import fs from "fs";
import path from "path";

const htmlPath = path.resolve("admin/sportCompetitionSetting.html");
const outputPath = path.resolve("admin/data/sportCompetitionSettings.json");

const html = fs.readFileSync(htmlPath, "utf8");

const extractOptions = (selectName) => {
  const selectRegex = new RegExp(
    `<select[^>]+name="${selectName}"[^>]*>([\\s\\S]*?)<\\/select>`,
    "i"
  );
  const match = html.match(selectRegex);
  if (!match) {
    throw new Error(`Select with name "${selectName}" not found`);
  }
  const optionsHtml = match[1];
  const optionRegex = /<option value="([^"]*)">([^<]*)<\/option>/g;
  const options = [];
  let optionMatch;
  while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
    const value = optionMatch[1];
    const label = optionMatch[2].trim();
    options.push({
      value: value === "" ? null : Number(value),
      label,
    });
  }
  return options;
};

const regions = extractOptions("regionIdx");
const sports = extractOptions("sportIdx");

const detailRegex = /getCompetitionDetail\((.*?)\);/g;
const competitions = [];
let match;
let no = 1;

while ((match = detailRegex.exec(html)) !== null) {
  const argsString = match[1];
  const args = eval(`[${argsString}]`);
  const [
    competitionIdx,
    competitionName,
    regionName,
    sportName,
    displayName,
    imageUrl,
    sort,
    isMain,
    prematchUseYN,
    liveUseYN,
    updateUserName,
    updateDate,
  ] = args;

  const regionOption = regions.find((opt) => opt.label === regionName);
  const sportOption = sports.find((opt) => opt.label === sportName);

  competitions.push({
    no: no++,
    competitionIdx,
    competitionName,
    regionName,
    regionIdx: regionOption?.value ?? null,
    sportName,
    sportIdx: sportOption?.value ?? null,
    displayName: displayName ?? "",
    imageUrl: imageUrl ?? "",
    sortOrder:
      sort === null || sort === undefined || sort === "" ? null : Number(sort),
    isMain: Number(isMain) === 1,
    prematchUseYN: Number(prematchUseYN) === 1,
    liveUseYN: Number(liveUseYN) === 1,
    updateUserName: updateUserName ?? "",
    updatedAt: updateDate ?? "",
  });
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  JSON.stringify({ regions, sports, competitions }, null, 2),
  "utf8"
);

console.log(
  `Extracted ${competitions.length} competitions, ${regions.length} regions, ${sports.length} sports`
);












