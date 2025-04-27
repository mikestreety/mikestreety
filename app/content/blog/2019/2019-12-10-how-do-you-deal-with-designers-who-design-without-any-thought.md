---
title: How do you deal with designers who design without any thought?
date: 2019-12-10
updated: 2021-03-28
intro: As a developer, dealing with designers and their creations can sometimes be challenging. At Liquid Light we've honed our process to ensure minimum friction between both developers and designers.
canonical: https://www.liquidlight.co.uk/blog/how-do-you-deal-with-designers-who-design-without-any-thought/
who: Liquid Light
permalink: "blog/how-do-you-deal-with-designers-who-design-without-any-thought/"
tags:
 - Web
 - Front-end Development
 - General
 - Thoughts
---

I was listening to a recent podcast of [Syntax](https://syntax.fm/), when there was a “Potluck” question episode ([number 194 to be precise](https://syntax.fm/show/194/potluck-gatsby-vs-next-is-google-home-spying-on-you-flat-file-cms-css-frameworks-hosting-client-sites-more)) the other day and one of the questions (about 13 minutes 11 seconds in) really got me thinking:

> How do you deal with designers who design without any thought about how dev will implement it?

This question really intrigued me and wobbled me off my privileged vantage point. The fact that people are in the unfortunate position of not being able to see eye-to-eye with their designer and, as developers, are having to ratify designs and components because the designer created a new pattern on a whim, or changed a stable component.

I can only speak from experience, and that experience is agency based. I’ve been in the (maybe un)fortunate position to have worked in agencies for the last 10 years, and work with the in-house designers. On the rare occasion where an external designer is used, I still have my keen-eyed colleagues to lean on, when clarification or simplification is required.

Don’t get me wrong, this process isn’t without its problems. The designers at Liquid Light can still be prone to inconsistent components or using many greys (I think I had one design which had 10 different shades of grey, like a terrible E. L. James spin-off), however our processes are built to help eradicate these inconsistencies and allow the developer to develop. 

When I say “developer” or “development”, I generally mean front-end development. Taking a design and splitting it, crafting it, making it come alive in the web. 

_As a side-note_, a lot of people are able to “do” CSS, but it takes a lot of time and knowledge to “do it well.'' All too often you see arguments on the internet about CSS being easy, and that it’s not real development. Let me put the record straight. **CSS is hard**, it takes a lot of time and practice to be **good.** CSS _definitely_ adheres to [Bushnell’s Law](https://saralouhicks.com/bushnells-law/).

With that out the way, let's get back to dealing with designers.

## Our Workflow

As a very “simple” overview of our design to developer workflow, we used to have the following:

1.  **Wireframes & style tiles**
2.  **Homepage and inner page designs**
3.  **Front-end development**

The issue here was that there would be elements, or components, which had not been considered (as they may not have appeared on the inner page designs). With each of these, the designer would have to design components on-the-go. With each new component needed, the designer opened the design files they would notice inconsistencies, or make better decisions about how things should look. This then ripples back to development and the spiral continues downward into ever evolving “improvements”.

Don’t get me wrong, requiring “ad-hoc” design is always going to happen no matter what your process is, but as long as you have a process, as long as you have (to use a buzz-word) a _design system,_ then the knock-on effects should be minimal.

There was another issue which arose with this design-by-page process and that is inconsistency in the spacing, padding, fonts etc. No design, unless you have infinite time, is 100% perfect, however having pages of designs makes it hard to know which is the “source of truth” - which padding should we be taking as gospel.

With these issues identified, we added an extra step into our design process:

1.  Wireframes & style tiles
2.  Homepage and inner page designs
3.  **Components page design**
4.  Front-end development

The components page was the designers responsibility to gather and design most of the potential components within the site. We have a good idea what most sites need - headings, featured paragraphs, buttons etc. For the developer, the components page then became the **single source of truth**.The components page is where the developer gets the font sizes, the padding, the colours. The inner page designs still exist, but are there to get a sense of how components work together and how they might be laid out on a page.

This means if a button was being created, the font size, padding, spacing etc. would be taken from the components page. It sped up development, as there were no more back-and-forth of “which one is right?”. It also sped up the design process, as the designers could spend their time perfecting the components page, without fear of having to go through each of the other pages and update them. With the introduction of Sketch into our workflow and their graceful handling of text styles and symbols, however, having inconsistent headings across pages seems a thing of the past.

Once the project has launched, the style guide becomes a section on the website and this then becomes the **source of truth**. Developers, designers and account managers alike can browse this part of the site and pick components for the new section of the site they are developing. They can also confirm if a component exists before requesting it from the development team.

Problem solved, right? We think Liquid Light has another trick up its sleeve to compliment the workflow and that is its people.

## Our Team

When a new site is being created a Liquid Light, we don’t have predefined teams which the project gets assigned to. Instead, we build the team around the project itself. This means that we have different designers working with different developers, utilising everyone's strengths.

This, I feel, is a major benefit with developers interacting with designers. Each person brings their own flair and expertise to the project, and getting an opportunity to mash those flairs together in infinite combinations is what makes our websites so special. 

Designers get to feed off developers as to what was done on a previous project they might not have been involved in and likewise, developers get to see fresh designs if they’ve not worked with that particular creative in a while. 

Most of our designers have had experience with small amounts of front-end development. They are by no means “coders”, but they understand the physics of the web and produce designs which may push the boundaries, but are always possible to create. This is a huge advantage as they appreciate the constraints of CSS. I could imagine, and have seen, the complications that arise when a pure print designer creates something for the web. There is talent and nuances involved in web design which aren’t always apparent.

With the potential of multiple designers and developers getting involved, having this single source of truth with the components page is paramount to the design staying cohesive through the whole project. This is especially important in the post-launch phase. As the components page gets translated to a living, breathing style guide within the site, it means everyone in the company sings from the same hymn sheet.

I think it is important for developers and designers to speak the same visual language. At the end of the day, you are all working towards one common goal - to make something awesome. If there is internal politics or friction between teams or colleagues, this is only going to create a sub-par product. It’s not a war, or a “who is better than who” contest, it is about creating something incredible that the client is proud to call theirs (and ultimately, something they are happy to pay for).

How do you ensure your team gels and designers understand developers needs?
