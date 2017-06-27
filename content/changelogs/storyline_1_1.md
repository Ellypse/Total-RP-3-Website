/*
Title: Storyline 1.1
*/

TL;DR: New options for hiding the flavor NPC texts and the default frames, all possible rewards and objectives are now supported, bug fixes and UI tweaks.

## New stuff

All types of quest rewards are now supported: experience points, money, items, skill points, currency tokens, spells and garrison followers. The same thing goes for currency and gold requirement as quest objectives.

![All the rewards are now supported](http://totalrp3.info/wiki/modules/1.1_rewards_combined.jpeg)

We've also added two new options, as requested by many users ([hello reddit!](https://www.reddit.com/r/wow/comments/3huasx/storyline_an_awesome_addon_that_revamps_the_quest/)), to disable the flavor gossip text on NPCs like merchants and fly master (and mission tables!) and to hide the default frames. The flavor text is off by default and can be re-enabled in the options, and the default frames are hidden by default and can be re-enabled in the options.

![The two new options that everyone wanted](http://totalrp3.info/wiki/modules/1.1_new_parameters.jpeg)

The dress up frame will now be attached to Storyline when control+clicking a reward to try it.

![The dress up frame is now anchored to the Storyline frame](http://totalrp3.info/wiki/modules/1.1_dressupframe.gif)

The 3D model frame that appears next to the quest frame will now be shown next to Storyline if the quest frame is hidden.

![The 3D model frame for quest objectives is shown next to Storyline](http://totalrp3.info/wiki/modules/1.1_npc_quest_frame.jpeg)

The number of suggested players to do a quest is now indicated in the quest objectives.

## Bug fixes

- We fixed the issue with the ReloadUI() warning on login.
- We fixed the issue where quests that are supposed to trigger something uppon acceptation were not correctly triggering their events.
- The size of the frame will now be saved between sessions (duh!).
- On first launch, if the game client is in French, Storyline will use the French localization. We will add more localization in the future.

## Other UI tweaks

- The dialog options popup is now resized alongside with the frame.
- We've improved the grid UI on quest rewards and quest objectives.