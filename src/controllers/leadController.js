import fs from "fs";
import csv from "csv-parser";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const leadsPath = "src/data/leads.json";

export const uploadMiddleware = upload.single("file");

export const uploadLeads = (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            fs.writeFileSync(leadsPath, JSON.stringify(results, null, 2));
            res.status(200).json({ message: "Leads uploaded!", count: results.length });
        });
};
