If the unit is known, returns the full RP name of a unit.

~~~Lua
local unitRPName = TRP3_API.r.name(unitID);
~~~

## Argument

* `unitID ` [UnitID](http://www.wowwiki.com/API_TYPE_UnitId) : the target to use (`player`, `target`, `pet`, `focus`, etc.)

## Returns
* `unitRPName` : the unit RP name, using the first name and last name provided in its profile. Does not include the short title.

## Example

Macro to salute your target using its RP name :

~~~Lua
/run local unitRPName=TRP3_API.r.name("target"); SendChatMessage("Hello "..unitRPName);
~~~