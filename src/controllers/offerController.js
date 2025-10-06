import fs from "fs";
const offerPath = "src/data/offer.json";

export const createOffer = (req, res) => {
    try {
        fs.writeFileSync(offerPath, JSON.stringify(req.body, null, 2));
        res.status(201).json({ message: "Offer saved successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save offer." });
    }
};
