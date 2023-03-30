export default {
  name: "social_links",
  title: "Social Links",
  type: "document",
  to: [{ type: "post" }],
  fields: [
    {
      title: "Twitter",
      name: "twitter",
      type: "string",
    },
    {
      title: "Instagram",
      name: "instagram",
      type: "string",
    },
    {
      title: "Facebook",
      name: "facebook",
      type: "string",
    },
    {
      title: "Whatsapp Number",
      name: "whatsapp_number",
      type: "number",
    },
  ],
};
