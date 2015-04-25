## Description

The Mary Sue Protocol built-in module for Total RP 3 contains the implementation for the [Mary Sue Protocol][MSP], a protocol used by all major roleplaying add-ons to exchange profile data in a standardized way, allowing a compatibility with (Total RP 2, XRP, MyRoleplay, FlagRSP, etc.)

## Mary Sue Protocol fields and implementations in Total RP 3

* `AE` : Eye color. (`blue`) **Total RP 3 allows users to indicate a specific color for their eyes, to be more explicit. The value will contain a color code (also known as [UI_escape_sequences][escape]) starting with `|cffxxxxxx` and will end with a closing tag `|r`. If you do not want colors in your add-on, please escape the tags correctly ([see below](#escape)).**

* `AH` : Height. Can be either text (`short`, `tall`) or a numeric value in centimeters (`198`).
* `AG` : Age. Can be either text (`young`, `old`) or a numeric value in years (`27`)
* `AW` : Body shape. Can be either text (`thin`, `muscular`) or a numeric value in kilograms (`72`).
* `CU` : Currently. A "short" description of the character's current situation. (`Bleeding to death`)
* `CO` : Currently Out of Character. A short out-of-character information. (`Walks up are welcome`)
* `DE` : Description written in the "About" page. When using the template 3 or if the option "Use template 3 only" is enabled, only the "Physical description" part will be used. 
* `FC` : Character status. Either `2` for in character or `1` for out of character.
* `FR` : Roleplaying style. Can be either `Beginner roleplayer`, `Experienced roleplayer` or `Volunteer roleplayer`.
* `GC` : Game, Class. Non-localised version of the character (real) class. (`Hunter`, `Warriror`) **Non editable**
* `GF` : Game, Faction. Non-localised version of the character faction. (`Horde`, `Alliance`) **Non editable**
* `GR` : Game, Race. Non-localised version of the character (real) race. (`Dwarf`, `Troll`) **Non editable**
* `GS` : Game, Sex. `1` neuter, `2` male, `3` female. **Non editable**
* `GU` : Game, GUID. [UnitGUID]. (`Player-976-0002FD64`) **Non editable**
* `HB` : Birthplace. (`Stormwind`, `Silvermoon`)
* `HH` : Residence. (`Stormwind`, `Silvermoon`)
* `HI` : History. When using the template 3 in the "About" page, it will be the history part of the template.
* `IC` : Icon. String of an icon chosen by the player to represent himself. (`ability_garrison_orangebird`)
* `MO` : Motto. A character's favorite saying. (`Winter is coming`)
* `NA` : Name. Complete name, using the short title, the first name and the last name. (`Sir Telkostrasz Arkale`) **Total RP 3 allows users to use a different color than the default class based one for their name. The value will contain a color code (also known as [UI_escape_sequences][escape]) starting with `|cffxxxxxx` and will end with a closing tag `|r`. If you do not want colors in your add-on, please escape the tags correctly ([see below](#escape)).**
* `NI` : Nickname. (`Littlefinger`)
* `NH` : House name. The house the character belong to. (`House Stark`)
* `NT` : Title. The long title. (`Crazy cat lady`)
* `RA` : Race. Custom race if set (if not set, use GC for localized version). `Half-orc, half-draenei`
* `RC` : Class. Custom class defined by the user. (`Medecin`) **Total RP 3 allows users to use a different color than the default class based one for their class. The value will contain a color code (also known as [UI_escape_sequences][escape]) starting with `|cffxxxxxx` and will end with a closing tag `|r`. If you do not want colors in your add-on, please escape the tags correctly ([see below](#escape)).**
* `TT` : Tooltip fields.
* `VA` : Addon versions. Semicolon-separated list of add-ons/version pairs. `totalRP/1.0.0;GHI/2.1.14`
* `VP` : Protocol version. `1`

## List of known add-ons using the Mary Sue Protocol

* [Total RP 2][TRP2]
* [XRP][XRP]
* [FlagRSP MoP][FlagRSP MoP]
* [GnomTEC Badge][GnomTEC]
* [MyRolePlay][MRP]

## <a name="escape"></a> Correctly escaping color codes

We recommend to render the text as is, meaning as intended by users. The colors inserted by Total RP are chosen by users and have a meaning. But if you do want to remove colors from the values sent by Total RP 3, here's the best way to do so :

~~~Lua
local valueWithoutColorCodes = valueContainingColorCodes:gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|r", "");
~~~

## External links

[Mary Sue Protocol documentation][MSP]

[UI escape sequences - WoWWiki - Your guide to the World of Warcraft][escape]

[XRP]: http://www.curse.com/addons/wow/xrp
[TRP2]: http://www.curse.com/addons/wow/totalrp2
[FlagRSP MoP]: http://www.curse.com/addons/wow/flagrsp
[MRP]: http://www.curse.com/addons/wow/my-role-play
[GnomTEC]: http://www.curse.com/addons/wow/gnomtec_badge

[UnitGUID]: http://wow.gamepedia.com/API_UnitGUID
[MSP]: https://moonshyne.org/msp/
[escape]: http://www.wowwiki.com/UI_escape_sequences