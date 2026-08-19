import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "البرامج الدراسية",
  type: "document",
  fields: [
    defineField({ name: "titleAr", title: "اسم البرنامج (عربي)", type: "string" }),
    defineField({ name: "titleEn", title: "Program Name (English)", type: "string" }),
    defineField({ name: "descriptionAr", title: "الوصف (عربي)", type: "text", rows: 4 }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 4 }),
    defineField({ name: "image", title: "الصورة", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "الترتيب", type: "number" }),
  ],
  preview: {
    select: { title: "titleAr", media: "image" },
  },
  orderings: [{ title: "الترتيب", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
