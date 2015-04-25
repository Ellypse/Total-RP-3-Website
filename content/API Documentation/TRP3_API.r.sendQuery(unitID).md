Send a Total RP 3 update query to a target. If the target is available, it will respond either that an update for that target's profile is available and initiate an update, or indicate that there is no update available.

~~~Lua
TRP3_API.r.sendQuery(unitID);
~~~

## Argument

* `unitID` [UnitID](http://www.wowwiki.com/API_TYPE_UnitId) : the target to use (`player`, `target`, `pet`, `focus`, `playerName-RealmWithoutSpaces` etc.)

## Example

Send a specific user a request for updates about their profile :

~~~Lua
TRP3_API.r.sendQuery("Telkostrasz-KirinTor");
~~~

## See also

[TRP3_API.r.sendMSPQuery(unitID)][sendMSPQuery]

[sendMSPQuery]: %base_url%/API%20Documentation/TRP3_API.r.sendMSPQuery(unitID)