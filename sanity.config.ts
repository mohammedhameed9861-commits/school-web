import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "alsharq-school",
  title: "ثانوية الشرق — لوحة المحتوى",
  projectId: "tumwflm5",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("المحتوى")
          .items([
            S.listItem()
              .title("إعدادات الموقع")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("القسم الرئيسي (Hero)")
              .id("heroContent")
              .child(
                S.document()
                  .schemaType("heroContent")
                  .documentId("heroContent")
              ),
            S.listItem()
              .title("الإحصائيات")
              .id("statsSection")
              .child(
                S.document()
                  .schemaType("statsSection")
                  .documentId("statsSection")
              ),
            S.divider(),
            S.documentTypeListItem("advantage").title("المميزات"),
            S.documentTypeListItem("program").title("البرامج الدراسية"),
            S.documentTypeListItem("achievement").title("الإنجازات"),
            S.documentTypeListItem("testimonial").title("آراء الطلاب"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
