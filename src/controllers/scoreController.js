import fs from "fs";
import { calculateRuleScore, getRoleRelevance, getIndustryMatch } from "../services/ruleEngine.js";
import { getAIIntent } from "../services/aiService.js";

const leadsPath = "src/data/leads.json";
const offerPath = "src/data/offer.json";
const resultPath = "src/data/results.json";

export const runScoring = async (req, res) => {
    try {
        const leads = JSON.parse(fs.readFileSync(leadsPath));
        const offer = JSON.parse(fs.readFileSync(offerPath));
        const results = [];

        for (const lead of leads) {
            const ruleScore = calculateRuleScore(lead, offer);

            // Default fallback values
            let aiIntent = "Medium";
            let aiPoints = 30;
            let reasoning = "";

            try {
                const ai = await getAIIntent(offer, lead);
                aiIntent = ai.intent;
                aiPoints = ai.intent === "High" ? 50 : ai.intent === "Medium" ? 30 : 10;
                reasoning = ai.reasoning;
            } catch {
                // fallback reasoning using rule layer
                aiIntent = ruleScore >= 40 ? "High" : ruleScore >= 20 ? "Medium" : "Low";
                aiPoints = aiIntent === "High" ? 50 : aiIntent === "Medium" ? 30 : 10;

                const roleRelevance = getRoleRelevance(lead.role);
                const industryMatch = getIndustryMatch(lead.industry, offer.ideal_use_cases);

                reasoning = `Fits ICP ${industryMatch} and role is ${roleRelevance}.`;
            }

            const finalScore = ruleScore + aiPoints;

            results.push({
                name: lead.name,
                role: lead.role,
                company: lead.company,
                intent: aiIntent,
                score: finalScore,
                reasoning
            });
        }

        fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
        res.json({ message: "Scoring completed!", total: results.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Scoring failed" });
    }
};

export const getResults = (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(resultPath));
        res.json(data);
    } catch {
        res.status(404).json({ error: "No results found." });
    }
};
