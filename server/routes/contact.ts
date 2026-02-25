import { Request, Response } from "express";

export async function handleContact(req: Request, res: Response) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error("EmailJS configuration missing in environment");
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "IZERE Joshua",
      },
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`EmailJS API failed: ${errorText}`);
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error("Backend Email Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
