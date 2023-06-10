export default {
  name: "footer",
  title: "Footer Content",
  type: "document",
  fields: [
    {
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        {
          name: "facebook",
          title: "Facebook",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
        {
          title: "Whatsapp Number",
          name: "whatsapp_number",
          type: "string",
          validation: (Rule) =>
            Rule.regex(/^\+?[0-9]{6,}$/).error(
              "Please enter a valid phone number."
            ),
        },
      ],
    },
  ],
};
