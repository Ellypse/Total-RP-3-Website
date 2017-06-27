/*
Title: Frequently asked questions
Sort: 10
*/

Please find below the answer to the questions we get asked frequently.

- [Will you bring back the creation system (items, documents, quests) from Total RP 2?](#will-you-bring-back-the-creation-system-items-documents-quests-from-total-rp-2)
- [How does companions work?](#how-does-companions-work)
- [Is Total RP 3 compatible with Total RP 2?](#is-total-rp-3-compatible-with-total-rp-2)
- [Is Total RP 3 compatible with MyRolePlay, XRP, FlagRSP or an other roleplaying add-on?](#is-total-rp-3-compatible-with-myroleplay-xrp-flagrsp-or-an-other-roleplaying-add-on)
- [I don't see the scanning options in the world map dropdown](#i-dont-see-the-scanning-options-in-the-world-map-dropdown])
- [Does Total RP 3 work cross realm or cross faction?](#does-total-rp-3-work-cross-realm-or-cross-faction)
- [Is there a limitation for the size of my profile?](#is-there-a-limitation-for-the-size-of-my-profile)
- [Can I import my profile from another roleplaying add-on into Total RP 3?](#can-i-import-my-profile-from-another-roleplaying-add-on-into-total-rp-3)

## Will you bring back the creation system (items, documents, quests) from Total RP 2?

It is already here. [Total RP 3: Extended][TRP3E] is an optional module for Total RP 3 that adds the possibility to create new content in WoW: campaigns with quests and dialogues, items, documents (books, signs, contracts ...) and many more! [Get it on Curse][TRP3E].

## How does companions work?

Companions is a broad term for pets, battle pets and mounts. You can create a companion profile in the companion section of the add-on.
You can bind a companion profile to companion either by using the option on the companion profiles list or by targeting your companion and using the target bar (for mounts, you have to target yourself).

**Only battle pets with a custom name can be bind to a companion profile. This is a necessary restriction. If the battle pet you are looking for is not appearing in the battle pet browser or you are not getting the target frame when targeting it, you'll have to rename that battle pet.**

## Is Total RP 3 compatible with Total RP 2?

Total RP 3 is compatible with Total RP 2 in two ways :

* Total RP 3 implements the [Mary Sue Protocol], used by roleplaying add-ons to exchange data. As Total RP 2 also implements the [Mary Sue Protocol], Total RP 3 and Total RP 2 can exchange some data. However, some of the information (like auras, pet descriptions, items) cannot be transferred via the [Mary Sue Protocol] and are not compatible with Total RP 3. Total RP 2 and Total RP 3 both use the same implementation of the map location system, which means Total RP 2 users can see Total RP 3 users on the map and vice versa.
* Total RP 2 as been tweak to disable the features that Total RP 3 already has if the two are run together. This means that you can run Total RP 3 alongside Total RP 2. Total RP 3 will be used for characters, pets information, map location and for the chat features, and Total RP 2 can still be used for the items, documents and quests.

## Is Total RP 3 compatible with MyRolePlay, XRP, FlagRSP or an other roleplaying add-on?

Total RP 3 implements the [Mary Sue Protocol], a standard protocol used by every roleplaying add-on to exchange data. This means your profile will be available to people using another roleplaying add-on like MyRolePlay or XRP. However, some advanced features provided by Total RP 3 cannot be sent via the [Mary Sue Protocol] and are not compatible with other roleplaying add-on (features like at-first-glance items, the location on the map, companion profiles, some advanced text formatting in the description).

## I don't see the scanning options in the world map dropdown

Some add-ons are overriding this dropdown and replaces all the available option by their own options. This is really bad practice from them and there's nothing we can do against that.

One usual culprit is the [PetTracker](https://mods.curse.com/addons/wow/pettracker) add-on. The author of this add-on has been notified of the issue and the solution has been provided to him but nothing has been done for now. If you are using PetTracker and want it to be compatible with Total RP 3 you can add your comment on [this ticket](https://wow.curseforge.com/projects/pettracker/issues/713).

## Does Total RP 3 work cross realm or cross faction?

Due to the game limitations, Total RP 3's cross realm support is limited. You can fully use Total RP 3 with players from realms that are merged to yours (those are the realms that share the same channels in major cities. Players from those realms have their realm next to their names when they write in those channels. They usually share the same forum on Blizzard’s website too). Unfortunately, add-ons cannot exchange data[^1] with players in cross-realm zones (zones with a low population of players where servers are dynamically merged so it feels less deserted) or in groups created via the dungeon group finder or raid finder.

Total RP 3 uses the standard `SendAddonMessage()` function to exchange data via the `whispers` channel (necessary for a one-to-one communication). This currently silently fails for the cases mentioned above. As soon as Blizzard makes it possible to send add-on messages via whispers in those cases, the add-on will be working as intended automatically without even needing an update.

Add-ons cannot send messages to players of the other faction, so Total RP 3 cannot fetch the profile of a player of the other faction or send your profile to a player of the other faction. But, Total RP 3 caches profiles in the directory and will display the cached information if it can't update a profile. This means that if you play in both factions on your server, you will be able to see cached versions of profiles of players from the oposite faction if you met them previously.

## Is there a limitation for the size of my profile?

We currently have a warning when your profile exceed a threshold of 20 individual messages needed to be send to send your profile to another player. You can ignore this message and even disable it in the settings, but keep in mind that the heavier your profile gets, the longer it will take to send to other players. In crowded places, your profile will have to be sent to several people and the data exchange may be throttle by server. This means if your profile is really huge it can take several minutes for a player to receive your profile, meanwhile you won't be able to receive anything.

As we wan't to preserve a good user experience, we have put a limit of 5.000 characters in the text fields (which represent 20 messages of 254 characters that will be sent for only one text field).

We are currently exploring options to remove the limit on the text fields so you can truly unleash your creativity while still preserving the user experience by not sending the About section with the rest of the profile when it reach a threshold and instead players who want to consult your About section would have to voluntarily request it. We have no ETA for this change for now.

## Can I import my profile from another roleplaying add-on into Total RP 3?

Yes. Total RP 3 has an importing feature that allows you to import your previous profiles into Total RP 3 profiles. We have an article on [How to import your existing RP profiles from another add-on](/wiki/how_to/import) on this wiki.

[Mary Sue Protocol]: https://moonshyne.org/msp/
[TRP3E]: http://extended.totalrp3.info/

[^1]: At least not without a lot of fragile hacking around the limitations.
