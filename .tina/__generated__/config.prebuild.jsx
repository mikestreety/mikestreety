// .tina/config.js
import { defineConfig } from "tinacms";
var slugIt = function(str) {
  if (str) {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    var from = "\xE0\xE1\xE4\xE2\xE8\xE9\xEB\xEA\xEC\xED\xEF\xEE\xF2\xF3\xF6\xF4\xF9\xFA\xFC\xFB\xF1\xE7\xB7/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  }
  return str;
};
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: "3b3acb3c-0333-4262-b2e9-c030f8db4b4f",
  // Get this from tina.io
  token: "d4020cad93847c6b531e541a66f391809bff2817",
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "html"
  },
  media: {
    tina: {
      mediaRoot: "build/img/content",
      publicFolder: "html"
    }
  },
  schema: {
    collections: [
      {
        label: "Notes",
        name: "notes",
        path: "app/content/notes",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              return slugIt(values?.title);
            }
          }
        },
        defaultItem: () => {
          return {
            date: (/* @__PURE__ */ new Date()).toISOString()
          };
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "title"
          },
          {
            type: "string",
            name: "link",
            label: "link"
          },
          {
            type: "datetime",
            name: "date",
            label: "date",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "HH:MM:SS"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true
          }
        ]
      },
      {
        label: "Blog",
        name: "blog",
        path: "app/content/blog",
        format: "md",
        ui: {
          permalink: {
            slugify: (values) => {
              return slugIt(values?.title);
            }
          }
        },
        defaultItem: () => {
          return {
            date: (/* @__PURE__ */ new Date()).toISOString()
          };
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "title"
          },
          {
            type: "datetime",
            name: "date",
            label: "date"
          },
          {
            type: "datetime",
            name: "updated",
            label: "updated"
          },
          {
            type: "string",
            name: "intro",
            label: "intro",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "canonical",
            label: "canonical"
          },
          {
            type: "string",
            name: "publication",
            label: "publication"
          },
          {
            type: "string",
            name: "permalink",
            label: "permalink"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true
          },
          {
            type: "string",
            name: "tags",
            label: "tags",
            list: true
          }
        ]
      },
      {
        label: "Drafts",
        name: "drafts",
        path: "app/content/drafts",
        format: "md",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true
          },
          {
            type: "string",
            name: "title",
            label: "title"
          },
          {
            type: "datetime",
            name: "date",
            label: "date"
          },
          {
            type: "datetime",
            name: "updated",
            label: "updated"
          },
          {
            type: "string",
            name: "intro",
            label: "intro",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "canonical",
            label: "canonical"
          },
          {
            type: "string",
            name: "publication",
            label: "publication"
          },
          {
            type: "string",
            name: "permalink",
            label: "permalink"
          },
          {
            type: "string",
            name: "tags",
            label: "tags",
            list: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
