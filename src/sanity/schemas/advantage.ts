import { defineField, defineType } from "sanity";

export const advantage = defineType({
  name: "advantage",
  title: "المميزات",
  type: "document",
  fields: [
    defineField({ name: "titleAr", title: "العنوان (عربي)", type: "string" }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
    defineField({ name: "descriptionAr", title: "الوصف (عربي)", type: "text", rows: 3 }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "الأيقونة (Emoji)", type: "string" }),
    defineField({ name: "order", title: "الترتيب", type: "number" }),
  ],
  preview: {
    select: { title: "titleAr", subtitle: "icon" },
  },
  orderings: [{ title: "الترتيب", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
