// ruleEngine.js
export function calculateRuleScore(lead, offer) {
    let score = 0;

    // Role relevance
    if (["CEO", "Head", "VP", "Director"].some(r => lead.role.includes(r))) score += 20;
    else if (["Manager", "Lead"].some(r => lead.role.includes(r))) score += 10;

    // Industry match
    if (offer.ideal_use_cases.includes(lead.industry)) score += 20;
    else score += 0;

    // Data completeness
    if (lead.name && lead.role && lead.company && lead.industry && lead.location && lead.linkedin_bio)
        score += 10;

    return score;
}

export function getRoleRelevance(role) {
    if (["CEO", "Head", "VP", "Director"].some(r => role.includes(r))) return "decision maker";
    if (["Manager", "Lead"].some(r => role.includes(r))) return "influencer";
    return "other";
}

export function getIndustryMatch(industry, idealUseCases) {
    return idealUseCases.includes(industry) ? industry : "adjacent industry";
}
