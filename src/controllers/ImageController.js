import cloudinary from "../config/cloudinary.js";
// import pgDatabase from "../config/postgres.js";
// import MongoImageModel from "../models/ImageModel.js";

// ==============================
// Generate Upload Signature
// ==============================
const ImageUploadSignature = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const timestamp = Math.round(Date.now() / 1000);

    const folder = `syai_uploads/${req.user.id}`;

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
        allowed_formats: ["jpg", "png", "webp"],
        max_file_size: 2 * 1024 * 1024 // 2MB
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME
    });
  } catch (err) {
    console.error("Signature error:", err);
    res.status(500).json({ error: "Failed to generate signature" });
  }
};

// ==============================
// Save Image
// ==============================
const ImageSaver = async (req, res) => {
  try {
    const { secure_url, public_id, type } = req.body;

    // 1. Basic validation
    if (!secure_url || !public_id) {
      return res.status(400).json({ error: "Missing image metadata" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!["profile", "post"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    // 2. Validate URL safely
    let url;
    try {
      url = new URL(secure_url);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    if (url.hostname !== "res.cloudinary.com") {
      return res.status(400).json({ error: "Invalid image source" });
    }

    // 3. Fetch resource from Cloudinary
    let result;
    try {
      result = await cloudinary.api.resource(public_id);
    } catch {
      return res.status(400).json({ error: "Invalid public_id" });
    }

    // 4. Verify integrity
    if (result.secure_url !== secure_url) {
      return res.status(400).json({ error: "Image mismatch" });
    }

    if (!result.public_id.startsWith(`syai_uploads/${req.user.id}`)) {
      return res.status(403).json({ error: "Unauthorized image" });
    }

    if (!["jpg", "png", "webp"].includes(result.format)) {
      return res.status(400).json({ error: "Invalid format" });
    }

    if (result.bytes > 2 * 1024 * 1024) {
      return res.status(400).json({ error: "File too large" });
    }

    // ==========================
    // PROFILE IMAGE
    // ==========================
    if (type === "profile") {
        console.log("profile")
    //   const user = await pgDatabase("users")
    //     .where({ id: req.user.id })
    //     .first();

    //   const oldPublicId = user?.cloudinary_id;

      // 1. Update DB FIRST
    //   await pgDatabase("users")
    //     .where({ id: req.user.id })
    //     .update({
    //       profile_image_url: secure_url,
    //       cloudinary_id: public_id,
    //       updated_at: new Date()
    //     });

      // 2. Delete old image AFTER success (non-critical)
      if (oldPublicId) {
        cloudinary.uploader
          .destroy(oldPublicId)
          .catch((e) =>
            console.warn("Cloudinary delete failed:", e.message)
          );
      }
    }

    // ==========================
    // POST IMAGE
    // ==========================
    else {
        console.log("content")
    //   await MongoImageModel.updateOne(
    //     { publicId: public_id },
    //     {
    //       $setOnInsert: {
    //         userId: req.user.id,
    //         url: secure_url,
    //         createdAt: new Date()
    //       }
    //     },
    //     { upsert: true }
    //   );
    }

    // Final response
    res.json({
      url: secure_url,
      public_id
    });

  } catch (err) {
    console.error("ImageSaver error:", err);
    res.status(500).json({ error: "Database save failed" });
  }
};

export { ImageSaver, ImageUploadSignature };