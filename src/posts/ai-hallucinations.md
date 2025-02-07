---
layout: "layouts/post.njk"
title: "AI Hallucinations: Do Not Trust, Verify"
date: 2023-12-15
category: development
description: "I was building a Django project using a library that does not exist."
tags: post
---

## Generative AI Can Make Mistakes

### Are you seeing this?

Have you heard of AI hallucniations, when a LLM makes up an answer? It happens sometimes when you are working with an LLM like ChatGPT or any number of the AI assistants that are common these days. The term refers to when an LLM provides an incorrect answer, or invents information that it thinks is true. Let's talk briefly about why this happens, and I will show you a real-life example from my own experience.

### Why would an LLM do this?

Any experienced developer knows that computers only do what you tell them. Give them bad instructions, and the program doesn't do what you want. This is the GIGO pricnciple: Garbage In, Garbage Out.

LLMs are not garbage. Far from it, they are quite powerful and can be extremely useful. But They have limitations.

You might know that LLMs are based on predictive models. Essentially, they are programs that look at the text you provide to them, then assemble a series of words into sentences, paragraphs, and other structures that are statistically likely to match a desirable answer. LLMs do not retain concepts of their domain of knowledge, they procedurally generate answers based on the weights of their training data.

And there's the rub. For domains of knowledge that are well-documented on the web, an LLM will be right most of the time. However, once you start asking questions about more esoteric knowledge, or ask questions using complicated language, the LLMs start to get confused. Devs who work on LLMs try to mitigate these cases by training an LLM to know what it doesn't know, so that it can tell you that it doesn't have much information on the topic.

But it's not perfect. Remember, an LLM does not really "know" anything, it only generates answers based on how likely that answer is to *look* correct. So sometimes, an LLM thinks it is right when it gives wrong information.

### A real-world example

I recently began work on a branded online survey tool for my employer. For a first proof-of-concept, I wanted to use Django. I have had a lot of success using ChatGPT for assistance in coding, it has pretty much replaced googling at this point. I thought, "why not use an AI-first approach to creating this project?" 

You can see the beginning of our conversation below:

> _**User**_
> 
> Hi can you tell me what the most widely used django packages are that are used for surveys?
> 
> _**ChatGPT**_
> 
> Yes! Some of the most widely used Django packages for creating and managing surveys are:
> 
> 1. **django-survey** – A simple yet flexible survey tool that allows you to create surveys dynamically and store responses in the database.
>    - Repo: [https://github.com/jessykate347/django-survey](https://github.com/jessykate347/django-survey)
> 
> 2. **django-forms-builder** – Provides an easy-to-use form and survey builder with customizable fields.
>    - Repo: [https://github.com/stephenmcd/django-forms-builder](https://github.com/stephenmcd/django-forms-builder)
> 
> 3. **django-polls** – A simple polling app similar to the one in the Django tutorial, often customized for surveys.
>    - Django Docs Tutorial: [https://docs.djangoproject.com/en/stable/intro/tutorial01/](https://docs.djangoproject.com/en/stable/intro/tutorial01/)
> 
> 4. **django-survey-and-report** – A more feature-rich survey package that includes reporting capabilities.
>    - Repo: [https://github.com/datahub-project/django-survey-and-report](https://github.com/datahub-project/django-survey-and-report)
> 
> 5. **django-crispy-forms** – While not a survey package, it's widely used to improve the styling and usability of forms, including survey forms.
>    - Repo: [https://github.com/django-crispy-forms/django-crispy-forms](https://github.com/django-crispy-forms/django-crispy-forms)
> 
> 6. **django-questionnaire** – A package for managing questionnaires with advanced logic like skip patterns and conditions.
>    - Repo: [https://github.com/bennylope/django-questionnaire](https://github.com/bennylope/django-questionnaire)
> 
> 7. **django-simple-survey** – A lightweight package that provides basic survey functionality with a minimal setup.
>    - Repo: [https://github.com/marcosgabarda/django-simple-survey](https://github.com/marcosgabarda/django-simple-survey)
> 
> Would you like recommendations based on a specific feature, like conditional logic or analytics? 😊

Dear Reader, now is the time when I emplore you to follow these links. As you will see. many of them are not valid. Maybe at some time, these users had the repo stated by GPT, but as of this writing, about half of these are 404s.

GPT hallucinated these libraries, they do not exist. Maybe at some point in time these users, or users connected to them in some way, had one of these repositories and GPT didn't check whether the repositories are still available. Or maybe they never existed, maybe GPT's model determined it was statistically likely that the library existed.

I spent a few more hours asking GPT to help me generate the file structure for this project and setting up our front-end libraries before I discovered the hallucination. The time was not a complete waste, as I have a viable structure for my project now. But I should have taken a few minutes to click through the links at the outset.

### Final Thoughts

I have been a professional developer for about 14 years. Anybody who has been working as a dev for more than 5 years probably has excellent "Google-Fu." Elder millenials and Gen Xers know this term well, we have honed our skill through hours of training. For readers who don't have back pain or bad knees, Google-Fu is the skill of learning and finding solutions to technical problems online. You craft a google serach that will hopefully take you to one or two StackOverflow pages that will answer your question.

Google-Fu is sort of a predecessor to "prompt engineering," which is the skill of sending prompts to an LLM to make it retrieve the information you want or enact certain behaviors (eg, jailbreaking). This AI-first approach can save heaps of time, reduce your code size, and help you implement faster algorithms. If you awant to get familiar with AI-first coding (or want to know anything else about AI), you should check out [@DeonnaDoesAI](https://tiktok.com/@deonnadoesai) for some excellent how-tos. As a matter of fact, I built this blog using her template!

Happy Coding!

---
