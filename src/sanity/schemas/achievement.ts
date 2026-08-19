import { defineField, defineType } from "sanity";

export const achievement = defineType({
  name: "achievement",
  title: "الإنجازات",
  type: "document",
  fields: [
    defineField({ name: "valueAr", title: "القيمة (عربي، مثال: +٢٠٠٠)", type: "string" }),
    defineField({ name: "valueEn", title: "Value (English, e.g. 2000+)", type: "string" }),
    defineField({ name: "labelAr", title: "الوصف (عربي)", type: "string" }),
    defineField({ name: "labelEn", title: "Label (English)", type: "string" }),
    defineField({ name: "order", title: "الترتيب", type: "number" }),
  ],
  preview: {
    select: { title: "labelAr", subtitle: "valueAr" },
  },
  orderings: [{ title: "الترتيب", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
