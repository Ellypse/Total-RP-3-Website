/*
Title: TRP3_API.r.sendMSPQuery(unitID)
*/

Send a [Mary Sue Protocol][MSP] request to a target. If the target is available, it will respond with updates for its MSP profile.

~~~Lua
TRP3_API.r.sendMSPQuery(unitID);
~~~

## Argument

* `unitID` [UnitID](http://www.wowwiki.com/API_TYPE_UnitId) : the target to use (`player`, `target`, `pet`, `focus`, `playerName-RealmWithoutSpaces` etc.)

## Required modules

* [Mary Sue Protocol][MSP]

## Example

Send a specific user a request for updates about their MSP profile :

~~~Lua
TRP3_API.r.sendMSPQuery("Telkostrasz-KirinTor");
~~~

## See also

[TRP3_API.r.sendQuery(unitID)][sendQuery]

[sendQuery]: trp3_api_r_sendquery

[MSP]: %base_url%/documentation/technical_design/mary_sue_protocol
