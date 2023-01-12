import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
	branch,
	clientId: "3b3acb3c-0333-4262-b2e9-c030f8db4b4f", // Get this from tina.io
	token: "d4020cad93847c6b531e541a66f391809bff2817", // Get this from tina.io
	build: {
		outputFolder: "admin",
		publicFolder: "html",
	},
	media: {
		tina: {
			mediaRoot: "build/img/content",
			publicFolder: "html",
		},
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
						readonly: true,
						slugify: (values) => {
							return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
						},
					},
				},
				fields: [
					{
						type: "string",
						name: "title",
						label: "title",
					},
					{
						type: "string",
						name: "link",
						label: "link",
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body of Document",
						description: "This is the markdown body",
						isBody: true,
					},
				],
			},
			{
				label: "Blog",
				name: "blog",
				path: "app/content/blog",
				format: "md",
				fields: [
					{
						type: "string",
						name: "title",
						label: "title",
					},
					{
						type: "datetime",
						name: "date",
						label: "date",
					},
					{
						type: "datetime",
						name: "updated",
						label: "updated",
					},
					{
						type: "string",
						name: "intro",
						label: "intro",
						ui: {
							component: "textarea",
						},
					},
					{
						type: "string",
						name: "canonical",
						label: "canonical",
					},
					{
						type: "string",
						name: "publication",
						label: "publication",
					},
					{
						type: "string",
						name: "permalink",
						label: "permalink",
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body of Document",
						description: "This is the markdown body",
						isBody: true,
					},
					{
						type: "string",
						name: "tags",
						label: "tags",
						list: true,
					},
				],
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
						isBody: true,
					},
					{
						type: "string",
						name: "title",
						label: "title",
					},
					{
						type: "datetime",
						name: "date",
						label: "date",
					},
					{
						type: "datetime",
						name: "updated",
						label: "updated",
					},
					{
						type: "string",
						name: "intro",
						label: "intro",
						ui: {
							component: "textarea",
						},
					},
					{
						type: "string",
						name: "canonical",
						label: "canonical",
					},
					{
						type: "string",
						name: "publication",
						label: "publication",
					},
					{
						type: "string",
						name: "permalink",
						label: "permalink",
					},
					{
						type: "string",
						name: "tags",
						label: "tags",
						list: true,
					},
				],
			},
		],
	},
});
