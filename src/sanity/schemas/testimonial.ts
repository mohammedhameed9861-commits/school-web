import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "آراء الطلاب وأولياء الأمور",
  type: "document",
  fields: [
    defineField({ name: "nameAr", title: "الاسم (عربي)", type: "string" }),
    defineField({ name: "nameEn", title: "Name (English)", type: "string" }),
    defineField({ name: "roleAr", title: "الدور (عربي، مثال: ولي أمر طالب)", type: "string" }),
    defineField({ name: "roleEn", title: "Role (English)", type: "string" }),
    defineField({ name: "quoteAr", title: "الرأي (عربي)", type: "text", rows: 4 }),
    defineField({ name: "quoteEn", title: "Quote (English)", type: "text", rows: 4 }),
    defineField({ name: "avatar", title: "الصورة الشخصية", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "الترتيب", type: "number" }),
  ],
  preview: {
    select: { title: "nameAr", subtitle: "roleAr", media: "avatar" },
  },
  orderings: [{ title: "الترتيب", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
