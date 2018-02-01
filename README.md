# Learn with Roo: An Emotion Recognition Game

Learn with Roo is an emotion recognition game created in 24 hours for the Hack
Cambridge Ternary. It uses the [Microsoft Emotion API][MSEmotion] to identify
emotions from facial expressions in images. These labelled faces are then used
as digital flashcards to help autistic children practice emotion recognition.
The Emotion API is currently in beta, and emotion detection is not yet reliable
enough for production use, but we created this app to demonstrate the potential
of artificial intelligence techniques to aid child development. A live demo is
available at https://learnwithroo.com. For more information check out the app's
[about page][AboutRoo].

## Technology

The app runs entirely in the browser and is powered by React. The JavaScript was
packaged with webpack and the site is hosted on Firebase Hosting. Site resources
are cached offline and following the planned inclusion of cached emotion data
(and an app manifest), Learn with Roo will be ready to become a true progressive
web app.

[MSEmotion]: https://azure.microsoft.com/en-gb/services/cognitive-services/emotion/
[AboutRoo]: https://learnwithroo.com/about
