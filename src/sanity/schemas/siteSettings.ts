import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "إعدادات الموقع",
  type: "document",
  fields: [
    defineField({ name: "schoolNameAr", title: "اسم المدرسة (عربي)", type: "string" }),
    defineField({ name: "schoolNameEn", title: "School Name (English)", type: "string" }),
    defineField({ name: "phone", title: "رقم الهاتف", type: "string" }),
    defineField({ name: "whatsapp", title: "رقم الواتساب", type: "string" }),
    defineField({ name: "email", title: "البريد الإلكتروني", type: "string" }),
    defineField({ name: "addressAr", title: "العنوان (عربي)", type: "string" }),
    defineField({ name: "addressEn", title: "Address (English)", type: "string" }),
    defineField({ name: "instagramUrl", title: "رابط الإنستغرام", type: "url" }),
    defineField({ name: "facebookUrl", title: "رابط الفيسبوك", type: "url" }),
    defineField({ name: "googleMapsEmbedUrl", title: "رابط خريطة Google Maps", type: "url" }),
  ],
  preview: {
    prepare: () => ({ title: "إعدادات الموقع" }),
  },
});
