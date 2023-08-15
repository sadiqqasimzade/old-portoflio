import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        // const { name, email, message } = req.body;
        return res.status(500).json({ error: 'Email service is not active' });

        // await transporter.sendMail(mailOptions);
  
        return res.status(200).json({ success: 'Email sent successfully!' });
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email.' });
      }
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
}