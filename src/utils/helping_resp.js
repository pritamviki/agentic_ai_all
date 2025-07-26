
const helping_resp = [
  { "resp": "You may be eligible for compensation under the government’s disaster relief fund for farmers affected by natural calamities." },
  { "resp": "Contact your local agricultural office to apply for crop loss insurance or compensation schemes." },
  { "resp": "The government often announces emergency relief packages after hurricanes—stay updated through local news or panchayat offices." },
  { "resp": "If you're registered under the PM Fasal Bima Yojana, you can file a claim for the damaged crops." },
  { "resp": "You can approach your district collector’s office or tehsildar to file a damage report and request relief." },
  { "resp": "Apply for assistance through the National Disaster Response Fund (NDRF) if your state has declared it a disaster zone." },
  { "resp": "The state government might provide seeds, fertilizers, and farming equipment at subsidized rates for affected farmers." },
  { "resp": "Emergency financial aid may be provided directly into your bank account linked with your Aadhaar and farmer ID." },
  { "resp": "Local agricultural extension officers can guide you on replanting options and government rehabilitation schemes." },
  { "resp": "You can join a farmers' group or cooperative to collectively raise concerns and seek quicker government support." },
  { "resp": "In some cases, the government provides interest-free loans or moratoriums on existing agricultural loans." },
  { "resp": "You might qualify for temporary employment under MGNREGA or other rural employment schemes during recovery." },
  { "resp": "Farmers affected by natural disasters can receive free training on alternative farming practices from government agencies." },
  { "resp": "Relief kits containing essentials like food, water, and medical supplies may be distributed to affected farming families." },
  { "resp": "If you’ve lost livestock along with crops, you may be entitled to compensation under animal husbandry relief policies." },
  { "resp": "Check the state agriculture department’s website for online portals where you can apply for crop loss compensation." },
  { "resp": "The Revenue Department typically conducts surveys after such disasters to assess damage—ensure your land is included." },
  { "resp": "District-level grievance cells can help you escalate issues if you’re not receiving timely aid." },
  { "resp": "You can also consult with local NGOs who often coordinate with the government to assist affected farmers." },
  { "resp": "Some government relief programs also provide mental health and counseling services for distressed farmers." }
]

export const diseaseInfo = {
  prediction: {
    crop_name: "Apple",
    disease_name: "Cedar Apple Rust"
  },
  confidence: 1.0000,
  cure: [
    "Apply fungicides such as myclobutanil or propiconazole early in the season.",
    "Remove infected leaves and galls from nearby juniper trees to reduce spore spread.",
    "Use systemic fungicides at 7–14 day intervals during the infection period."
  ],
  prevention: [
    "Plant resistant apple varieties (e.g., Redfree, Liberty, or Freedom).",
    "Avoid planting apple trees near eastern red cedar or juniper species.",
    "Prune apple trees regularly to improve air circulation and reduce humidity.",
    "Apply preventive fungicide sprays during early spring before symptoms appear."
  ]
};


function getRandomIndex() {
  return Math.floor(Math.random() * 20);
}

export function getHelpingResponse() {
  const index = getRandomIndex();
  return helping_resp[index].resp;
}

export function isSimilarQuery(input) {
  const keywords = [
    "lost", "crops", "hurricane", "storm", 
    "flood", "disaster", "government", "help", 
    "support", "damage", "compensation", "relief", "farmers",
    "aid", "assistance", "apply", "fund", "insurance",
    "report", "claim", "emergency", "rehabilitation",
    "agriculture", "financial", "aid", "livestock",
    "seeds", "fertilizers", "equipment", "training",
    "grants", "NGO"
];
  const inputLower = input.toLowerCase();

  let matchCount = 0;
  keywords.forEach(word => {
    if (inputLower.includes(word)) {
      matchCount++;
    }
  });

  // If 3 or more keywords match, consider it similar
  return matchCount >= 3;
}
