import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  getDonorAllDonations,
  getTotalDonorsOfBadge,
} from "@/lib/chatbot/db/blood-bridge/donor";
import { jsPDF } from "jspdf";
import fs from "fs/promises";
import path from "path";

export class GenerateCertificate extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const donorAllDonations = await getDonorAllDonations(context.user.user_id);

    const totalDonations = donorAllDonations.length;
    const badge = await getDonationBadge(totalDonations);
    const totalDonorsOfBadge = await getTotalDonorsOfBadge(badge);

    const pdfPath = await createCertificate(
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
                link: `${process.env.NEXT_PUBLIC_APP_URL}${pdfPath}`,
                filename: "Blood Donation Certificate",
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
  // Create certificates directory if it doesn't exist
  const certificatesDir = path.join(
    process.cwd(),
    "public",
    "generated-certificates"
  );
  await fs.mkdir(certificatesDir, { recursive: true });

  // Save PDF file
  const pdfName = `${name}-${badge}-${date}-certificate.pdf`.replace(/ /g, "-");
  const pdfPath = path.join(certificatesDir, pdfName);

  // Check if file already exists
  if (
    await fs
      .access(pdfPath)
      .then(() => true)
      .catch(() => false)
  ) {
    return `/generated-certificates/${pdfName}`;
  }
  // Create PDF in landscape A4
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

  // Add text
  doc.setFontSize(18);
  //   doc.setFont("Helvetica", "bold");

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
  //   doc.setFont("Helvetica", "normal");
  doc.text(
    // Format date to 18-Jul-2024
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    doc.internal.pageSize.getWidth() / 2 - 56,
    doc.internal.pageSize.getHeight() / 2 + 14,
    { align: "center" }
  );

  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
  await fs.writeFile(pdfPath, pdfBuffer);

  return `/generated-certificates/${pdfName}`;
};

const getDonationBadge = (donationCount: number): string => {
  if (donationCount >= 10) {
    return "Gladiator";
  } else if (donationCount >= 5) {
    return "Spartan";
  } else if (donationCount >= 3) {
    return "Knight";
  } else if (donationCount >= 1) {
    return "Samurai";
  } else {
    return "Warrior";
  }
};
