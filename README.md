# MTG DRAFT

This is a small project application that simulates the draft game mode for [Magic: The Gathering](https://en.wikipedia.org/wiki/Magic:_The_Gathering). Currently only three sets are available to draft - Zendikar Rising, Kaldheim, and Theros Beyond Death. These are referenced in the source code with their three letter set codes (ZNR, KLD, THB). Card ratings are taken from [Aetherhub](https://aetherhub.com/).

The AI plays a basic strategy, valuing each card of a pack at `cardRating + (cardColor \* colorWeight)`

To run this project locally, run the following command from the main directory:

### `npm start`

You may need to install various dependencies, everything you need will be available with npm.
Additionally you can view the live project [here](http://draftbucket.s3-website.us-east-2.amazonaws.com).

Feedback, suggestions, and bug reports are always welcome, you can reach me at dpayne5@berkeley.edu
