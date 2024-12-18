import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  getCertificateUrl,
  getDonorAllDonations,
  getTotalDonorsOfBadge,
  storeCertificate,
} from "@/lib/chatbot/db/blood-bridge/donor";
import { jsPDF } from "jspdf";
import fs from "fs/promises";
import path from "path";

export class GenerateCertificate extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const donorAllDonations = await getDonorAllDonations(context.user.user_id);

    const totalDonations = donorAllDonations.length;
    const badge = getDonationBadge(totalDonations);
    const totalDonorsOfBadge = await getTotalDonorsOfBadge(badge);

    const certificateUrl = await createCertificate(
      context.user.name,
      donorAllDonations[0].donation_date,
      badge
    );

    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "document",
              document: {
                link: certificateUrl,
                filename: "Your Warrior Badge",
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: totalDonations.toString(),
            },
            {
              type: "text",
              text: badge,
            },
            {
              type: "text",
              text: totalDonorsOfBadge.toString(),
            },
            {
              type: "text",
              text: badge,
            },
          ],
        },
      ],
    };
  }
}

export const createCertificate = async (
  name: string,
  date: string,
  badge: string
): Promise<string> => {
  try {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const certificateImg = path.join(
      process.cwd(),
      "src",
      "assets",
      "certificates",
      `${badge}.png`
    );

    const imageData = await fs.readFile(certificateImg);
    const base64Img = `data:image/png;base64,${imageData.toString("base64")}`;
    doc.addImage(base64Img, "PNG", 0, 0, 297, 210);

    doc.setFontSize(18);
    doc.text(
      name,
      doc.internal.pageSize.getWidth() / 2 - 56,
      doc.internal.pageSize.getHeight() / 2 - 3,
      {
        align: "center",
        charSpace: 0.3,
      }
    );

    doc.setFontSize(14);
    doc.text(
      new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      doc.internal.pageSize.getWidth() / 2 - 56,
      doc.internal.pageSize.getHeight() / 2 + 14,
      { align: "center" }
    );

    // Generate a unique filename
    const pdfName = `${name}-${badge}-${date}-certificate.pdf`.replace(
      / /g,
      "-"
    );

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    await storeCertificate(pdfName, pdfBuffer);

    const newUrl = await getCertificateUrl(pdfName);
    return newUrl;
  } catch (error) {
    console.error("Error generating certificate:", error);
    throw new Error("We are sorry, but we failed to generate your certificate. Please try again later.");
  }
};

const getDonationBadge = (donationCount: number): string => {
  if (donationCount >= 10) {
    return "Gladiator";
  } else if (donationCount >= 5) {
    return "Spartan";
  } else if (donationCount >= 3) {
    return "Knight";
  } else if (donationCount >= 2) {
    return "Samurai";
  } else {
    return "Warrior";
  }
};
